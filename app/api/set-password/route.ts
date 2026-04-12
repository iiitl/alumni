import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import { StagingUser } from "@/models/StagingUser"

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    await connectDB()

    // Atomically find and consume the staging record by the server-issued
    // one-time token, not by a client-supplied email.
    // Only the Google OAuth callback that created this token could have known it,
    // so possession of the token is proof of a completed Google auth.
    const staged = await StagingUser.findOneAndDelete({
      oneTimeToken: token,
      expiresAt:    { $gt: new Date() },
    })

    if (!staged) {
      return NextResponse.json(
        { error: "Session expired or invalid. Please sign in with Google again." },
        { status: 401 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    const existing = await db.collection("users").findOne({ email: staged.email })
    if (existing) {
      return NextResponse.json(
        { error: "Account already exists. Please log in." },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.collection("users").insertOne({
      name:      staged.name,
      email:     staged.email,
      image:     staged.image,
      password:  hashedPassword,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("SET PASSWORD ERROR:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}