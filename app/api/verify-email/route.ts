import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { redisClient } from "@/lib/ratelimit";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token || !redisClient) {
    return NextResponse.redirect(new URL("/login?error=InvalidToken", req.url));
  }

  // 1. Retrieve pending data from Redis
  const rawData = await redisClient.get(`verify_${token}`);
  if (!rawData) {
    return NextResponse.redirect(new URL("/login?error=TokenExpired", req.url));
  }

  const pendingUser = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

  // 2. Atomic Save to MongoDB
  const db = (await clientPromise).db();
  
  // Atomic upsert — safe under concurrent clicks / retries.
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

  // 3. Delete the token from Redis
  await redisClient.del(`verify_${token}`);

  // 4. Redirect them to login
  return NextResponse.redirect(new URL("/login?success=EmailVerified", req.url));
}