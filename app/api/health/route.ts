import { connectDB } from "@/lib/db";

export async function GET() {
  const start = Date.now();

  await connectDB();

  const latency = Date.now() - start;

  return Response.json({
    status: "ok",
    latency,
  });
}