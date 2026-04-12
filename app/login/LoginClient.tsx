"use client"

import Link from "next/link"
import { Section } from "@/components/Section"
import { signIn, useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginClient() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/")
    }
  }, [status, router])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!/@iiitl\.ac\.in$/i.test(email)) {
      setError("Only @iiitl.ac.in emails are allowed.")
      return
    }

    try {
      if (!password) {
        // rate limit check BEFORE signIn
        const res = await fetch("/api/rate-limit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        const data = await res.json()

        if (!res.ok || !data.allowed) {
          setError(data.error || "Too many requests. Please try again later.")
          return
        }

        // proceed normally
        await signIn("email", {
          email,
          callbackUrl: "/",
        })
      } else {
        // use native fetch for credentials database support
        const result = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        if (!result.ok) {
          const data = await result.json()
          setError(data.error || "Invalid email or password.")
        } else {
          window.location.href = "/"
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <Section className="py-20">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8">
        <p className="mt-2 text-sm text-muted">
          Sign in to access the alumni directory, events, and the job board.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank for magic link"
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-700"
          >
            Sign in
          </button>
        </form>

        {/* ERROR MESSAGE (no UI change, just added) */}
        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-background text-sm font-semibold hover:bg-brand hover:text-white hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand active:bg-brand-700 transition-colors cursor-pointer"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
             <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
             <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
             <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
             <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-sm text-muted">
          New to IIITL Alumni?{" "}
          <Link href="/register" className="font-medium text-brand">
            Create an account
          </Link>
        </p>
      </div>
    </Section>
  )
}