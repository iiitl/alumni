import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { sendEmail } from "@/lib/email"
import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { limit, redisClient } from "@/lib/ratelimit";
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise), 
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, 
    updateAge: 24 * 60 * 60, 
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          hd: "iiitl.ac.in", 
        },
      },
    }),
    {
      id: "email",
      name: "Email",
      type: "email",
      async sendVerificationRequest({ identifier, url, provider }) {
        const { success } = await limit(`magic_link_${identifier}`, {
          maxRequests: 5,
          window: '1h'
        });

        if(!success) {
          console.warn(`Rate limit exceeded for magic link: ${identifier}`);
          throw new Error("Rate limit exceeded")
        }

        try {
          await sendEmail({
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
        } catch (error) {
          console.error("Failed to send magic link via custom mailer:", error);
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
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = (await clientPromise).db();
        const user = await db.collection("users").findOne({ email: credentials.email });

        // If user doesn't exist or has no password 
        if (!user || !user.hashedPassword) return null;

        const isValid = await bcrypt.compare(credentials.password as string, user.hashedPassword);

        if (!isValid) return null;

        // Return the user object if password matches
        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email || profile?.email;
      
      const isIiitlEmail = email && /@iiitl\.ac\.in$/i.test(email);

      if (!isIiitlEmail) {
        console.warn(`${email} does not have the right domain`)
        return false; 
      }

      if (account?.provider === "google") {
        const db = (await clientPromise).db();
        const existingUser = await db.collection("users").findOne({ email });

        if (!existingUser) {
          // 1. User doesn't exist yet! Let's NOT save them.
          // 2. Temporarily store their Google profile in Redis (so we don't lose it)
          const signupToken = crypto.randomUUID();
          if(redisClient){
            await redisClient.set(`pending_google_${signupToken}`, JSON.stringify({
              name: profile?.name,
              email: profile?.email,
              image: profile?.picture,
              googleAccountId: account.providerAccountId
            }), { ex: 3600 });
          }

          // 3. Abort NextAuth's automatic save and redirect to the password page
          return `/setup-password?token=${signupToken}`; 
        }
      }

      return true;
    },
  },
})