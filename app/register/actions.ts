"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { redisClient, limit } from "@/lib/ratelimit";
import { sendEmail } from "@/lib/email";
import { getMongoClient } from "@/lib/mongodb";
import { getClientIp, isIiitlEmail, normalizeEmail } from "@/lib/auth-utils";

export type RegistrationState = { success: boolean; message: string } | null;

/** An error whose message is safe to show to the person registering. */
class RegistrationError extends Error {}

const CHECK_EMAIL_MESSAGE = "Check your email to verify your account.";

export async function handleRegistration(
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  try {
    const authUrl = process.env.AUTH_URL;
    if (!authUrl) throw new Error("Server configuration error: AUTH_URL is missing.");
    if (!redisClient) throw new Error("Server configuration error: Redis is required for registration.");

    const email = normalizeEmail(formData.get("email"));
    const rawPassword = formData.get("password");
    const rawBranch = formData.get("branch");
    const rawGradYear = formData.get("graduationYear");
    const rawName = formData.get("name");

    // 1. Explicitly narrow formData values to strings and reject empty/files
    if (!email) throw new RegistrationError("Please enter your email.");
    if (typeof rawPassword !== "string") throw new RegistrationError("Please enter a password.");
    if (typeof rawBranch !== "string" || !rawBranch.trim()) throw new RegistrationError("Please choose your branch.");
    if (typeof rawGradYear !== "string" || !rawGradYear.trim()) throw new RegistrationError("Please enter your graduation year.");
    if (typeof rawName !== "string" || !rawName.trim()) throw new RegistrationError("Please enter your name.");

    const password = rawPassword;
    const branch = rawBranch.trim();
    const name = rawName.trim();

    if (!isIiitlEmail(email)) throw new RegistrationError("Please use your @iiitl.ac.in email address.");

    // 2. Validate password and graduation year
    if (password.length < 8) throw new RegistrationError("Password must be at least 8 characters long.");

    const yearParsed = parseInt(rawGradYear.trim(), 10);
    const currentYear = new Date().getFullYear();
    // IIITL's first batch graduated around 2018; allow a few years ahead for current students.
    if (isNaN(yearParsed) || yearParsed < 2018 || yearParsed > currentYear + 8) {
      throw new RegistrationError("Please enter a valid graduation year.");
    }

    // 3. Rate limit by IP (spam bots) and by email (inbox bombing)
    const ip = getClientIp(await headers());
    const ipLimit = await limit(`verify_ip_${ip}`, { maxRequests: 5, window: "1h" });
    if (!ipLimit.success) throw new RegistrationError("Too many registration attempts. Please try again later.");

    const emailLimit = await limit(`verify_email_${email}`, { maxRequests: 3, window: "1h" });
    if (!emailLimit.success) throw new RegistrationError("Verification emails are being sent too quickly. Please check your inbox or wait an hour.");

    // 4. Hash before the existence check so both branches take similar time.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Existing members get a heads-up email instead of an error, so the
    // form can't be used to find out who is registered.
    const db = (await getMongoClient()).db();
    const existingUser = await db.collection("users").findOne({ email }, { projection: { _id: 1 } });
    if (existingUser) {
      await sendEmail({
        to: email,
        subject: "You already have an IIITL Alumni account",
        text: `Someone tried to register with this email, but you already have an account. Sign in at ${authUrl}/login. If this wasn't you, you can ignore this email.`,
      });
      return { success: true, message: CHECK_EMAIL_MESSAGE };
    }

    // 6. Hold the pending user until the email is verified
    const token = crypto.randomUUID();

    const pendingUser = {
      email,
      name,
      branch,
      graduationYear: yearParsed,
      hashedPassword,
    };

    await redisClient.set(`verify_${token}`, JSON.stringify(pendingUser), { ex: 24 * 60 * 60 });

    const verifyUrl = `${authUrl}/api/verify-email?token=${token}`;

    const sent = await sendEmail({
      to: email,
      subject: "Verify your IIITL Alumni Account",
      text: `Click here to verify your account: ${verifyUrl}`,
      html: `<a href="${verifyUrl}">Verify Account</a>`
    });

    if (!sent) {
      await redisClient.del(`verify_${token}`);
      throw new Error("Failed to send verification email.");
    }

    return { success: true, message: CHECK_EMAIL_MESSAGE };
  } catch (error) {
    if (error instanceof RegistrationError) {
      return { success: false, message: error.message };
    }
    console.error({ severity: "ERROR", event: "REGISTRATION_FAILED", error });
    return { success: false, message: "Registration failed. Please try again later." };
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
