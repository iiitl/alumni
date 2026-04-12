import mongoose from "mongoose"
import clientPromise from "./mongodb"

const RateLimitSchema = new mongoose.Schema({
  email: String,
  timestamp: { type: Date, default: Date.now, expires: "1h" },
})

const RateLimit =
  mongoose.models.RateLimit || mongoose.model("RateLimit", RateLimitSchema)

export async function checkRateLimit(email: string) {
  if (!email || typeof email !== "string") {
    return { allowed: false }
  }

  const normalizedEmail = email.toLowerCase()

  try {
    const client = await clientPromise

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!)
    }

    const windowMs = 60 * 60 * 1000 // 1 hour
    const oneHourAgo = new Date(Date.now() - windowMs)

    const count = await RateLimit.countDocuments({
      email: normalizedEmail,
      timestamp: { $gte: oneHourAgo },
    })

    if (count >= 5) {
      return { allowed: false }
    }

    await RateLimit.create({ email: normalizedEmail })
    return { allowed: true }
  } catch (err) {
    console.error("Rate limit db error:", err)
    return { allowed: false }
  }
}