"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function signUpWithGoogle() {
  try {
      await signIn("google", { redirectTo: "/" })
  } catch (error) {
      if (error instanceof AuthError) {
          redirect("/login?error=AccessDenied")
      }
      throw error 
  }
}