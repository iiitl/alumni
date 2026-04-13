import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { sendEmail } from "./lib/email"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: yourDbAdapter,
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
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const email = user.email || profile?.email;
      
      const isIiitlEmail = email && /@iiitl\.ac\.in$/i.test(email);

      if (!isIiitlEmail) {
        // Returning false rejects the sign-in
        // Later, we will look at how to log this rejection for abuse monitoring
        return false; 
      }

      return true;
    },
  },
})