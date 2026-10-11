import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { redisClient } from "@/lib/ratelimit";
import { isIiitlEmail, normalizeEmail } from "@/lib/auth-utils";

type PendingUser = {
  email: string;
  name: string;
  branch: string;
  graduationYear: number;
  hashedPassword: string;
};

function parsePendingUser(raw: unknown): PendingUser | null {
  const data = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!data || typeof data !== "object") return null;
  const { email, name, branch, graduationYear, hashedPassword } = data as Record<string, unknown>;
  const normalized = normalizeEmail(email);
  if (
    !isIiitlEmail(normalized) ||
    typeof name !== "string" ||
    typeof branch !== "string" ||
    typeof graduationYear !== "number" ||
    typeof hashedPassword !== "string"
  ) {
    return null;
  }
  return { email: normalized, name, branch, graduationYear, hashedPassword };
}

export async function GET(req: NextRequest) {
  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, req.url));
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return redirectTo("/login?error=InvalidToken");
  }
  if (!redisClient) {
    return redirectTo("/login?error=SignupUnavailable");
  }

  try {
    // 1. Claim the pending data. GETDEL makes the token single-use even if the
    // link is clicked twice at the same time.
    const rawData = await redisClient.getdel(`verify_${token}`);
    if (!rawData) {
      return redirectTo("/login?error=TokenExpired");
    }

    const pendingUser = parsePendingUser(rawData);
    if (!pendingUser) {
      return redirectTo("/login?error=InvalidToken");
    }

    // 2. Create the user only if nobody registered this email in the meantime.
    const db = (await clientPromise).db();
    await db.collection("users").updateOne(
      { email: pendingUser.email },
      {
        $setOnInsert: {
          ...pendingUser,
          emailVerified: new Date(),
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return redirectTo("/login?success=EmailVerified");
  } catch (error) {
    console.error({ severity: "ERROR", event: "EMAIL_VERIFICATION_FAILED", error });
    return redirectTo("/login?error=SignupUnavailable");
  }
}
