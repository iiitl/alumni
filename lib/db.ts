import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

// Cache the connection in development to avoid multiple connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes a connection to the MongoDB database.
 * 
 * This function utilizes connection caching to prevent multiple database connections 
 * during hot-reloading in development environments. It reads the `MONGODB_URI` 
 * environment variable dynamically at invocation to ensure it captures runtime environment configurations.
 * 
 * @returns {Promise<typeof mongoose>} A promise that resolves to the Mongoose connection instance.
 * @throws {Error} Throws an error if the `MONGODB_URI` environment variable is not defined.
 */
export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}