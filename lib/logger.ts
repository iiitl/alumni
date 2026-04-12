import clientPromise from "./mongodb"
import mongoose from "mongoose"

// Define schema ONLY once
const LogSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    match: /@iiitl\.ac\.in$/i
  },
  type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, expires: "30d" },
})

// Prevent model overwrite
const Log =
  mongoose.models.Log || mongoose.model("Log", LogSchema)

export async function logEvent(email: string, type: string) {
  try {
    await clientPromise

    // ensure mongoose is connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!)
    }

    await Log.create({ email, type })
  } catch (err) {
    console.error("Logging failed:", err)
  }
}