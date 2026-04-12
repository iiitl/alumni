import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, branch, graduationYear, password } = body

    // Validate all required fields
    if (!name || !email || !branch || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Enforce email domain
    if (!/@iiitl\.ac\.in$/i.test(email)) {
      return NextResponse.json(
        { error: "Only @iiitl.ac.in emails are allowed." },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      if (!existingUser.password) {
        return NextResponse.json(
          { error: "Account exists without a password. Please sign in via Magic Link or Google to set one." },
          { status: 400 }
        )
      }
      return NextResponse.json(
         { error: "An account with this email already exists." },
         { status: 400 }
       )
    }

    const hash = await bcrypt.hash(password, 10)

    await db.collection("users").insertOne({
      name,
      email,
      branch,
      graduationYear,
      password: hash,
      createdAt: new Date(),
    })
    
    return NextResponse.json({ success: true })

  } catch (err: unknown) {
    console.error("Registration error:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
