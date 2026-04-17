"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { redisClient } from "@/lib/ratelimit";
import { sendEmail } from "@/lib/email"; 

export async function handleRegistration(prevState: unknown, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const branch = formData.get("branch") as string;
    const graduationYear = formData.get("graduationYear") as string;
    const name = formData.get("name") as string;

    if (!/@iiitl\.ac\.in$/i.test(email)) throw new Error("Invalid domain");

    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create a secure verification token
    const token = crypto.randomUUID();

    // 3. Store pending user data in Redis (Expires in 24 hours)
    const pendingUser = {
      email,
      name,
      branch,
      graduationYear,
      hashedPassword,
    };
    
    await redisClient?.set(`verify_${token}`, JSON.stringify(pendingUser), { ex: 24*60*60 });

    const verifyUrl = `${process.env.AUTH_URL}/api/verify-email?token=${token}`;
    
    await sendEmail({
      to: email,
      subject: "Verify your IIITL Alumni Account",
      text: `Click here to verify your account: ${verifyUrl}`,
      html: `<a href="${verifyUrl}">Verify Account</a>`
    });

    return { success: true, message: "Check your email to verify your account." };
  } catch (error: any) {
    return { success: false, message: error.message || "Registration failed." };
  }
}

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