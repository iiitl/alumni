import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongodb"
import { Resend } from "resend"
import { checkRateLimit } from "./rateLimit"
import { logEvent } from "./logger"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const resend = new Resend(process.env.RESEND_API_KEY)

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    Email({
      from: process.env.EMAIL_FROM,

      async sendVerificationRequest({ identifier, url }) {

        // RATE LIMIT CHECK
        if (!checkRateLimit(identifier)) {
          console.log("Rate limit exceeded:", identifier)
          await logEvent(identifier, "RATE_LIMIT")
          throw new Error("Too many requests. Please try again later.")
        }

        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: identifier,
          subject: "Sign in to IIITL Alumni",
          html: `<p>Click to sign in:</p><a href="${url}">${url}</a>`,
        })
      },
    }),
    
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),

    // Credentials check
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const client = await clientPromise
        const db = client.db()
        
        const user = await db
        .collection("users")
        .findOne({ email: credentials?.email })
        
        if (!user) return null
        if (!user.password) return null
        const isValid = await bcrypt.compare(
          credentials?.password || "",
          user.password
        )
        
        if (!isValid) return null
        return user
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {

      // EMAIL restriction
      if (user?.email && !user.email.toLowerCase().endsWith("@iiitl.ac.in")) {
        await logEvent(user.email, "INVALID_DOMAIN")
        return false
      }

      // GOOGLE restriction
      if (account?.provider === "google") {
        if (profile?.hd !== "iiitl.ac.in") {
          await logEvent(profile?.email || "", "GOOGLE_REJECT")
          return false
        }
      }

      return true
    },
    async session({ session, user }) {
      if (!user.password) {
        // mark user as incomplete
        session.user.needsPassword = true
      }
      return session
    },
  },

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }