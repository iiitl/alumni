import { connectDB } from "@/lib/db";
import { withRateLimit } from "@/lib/with-ratelimit";

export async function GET() {
  const start = Date.now();

  await connectDB();

  const latency = Date.now() - start;

  return Response.json({
    status: "ok",
    latency,
  });
}

export const POST = withRateLimit(async (_req: Request) => {
  // Create logic
  return Response.json({ success: true });
});

export const PUT = withRateLimit(async (_req: Request) => {
  // Update logic
  return Response.json({ success: true });
});

export const DELETE = withRateLimit(async (_req: Request) => {
  // Delete logic
  return Response.json({ success: true });
});