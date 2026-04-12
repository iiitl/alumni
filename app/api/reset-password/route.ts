import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { PasswordResetToken, hashToken } from "@/models/PasswordResetToken"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 })
    }

    await connectDB()

    // findOneAndDelete: atomically consume the token so two concurrent
    // requests cannot both pass and write different passwords
    const record = await PasswordResetToken.findOneAndDelete({
      tokenHash: hashToken(token),
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

    const result = await db
      .collection("users")
      .updateOne({ email: record.email }, { $set: { password: hashed } })

    // Fail explicitly if no account matched — don't silently return 200
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}