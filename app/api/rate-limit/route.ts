import { NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rateLimit"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { allowed: false, error: "Invalid email format" },
        { status: 400 }
      )
    }

    const isValidDomain = /@iiitl\.ac\.in$/i.test(email)
    if (!isValidDomain) {
      return NextResponse.json(
        { allowed: false, error: "Email must be a valid @iiitl.ac.in domain" },
        { status: 400 }
      )
    }

    const result = await checkRateLimit(email)

    return NextResponse.json(result)
  } catch (err) {
    console.error("Rate limit error:", err)
    return NextResponse.json(
      { allowed: false, error: "Malformed request" },
      { status: 400 }
    )
  }
}