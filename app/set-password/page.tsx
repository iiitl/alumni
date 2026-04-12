"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SetPasswordPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()
      console.log("API response:", data)

      if (res.ok) {
        // force reload so session updates
        window.location.href = "/"
      } else {
        console.error("Error response:", data)
        alert("Something went wrong")
      }
    } catch (err) {
      console.error("Request failed:", err)
      alert("Request failed")
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