import mongoose from "mongoose"
import { connectDB } from "./db"

const RateLimitSchema = new mongoose.Schema({
  email:       { type: String, required: true, unique: true },
  count:       { type: Number, default: 0 },
  windowStart: { type: Date, default: Date.now, expires: "1h" }, // TTL kept
})

const RateLimit =
  mongoose.models.RateLimit || mongoose.model("RateLimit", RateLimitSchema)

const WINDOW_MS  = 60 * 60 * 1000
const MAX_EVENTS = 5

export async function checkRateLimit(email: string) {
  if (!email || typeof email !== "string") {
    return { allowed: false }
  }

  const normalizedEmail = email.toLowerCase()

  try {
    await connectDB()

    const now  = new Date()
    const from = new Date(now.getTime() - WINDOW_MS)

    // Atomic update + TTL-compatible logic
    const doc = await RateLimit.findOneAndUpdate(
      { email: normalizedEmail },
      [
        {
          $set: {
            windowStart: {
              $cond: [{ $lt: ["$windowStart", from] }, now, "$windowStart"],
            },
            count: {
              $cond: [
                { $lt: ["$windowStart", from] },
                1,
                { $add: ["$count", 1] },
              ],
            },
          },
        },
      ],
      { upsert: true, new: true }
    )

    // Safety rollback (from version 2)
    if (doc.count > MAX_EVENTS) {
      await RateLimit.updateOne(
        { _id: doc._id },
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