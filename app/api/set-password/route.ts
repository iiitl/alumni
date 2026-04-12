import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import { StagingUser } from "@/models/StagingUser"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    const canonical = email.trim().toLowerCase()

    await connectDB()

    // StagingUser is the proof this is a legitimate pending Google signup
    const staged = await StagingUser.findOne({
      email: canonical,
      expiresAt: { $gt: new Date() },
    })

    if (!staged) {
      return NextResponse.json(
        { error: "Session expired or invalid. Please sign in with Google again." },
        { status: 401 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    // Make sure the user doesn't already exist
    const existing = await db.collection("users").findOne({ email: canonical })
    if (existing) {
      await StagingUser.deleteOne({ email: canonical })
      return NextResponse.json(
        { error: "Account already exists. Please log in." },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Atomically create the real user and delete the staging record
    await db.collection("users").insertOne({
      name:      staged.name,
      email:     canonical,
      image:     staged.image,
      password:  hashedPassword,
      createdAt: new Date(),
    })

    await StagingUser.deleteOne({ email: canonical })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("SET PASSWORD ERROR:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}