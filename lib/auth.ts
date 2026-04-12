import { ObjectId } from "mongodb"
import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import type { NextAuthOptions } from "next-auth"
import clientPromise from "./mongodb"
import { Resend } from "resend"
import { checkRateLimit } from "./rateLimit"
import { logEvent } from "./logger"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { StagingUser } from "../models/StagingUser"

const resend = new Resend(process.env.RESEND_API_KEY)

const baseAdapter = MongoDBAdapter(clientPromise)

export const authOptions: NextAuthOptions = {
  adapter: {
    ...baseAdapter,
    async createUser(user) {
      const isStaged = await StagingUser.findOne({
        email: user.email?.toLowerCase(),
      })
      if (isStaged) {
        return { ...user, id: "pending" }
      }
      return baseAdapter.createUser!(user)
    },
  },

  providers: [
    Email({
      from: process.env.EMAIL_FROM,

      async sendVerificationRequest({ identifier, url }) {

        // DOMAIN CHECK
        if (!/@iiitl\.ac\.in$/i.test(identifier)) {
          console.log("Domain rejected:", identifier)
          await logEvent(identifier, "INVALID_DOMAIN")
          throw new Error("Only @iiitl.ac.in emails are allowed")
        }

        // RATE LIMIT CHECK
        const rateLimitResult = await checkRateLimit(identifier)
        if (!rateLimitResult.allowed) {
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

    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !/@iiitl\.ac\.in$/i.test(credentials.email)) {
          console.log("Credentials domain rejected:", credentials?.email)
          return null
        }

        const client = await clientPromise
        const db = client.db()
        
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email })
        
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

        const db = (await clientPromise).db()
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email!.toLowerCase() })

        if (!existingUser) {
          await StagingUser.findOneAndUpdate(
            { email: user.email!.toLowerCase() },
            {
              $set: {
                name:      user.name,
                image:     user.image,
                googleId:  account.providerAccountId,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
              },
            },
            { upsert: true, new: true }
          )
          return `/set-password?email=${encodeURIComponent(user.email!.toLowerCase())}`
        }
      }

      return true
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user }: any) {
      if (!user.password) {
        const client = await clientPromise
        const db = client.db()
        const targetIdObj = typeof user.id === "string" ? new ObjectId(user.id) : (user._id || user.id)
        const targetIdStr = typeof user.id === "string" ? user.id : String(user._id || user.id)
        
        const googleAccount = await db.collection("accounts").findOne({ 
          $or: [
            { userId: targetIdObj },
            { userId: targetIdStr }
          ],
          provider: "google" 
        })

        if (googleAccount) {
          session.user.needsPassword = true
        }
      }
      return session
    },
  },

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }