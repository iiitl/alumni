import { connectDB } from "./db";

async function connectAndPrepare() {
  const mongooseInstance = await connectDB();
  const client = mongooseInstance.connection.getClient();
  // Backstop against duplicate accounts from concurrent sign-ups. Index creation
  // is idempotent; if it fails (for example, existing duplicates), log and carry on.
  try {
    await client.db().collection("users").createIndex({ email: 1 }, { unique: true });
  } catch (error) {
    console.error({ severity: "ERROR", event: "USERS_EMAIL_INDEX_FAILED", error });
  }
  return client;
}

let clientPromise: ReturnType<typeof connectAndPrepare> | null = null;

/**
 * Returns the raw MongoDB client behind the shared Mongoose connection, for the
 * Auth.js adapter and the auth flows that write users directly.
 *
 * Connects lazily on first use. If connecting fails, the cached promise is
 * cleared so the next call retries instead of failing for the life of the process.
 */
export function getMongoClient() {
  if (!clientPromise) {
    clientPromise = connectAndPrepare().catch((error) => {
      clientPromise = null;
      throw error;
    });
  }
  return clientPromise;
}
