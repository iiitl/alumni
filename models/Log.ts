import mongoose from "mongoose"

const LogSchema = new mongoose.Schema({
  email: String,
  type: String,
  timestamp: { type: Date, default: Date.now },
})

export default mongoose.models.Log || mongoose.model("Log", LogSchema)