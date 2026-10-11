"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { limit } from "@/lib/ratelimit"
import { getMongoClient } from "@/lib/mongodb"
import { isIiitlEmail, normalizeEmail } from "@/lib/auth-utils"

export async function signInWithMagicLink(formData: FormData) {
    const email = normalizeEmail(formData.get("email"));

    if (!isIiitlEmail(email)) {
        redirect("/login?error=AccessDenied")
    }

    // Separate bucket from the one in sendVerificationRequest, so each request
    // counts once per bucket and the effective limit stays at 5 per hour.
    const { success } = await limit(`magic_link_req_${email}`, {
        maxRequests: 5,
        window: '1h'
    });

    if (!success) {
        redirect("/login?error=RateLimited")
    }

    // Unknown emails get the same "check your inbox" page as members, so the
    // form can't be used to find out who has an account.
    const db = (await getMongoClient()).db();
    const existingUser = await db.collection("users").findOne({ email }, { projection: { _id: 1 } });
    if (!existingUser) {
        console.warn({ severity: "WARNING", event: "AUTH_SIGNIN_REJECTED", reason: "magic_link_unknown_user", email });
        redirect("/login/check-email")
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

export async function signInWithCredentials(formData: FormData) {
    const email = normalizeEmail(formData.get("email"));
    const password = formData.get("password");

    if (!isIiitlEmail(email) || typeof password !== "string" || !password) {
        redirect("/login?error=InvalidCredentials")
    }

    try {
        await signIn("credentials", { email, password, redirectTo: "/" })
    } catch (error) {
        if (error instanceof AuthError) {
            redirect("/login?error=InvalidCredentials")
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
