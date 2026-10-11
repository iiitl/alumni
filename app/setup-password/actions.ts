"use server";

import bcrypt from "bcryptjs";
import { getMongoClient } from "@/lib/mongodb";
import { redisClient } from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { isIiitlEmail, normalizeEmail } from "@/lib/auth-utils";

type PendingGoogleSignup = {
  email: string;
  googleAccountId: string;
  name?: string;
  image?: string;
};

function parsePendingGoogleSignup(raw: unknown): PendingGoogleSignup | null {
  let data: unknown;
  try {
    data = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const { email, googleAccountId, name, image } = data as Record<string, unknown>;
  const normalized = normalizeEmail(email);
  if (!isIiitlEmail(normalized) || typeof googleAccountId !== "string" || !googleAccountId) {
    return null;
  }
  return {
    email: normalized,
    googleAccountId,
    name: typeof name === "string" ? name : undefined,
    image: typeof image === "string" ? image : undefined,
  };
}

export async function completeGoogleSignup(token: string, formData: FormData) {
  const trimmedToken = typeof token === "string" ? token.trim() : "";
  if (!trimmedToken) {
    redirect("/login?error=InvalidToken");
  }

  // Validate before claiming the token, so a typo doesn't burn it.
  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 8) {
    redirect(`/setup-password?${new URLSearchParams({ token: trimmedToken, error: "PasswordTooShort" })}`);
  }

  if (!redisClient) {
    redirect("/login?error=SignupUnavailable");
  }

  // 1. Claim the pending Google data. GETDEL makes the token single-use, so a
  // double-submit can't create two accounts.
  const rawData = await redisClient.getdel(`pending_google_${trimmedToken}`);
  if (!rawData) {
    redirect("/login?error=TokenExpired");
  }

  const pending = parsePendingGoogleSignup(rawData);
  if (!pending) {
    redirect("/login?error=InvalidToken");
  }

  const db = (await getMongoClient()).db();

  // 2. Someone may have registered this email while the token was pending.
  const existingUser = await db.collection("users").findOne({ email: pending.email }, { projection: { _id: 1 } });
  if (existingUser) {
    redirect("/login?error=OAuthAccountNotLinked");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create the user and link the Google account. If linking fails, remove
  // the user again so no half-created account is left behind.
  let insertedId;
  try {
    ({ insertedId } = await db.collection("users").insertOne({
      name: pending.name,
      email: pending.email,
      image: pending.image,
      hashedPassword,
      emailVerified: new Date(), // They proved email ownership via Google
      createdAt: new Date(),
    }));
  } catch (error) {
    // The unique index on users.email caught a registration that landed
    // between the check above and this insert.
    if ((error as { code?: unknown }).code === 11000) {
      redirect("/login?error=OAuthAccountNotLinked");
    }
    throw error;
  }

  try {
    await db.collection("accounts").insertOne({
      userId: insertedId,
      type: "oidc",
      provider: "google",
      providerAccountId: pending.googleAccountId,
    });
  } catch (error) {
    await db.collection("users").deleteOne({ _id: insertedId });
    console.error({ severity: "ERROR", event: "GOOGLE_SIGNUP_LINK_FAILED", email: pending.email, error });
    redirect("/login?error=SignupUnavailable");
  }

  redirect("/login?success=AccountCreated");
}
