"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function signInWithMagicLink(formData: FormData) {
    const email = formData.get("email") as string;
    
    if (!email || !/@iiitl\.ac\.in$/i.test(email)) {
        redirect("/login?error=AccessDenied")
    }

    try {
        await signIn("email", { email, redirectTo: "/" })
    } catch (error) {
        if (error instanceof AuthError) {
            redirect("/login?error=AccessDenied")
        }
        throw error
    }
}

export async function signInWithGoogle() {
  try {
      await signIn("google", { redirectTo: "/" })
  } catch (error) {
      if (error instanceof AuthError) {
          redirect("/login?error=AccessDenied")
      }
      throw error 
  }
}

