import mongoose from "mongoose"
import { connectDB } from "./db"

const RateLimitSchema = new mongoose.Schema({
  email:       { type: String, required: true, unique: true },
  count:       { type: Number, default: 0 },
  windowStart: { type: Date, default: Date.now, expires: "1h" },
})

const RateLimit =
  mongoose.models.RateLimit || mongoose.model("RateLimit", RateLimitSchema)

export async function checkRateLimit(email: string) {
  if (!email || typeof email !== "string") {
    return { allowed: false }
  }

  const normalizedEmail = email.toLowerCase()

  try {
    await connectDB()

    const windowStart = new Date(Date.now() - 60 * 60 * 1000)

    const bucket = await RateLimit.findOneAndUpdate(
      { email: normalizedEmail, windowStart: { $gte: windowStart } },
      { $inc: { count: 1 }, $setOnInsert: { windowStart: new Date() } },
      { upsert: true, returnDocument: "after" }
    )

    if (bucket.count > 5) {
      await RateLimit.updateOne(
        { _id: bucket._id },
        { $inc: { count: -1 } }
      )
      return { allowed: false }
    }

    return { allowed: true }
  } catch (err) {
    console.error("Rate limit db error:", err)
    return { allowed: false }
  }
}