"use client"

import { useState } from "react"
import Link from "next/link"
import { Section } from "@/components/Section"


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong.")
      } else {
        setSubmitted(true)
      }
    } catch {
      setError("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <Section className="py-20">
        <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8 text-center">
          <h2 className="text-xl font-semibold">Check your email</h2>
          <p className="mt-3 text-sm text-muted">
            If an account exists for{" "}
            <span className="font-medium text-foreground">{email}</span>, a
            password reset link has been sent. It expires in 15 minutes.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Back to sign in
          </Link>
        </div>
      </Section>
    )
  }

  return (
    <Section className="py-20">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8">
        <h2 className="text-xl font-semibold">Forgot password</h2>
        <p className="mt-2 text-sm text-muted">
          Enter your <span className="font-medium text-foreground">@iiitl.ac.in</span> email and
          we&apos;ll send you a reset link.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <p className="mt-4 text-center text-sm text-muted">
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-brand">
            Back to sign in
          </Link>
        </p>
      </div>
    </Section>
  )
}