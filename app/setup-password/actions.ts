"use server";

import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { redisClient } from "@/lib/ratelimit";
import { redirect } from "next/navigation";

export async function completeGoogleSignup(token: string, formData: FormData) {
  if (!token || typeof token !== "string" || !token.trim()) {
    redirect("/setup-password?error=InvalidToken")
  }

  const password = formData.get("password") as string;
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (!redisClient) {
    throw new Error("Internal Server Error: Redis required for atomic signups.");
  }

  // 1. Fetch pending Google data from Redis
  const rawData = await redisClient.get(`pending_google_${token.trim()}`);
  if (!rawData) {
    redirect("/setup-password?error=TokenExpired")
  }
  
  // Upstash returns deeply parsed JSON natively sometimes depending on setup, but handle string fallback
  let pendingData: unknown
  try {
    pendingData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
  } catch {
    redirect("/setup-password?error=InvalidTokenPayload")
  }

  if (
    !pendingData ||
    typeof pendingData !== "object" ||
    !("email" in pendingData) ||
    !("googleAccountId" in pendingData) ||
    typeof (pendingData as { email: unknown }).email !== "string" ||
    typeof (pendingData as { googleAccountId: unknown }).googleAccountId !== "string"
  ) {
    redirect("/setup-password?error=InvalidTokenPayload")
  }

  // 2. Hash the new password safely
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. ATOMIC SAVE: Insert User and Account manually into MongoDB
  const db = (await clientPromise).db();
  
  // Create user
  const result = await db.collection("users").insertOne({
    name: (pendingData as { name?: string }).name,
    email: (pendingData as { email: string }).email,
    image: (pendingData as { image?: string }).image,
    hashedPassword: hashedPassword,
    emailVerified: new Date(), // They proved email ownership via Google
  });

  // Link the Google Account to this new User so NextAuth recognizes it later
  await db.collection("accounts").insertOne({
    userId: result.insertedId,
    type: "oauth",
    provider: "google",
    providerAccountId: (pendingData as { googleAccountId: string }).googleAccountId,
  });

  // 4. Delete the Redis token to prevent duplicate account creation
  await redisClient.del(`pending_google_${token.trim()}`);

  // 5. Registration fully atomic! Send them to login (or directly sign them in if configured)
  redirect("/login?success=AccountCreated");
}