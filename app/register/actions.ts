"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { redisClient, limit } from "@/lib/ratelimit";
import { sendEmail } from "@/lib/email"; 
import clientPromise from "@/lib/mongodb";

export async function handleRegistration(prevState: unknown, formData: FormData) {
  try {
    const authUrl = process.env.AUTH_URL;
    if (!authUrl) throw new Error("Server configuration error: AUTH_URL is missing.");

    const rawEmail = formData.get("email");
    const rawPassword = formData.get("password");
    const rawBranch = formData.get("branch");
    const rawGradYear = formData.get("graduationYear");
    const rawName = formData.get("name");

    // 1. Explicitly narrow formData values to strings and reject empty/files
    if (typeof rawEmail !== "string" || !rawEmail.trim()) throw new Error("Invalid email");
    if (typeof rawPassword !== "string") throw new Error("Invalid password");
    if (typeof rawBranch !== "string" || !rawBranch.trim()) throw new Error("Invalid branch");
    if (typeof rawGradYear !== "string" || !rawGradYear.trim()) throw new Error("Invalid graduation year");
    if (typeof rawName !== "string" || !rawName.trim()) throw new Error("Invalid name");

    const email = rawEmail.trim();
    const password = rawPassword;
    const branch = rawBranch.trim();
    const graduationYearStr = rawGradYear.trim();
    const name = rawName.trim();

    if (!/@iiitl\.ac\.in$/i.test(email)) throw new Error("Invalid domain. Must end with @iiitl.ac.in");

    // 2. Validate password complexity and graduation year
    if (password.length < 8) throw new Error("Password must be at least 8 characters long.");
    
    const yearParsed = parseInt(graduationYearStr, 10);
    const currentYear = new Date().getFullYear();
    // Assuming IIITL started recently, graduation years from ~2018 to few years ahead
    if (isNaN(yearParsed) || yearParsed < 2018 || yearParsed > currentYear + 8) {
      throw new Error("Invalid graduation year.");
    }

    // 4. Rate Limiting by IP and Email
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "unknown_ip";
    
    // Throttle by IP (prevent spam bots)
    const ipLimit = await limit(`verify_ip_${ip}`, { maxRequests: 5, window: "1h" });
    if (!ipLimit.success) throw new Error("Too many registration attempts. Please try again later.");

    // Throttle by Email (prevent inbox bombing)
    const emailLimit = await limit(`verify_email_${email}`, { maxRequests: 3, window: "1h" });
    if (!emailLimit.success) throw new Error("Verification emails are being sent too quickly. Please check your inbox or wait an hour.");

    // 3. Check existing user in MongoDB
    const db = (await clientPromise).db();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      throw new Error("An account is already registered with this email. Please sign in instead.");
    }

    // 5. Hash the password and create pending user
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomUUID();

    const pendingUser = {
      email,
      name,
      branch,
      graduationYear: yearParsed,
      hashedPassword,
    };
    
    await redisClient?.set(`verify_${token}`, JSON.stringify(pendingUser), { ex: 24*60*60 });

    const verifyUrl = `${authUrl}/api/verify-email?token=${token}`;
    
    await sendEmail({
      to: email,
      subject: "Verify your IIITL Alumni Account",
      text: `Click here to verify your account: ${verifyUrl}`,
      html: `<a href="${verifyUrl}">Verify Account</a>`
    });

    return { success: true, message: "Check your email to verify your account." };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Registration failed." };
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