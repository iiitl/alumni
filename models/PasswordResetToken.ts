import mongoose from "mongoose"
import crypto from "crypto"

export function hashToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex")
}

const PasswordResetTokenSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true, unique: true },
  email:     { type: String, required: true },
  expiresAt: { type: Date,   required: true, index: { expireAfterSeconds: 0 } },
})

export const PasswordResetToken =
  mongoose.models.PasswordResetToken ??
  mongoose.model("PasswordResetToken", PasswordResetTokenSchema)