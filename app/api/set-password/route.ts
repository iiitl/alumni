import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { password } = await req.json()

    if (!password) {
      return NextResponse.json(
        { error: "Missing password" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.collection("users").updateOne(
      { 
        email: session.user.email,
        $or: [
          { password: { $exists: false } },
          { password: null },
          { password: "" }
        ]
      },
      {
        $set: { password: hashedPassword },
        $unset: { requiresPasswordSetup: "" }
      }
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Password already set or user not found" },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("SET PASSWORD ERROR:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}