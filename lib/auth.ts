import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongodb"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    Email({
      from: process.env.EMAIL_FROM,

      async sendVerificationRequest({ identifier, url }) {
        console.log("Sending email to:", identifier)

        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: identifier,
          subject: "Sign in to IIITL Alumni",
          html: `<p>Click to sign in:</p><a href="${url}">${url}</a>`,
        })
      },
    }),
  ],

  callbacks: {
  async signIn({ user }) {
    if (user?.email && !user.email.toLowerCase().endsWith("@iiitl.ac.in")) {
      console.log("Rejected email:", user.email)
      return false
    }
    return true
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