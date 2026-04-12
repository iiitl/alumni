import { NextRequest, NextResponse } from "next/server";
import { limit } from "./ratelimit";

/**
 * Wraps a Next.js API route handler to apply rate limiting.
 *
 * @example
 * export const POST = withRateLimit(async (req: NextRequest) => {
 *   // Create logic
 *   return Response.json({ success: true });
 * });
 *
 * export const PUT = withRateLimit(async (req: NextRequest) => {
 *   // Update logic
 *   return Response.json({ success: true });
 * });
 *
 * export const DELETE = withRateLimit(async (req: NextRequest) => {
 *   // Delete logic
 *   return Response.json({ success: true });
 * });
 */
export function withRateLimit<T extends unknown[]>(
  handler: (req: NextRequest, ...args: T) => Promise<Response> | Response
) {
  return async (req: NextRequest, ...args: T) => {
    // Determine the user's IP or identifier to use as the rate limit key
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

    // Call your limit function (allow e.g. 5 requests per minute)
    const { success, retryAfter } = await limit(ip, {
      maxRequests: 5,
      window: "1 m",
    });

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": retryAfter.toString() } }
      );
    }

    // If rate limit checks pass, execute the actual API route logic
    return handler(req, ...args);
  };
}