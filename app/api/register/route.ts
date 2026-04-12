import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { logEvent } from "@/lib/logger"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, branch, graduationYear, password } = body

    if (!name || !email || !branch || !password) {
      // Log missing-fields rejections so abuse patterns are visible
      await logEvent(email ?? null, "REGISTER_REJECTED_MISSING_FIELDS")
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const canonical = email.trim().toLowerCase()

    if (!/@iiitl\.ac\.in$/i.test(canonical)) {
      await logEvent(canonical, "REGISTER_REJECTED_INVALID_DOMAIN")
      return NextResponse.json(
        { error: "Only @iiitl.ac.in emails are allowed." },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db()

    const existingUser = await db.collection("users").findOne({ email: canonical })
    if (existingUser) {
      await logEvent(canonical, "REGISTER_REJECTED_DUPLICATE")
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

    try {
      await db.collection("users").insertOne({
        name,
        email:          canonical,
        branch,
        graduationYear,
        password:       hash,
        createdAt:      new Date(),
      })
    } catch (err: unknown) {
      // Handle the race where two concurrent requests both pass the findOne
      // check above and one then hits a duplicate-key error on insert
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code: number }).code === 11000
      ) {
        await logEvent(canonical, "REGISTER_REJECTED_DUPLICATE")
        return NextResponse.json(
          { error: "An account with this email already exists." },
          { status: 409 }
        )
      }
      throw err
    }

    return NextResponse.json({ success: true })

  } catch (err: unknown) {
    console.error("Registration error:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}