import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  // Intercept NextAuth's error redirect before it reaches /access-denied
  if (pathname === "/api/auth/error") {
    const error = req.nextUrl.searchParams.get("error")
    if (error === "AccessDenied") {
      const googleRedirect = req.cookies.get("google-redirect")?.value
      if (googleRedirect) {
        // Valid iiitl.ac.in user — send to /login where cookie will be processed
        return NextResponse.redirect(`${origin}/login`)
      }
      // No cookie — genuinely invalid domain
      return NextResponse.redirect(`${origin}/access-denied`)
    }
  }

  if (pathname === "/login") {
    const googleRedirect = req.cookies.get("google-redirect")?.value
    if (googleRedirect) {
      const colonIndex = googleRedirect.indexOf(":")
      const destination = googleRedirect.slice(0, colonIndex) // "set-password" or "login"
      const value = googleRedirect.slice(colonIndex + 1)

      const paramName = destination === "set-password" ? "token" : "email"

      const res = NextResponse.redirect(
        `${origin}/${destination}?${paramName}=${encodeURIComponent(value)}`
      )
      res.cookies.delete("google-redirect")
      return res
    }
  }

  if (pathname === "/access-denied") {
        const res = NextResponse.next()
    res.cookies.delete("google-redirect")
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/access-denied", "/api/auth/error"],
}