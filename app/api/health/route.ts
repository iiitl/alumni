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

export const POST = withRateLimit(async (req: Request) => {
  // Create logic
});

export const PUT = withRateLimit(async (req: Request) => {
  // Update logic
});

export const DELETE = withRateLimit(async (req: Request) => {
  // Delete logic
});