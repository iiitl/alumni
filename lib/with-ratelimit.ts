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
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    
    const identifier = `${req.nextUrl.pathname}:${ip}`;

    const { success, retryAfter } = await limit(identifier, {
      maxRequests: 5,
      window: "1 m",
    });

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": retryAfter.toString() } }
      );
    }

    return handler(req, ...args);
  };
}