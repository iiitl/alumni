import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { PasswordResetToken } from "@/models/PasswordResetToken"
import clientPromise from "@/lib/mongodb"
import { Resend } from "resend"
import crypto from "crypto"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const canonical = email?.trim().toLowerCase()

    if (!canonical || !/@iiitl\.ac\.in$/i.test(canonical)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()
    const user = await db.collection("users").findOne({ email: canonical })

    if (!user || !user.password) {
      return NextResponse.json({ success: true })
    }

    await connectDB()

    await PasswordResetToken.deleteOne({ email: canonical })

    const token = crypto.randomBytes(32).toString("hex")

    await PasswordResetToken.create({
      email: canonical,
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    })

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
    console.log("Reset URL:", resetUrl)

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: canonical,
      subject: "Reset your IIITL Alumni password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to set a new password. This link expires in 15 minutes.</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}