"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function SetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const email = searchParams.get("email")

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/set-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push("/")
    } else {
      alert("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl border p-8"
      >
        <h2 className="text-xl font-semibold">Set your password</h2>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 w-full rounded-md border px-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="h-10 w-full rounded-md bg-black text-white"
        >
          {loading ? "Saving..." : "Save Password"}
        </button>
      </form>
    </div>
  )
}