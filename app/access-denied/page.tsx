"use client"

import Link from "next/link"

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-background p-8 text-center">
        <h2 className="text-xl font-semibold">Access Denied</h2>
        <p className="mt-3 text-sm text-muted">
          Only <span className="font-medium text-foreground">@iiitl.ac.in</span> accounts are allowed to access this platform.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Back to sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Back to sign up
          </Link>
        </div>
      </div>
    </div>
  )
}