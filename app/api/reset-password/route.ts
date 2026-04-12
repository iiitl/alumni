import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { PasswordResetToken } from "@/models/PasswordResetToken"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 })
    }

    await connectDB()

    const record = await PasswordResetToken.findOne({
      token,
      expiresAt: { $gt: new Date() },
    })

    if (!record) {
      return NextResponse.json(
        { error: "Reset link is invalid or has expired." },
        { status: 400 }
      )
    }

    const hashed = await bcrypt.hash(password, 10)

    const client = await clientPromise
    const db = client.db()

    await db
      .collection("users")
      .updateOne({ email: record.email }, { $set: { password: hashed } })

    // Delete the token so it can't be reused
    await PasswordResetToken.deleteOne({ token })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}