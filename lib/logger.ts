import clientPromise from "./mongodb"
import mongoose from "mongoose"

// Define schema ONLY once
const LogSchema = new mongoose.Schema({
  email: String,
  type: String,
  timestamp: { type: Date, default: Date.now },
})

// Prevent model overwrite (important in Next.js)
const Log =
  mongoose.models.Log || mongoose.model("Log", LogSchema)

export async function logEvent(email: string, type: string) {
  try {
    const client = await clientPromise

    // ensure mongoose is connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!)
    }

    await Log.create({ email, type })
  } catch (err) {
    console.error("Logging failed:", err)
  }
}