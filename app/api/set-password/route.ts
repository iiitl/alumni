import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("SET PASSWORD ERROR:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}