import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { randomUUID } from "crypto"
import { logEvent } from "@/lib/logger"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const canonical = email.trim().toLowerCase()

    if (!/@iiitl\.ac\.in$/i.test(canonical)) {
      await logEvent(canonical, "LOGIN_REJECTED_INVALID_DOMAIN")
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    const user = await db.collection("users").findOne({ email: canonical })
    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 400 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 400 })
    }

    const sessionToken = randomUUID()
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    await db.collection("sessions").insertOne({
      sessionToken,
      userId:  user._id,
      expires,
    })

    
    const useSecureCookies = process.env.NODE_ENV === "production"
    const cookieName = useSecureCookies
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token"

    const cookieStore = await cookies()
    cookieStore.set(cookieName, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure:   useSecureCookies,
      path:     "/",
      expires,
    })

    return NextResponse.json({ success: true })

  } catch (err: unknown) {
    console.error("Login Error:", err)
    return NextResponse.json({ error: "An internal error occurred. Please try again." }, { status: 500 })
  }
}