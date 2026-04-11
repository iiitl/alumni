"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomeWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.needsPassword) {
      router.push("/set-password?email=" + session.user.email)
    }
  }, [session, router])

  return <>{children}</>
}