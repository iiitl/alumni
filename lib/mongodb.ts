import { connectDB } from "./db";

/**
 * The raw MongoDB client behind the shared Mongoose connection, for the Auth.js
 * adapter and the auth flows that write users directly.
 *
 * On first connect it also makes sure `users.email` is unique, as a backstop
 * against duplicate accounts from concurrent sign-ups. Index creation is
 * idempotent; if it fails (for example, existing duplicates), the error is
 * logged and the app keeps working.
 */
const clientPromise = connectDB().then(async (mongooseInstance) => {
  const client = mongooseInstance.connection.getClient();
  try {
    await client.db().collection("users").createIndex({ email: 1 }, { unique: true });
  } catch (error) {
    console.error({ severity: "ERROR", event: "USERS_EMAIL_INDEX_FAILED", error });
  }
  return client;
});

export default clientPromise;
