"use client"

import Link from "next/link"
import { Section } from "@/components/Section"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginClient() {
  const [email, setEmail] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    await signIn("email", {
      email,
      callbackUrl: "/",
    })
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

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md border border-border text-sm font-semibold"
        >
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