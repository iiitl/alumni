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