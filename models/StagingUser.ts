import mongoose, { Schema } from "mongoose"

const StagingUserSchema = new Schema({
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  name:         { type: String },
  image:        { type: String },
  googleId:     { type: String, required: true },
  oneTimeToken: { type: String, required: true },
  expiresAt:    { type: Date, required: true, index: { expireAfterSeconds: 0 } },
})

export const StagingUser =
  mongoose.models.StagingUser ||
  mongoose.model("StagingUser", StagingUserSchema)