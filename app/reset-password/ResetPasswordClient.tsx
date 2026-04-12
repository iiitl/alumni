"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Section } from "@/components/Section"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  if (!token) {
    return (
      <Section className="py-20">
        <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8 text-center">
          <h2 className="text-xl font-semibold">Invalid link</h2>
          <p className="mt-3 text-sm text-muted">
            This reset link is missing or malformed.
          </p>
          <Link
            href="/forgot-password"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Request a new link
          </Link>
        </div>
      </Section>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong.")
      } else {
        setDone(true)
        setTimeout(() => router.replace("/login"), 2000)
      }
    } catch {
      setError("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  if (done) {
    return (
      <Section className="py-20">
        <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8 text-center">
          <h2 className="text-xl font-semibold">Password updated</h2>
          <p className="mt-3 text-sm text-muted">
            Your password has been reset. Redirecting you to sign in...
          </p>
        </div>
      </Section>
    )
  }

  return (
    <Section className="py-20">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8">
        <h2 className="text-xl font-semibold">Reset your password</h2>
        <p className="mt-2 text-sm text-muted">Enter a new password below.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">New password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Reset password"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>
    </Section>
  )
}