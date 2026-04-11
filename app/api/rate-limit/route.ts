import { NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rateLimit"

export async function POST(req: Request) {
  const { email } = await req.json()

  const result = checkRateLimit(email)

  return NextResponse.json(result)
}