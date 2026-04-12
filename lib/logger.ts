import mongoose from "mongoose"
import { connectDB } from "./db"

const LogSchema = new mongoose.Schema({
  email:     { type: String, default: "unknown" },
  type:      { type: String, required: true },
  timestamp: { type: Date, default: Date.now, expires: "30d" },
})

const Log = mongoose.models.Log || mongoose.model("Log", LogSchema)

export async function logEvent(email: string | undefined | null, type: string) {
  try {
    await connectDB()
    await Log.create({ email: email?.toLowerCase() ?? "unknown", type })
  } catch (err) {
    console.error("Logging failed:", err)
  }
}