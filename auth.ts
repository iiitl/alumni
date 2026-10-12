import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { sendEmail } from "@/lib/email"
import { getMongoClient } from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { limit, redisClient } from "@/lib/ratelimit";
import { IIITL_EMAIL_DOMAIN, getClientIp, isIiitlEmail, normalizeEmail } from "@/lib/auth-utils";
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"

/**
 * Logs a rejected sign-in so abuse can be monitored without telling the user why.
 */
function logRejectedSignIn(reason: string, details: Record<string, unknown>) {
  console.warn({ severity: "WARNING", event: "AUTH_SIGNIN_REJECTED", reason, ...details });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(getMongoClient),
  session: {
    // The Credentials provider only ever issues JWT session cookies, so the
    // whole app uses JWT sessions. The adapter still stores users, accounts and
    // magic-link verification tokens.
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/login/check-email",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          // Only a hint for Google's account picker; enforced in the signIn callback.
          hd: IIITL_EMAIL_DOMAIN,
        },
      },
    }),
    {
      id: "email",
      name: "Email",
      type: "email",
      async sendVerificationRequest({ identifier, url }) {
        // Backstop for requests that hit /api/auth/signin/email directly. The
        // login server action checks its own bucket first so it can show a message.
        const { success } = await limit(`magic_link_${identifier}`, {
          maxRequests: 5,
          window: '1h'
        });

        if (!success) {
          logRejectedSignIn("magic_link_rate_limited", { email: identifier });
          throw new Error("Rate limit exceeded");
        }

        const sent = await sendEmail({
          to: identifier,
          subject: "Sign in to the IIITL Platform",
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2>Welcome to the IIITL Platform</h2>
              <p>Click the link below to securely sign in.</p>
              <a href="${url}" style="padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px; display: inline-block;">
                Sign In
              </a>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          `,
          text: `Sign in to the IIITL Platform by clicking this link: ${url}`
        });

        // sendEmail reports failure by returning false rather than throwing.
        if (!sent) {
          throw new Error("Failed to send verification email.");
        }
      },
    },
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, request) {
        const email = normalizeEmail(credentials?.email);
        const password = credentials?.password;
        if (!isIiitlEmail(email) || typeof password !== "string" || !password) return null;

        // Limit password guessing. Lives here rather than in the server action
        // so direct POSTs to /api/auth/callback/credentials are covered too.
        // One bucket per IP (one IP trying many accounts) and one per IP and
        // account (so other IPs can't use up a member's attempts).
        const ip = getClientIp(request.headers);
        const [ipLimit, accountLimit] = await Promise.all([
          limit(`login_ip_${ip}`, { maxRequests: 20, window: "15m" }),
          limit(`login_${ip}_${email}`, { maxRequests: 5, window: "15m" }),
        ]);
        if (!ipLimit.success || !accountLimit.success) {
          logRejectedSignIn("credentials_rate_limited", { email, ip });
          return null;
        }

        const db = (await getMongoClient()).db();
        const user = await db.collection("users").findOne({ email });

        if (!user || typeof user.hashedPassword !== "string") {
          logRejectedSignIn("credentials_unknown_user", { email });
          return null;
        }

        const isValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isValid) {
          logRejectedSignIn("credentials_bad_password", { email });
          return null;
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const hd = profile?.hd || profile?.domain;
        if (hd !== IIITL_EMAIL_DOMAIN || profile?.email_verified !== true) {
          logRejectedSignIn("google_wrong_domain_or_unverified", { hd, email: profile?.email });
          return false;
        }
      }

      const email = normalizeEmail(user.email || profile?.email);

      if (!isIiitlEmail(email)) {
        logRejectedSignIn("wrong_domain", { email, provider: account?.provider });
        return false;
      }

      // Magic links only sign in existing members. Without this check the
      // adapter would create a bare user for any @iiitl.ac.in address and
      // skip registration entirely.
      if (account?.provider === "email") {
        const db = (await getMongoClient()).db();
        const existingUser = await db.collection("users").findOne({ email });
        if (!existingUser) {
          logRejectedSignIn("magic_link_unknown_user", { email });
          return false;
        }
        return true;
      }

      if (account?.provider === "google") {
        const db = (await getMongoClient()).db();
        const existingUser = await db.collection("users").findOne({ email });

        if (!existingUser) {
          if (!redisClient) {
            console.error("Google signup blocked: redisClient unavailable for pending signup token storage")
            return "/login?error=SignupUnavailable"
          }

          const signupToken = randomUUID();
          try {
            const setResult = await redisClient.set(
              `pending_google_${signupToken}`,
              JSON.stringify({
                name: profile?.name,
                email,
                image: profile?.picture,
                googleAccountId: account.providerAccountId,
              }),
              { ex: 3600 }
            )

            if (!setResult) {
              console.error("Google signup blocked: failed to persist pending signup token")
              return "/login?error=SignupUnavailable"
            }
          } catch (error) {
            console.error("Google signup blocked: redis set failed", error)
            return "/login?error=SignupUnavailable"
          }

          return `/setup-password?token=${signupToken}`;
        }

        const linkedGoogleAccount = await db.collection("accounts").findOne({
          userId: existingUser._id,
          provider: "google",
        })

        if (!linkedGoogleAccount) {
          logRejectedSignIn("google_not_linked", { email });
          return "/login?error=OAuthAccountNotLinked"
        }
      }

      return true;
    },
  },
})
