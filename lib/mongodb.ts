import { connectDB } from "./db";

const clientPromise = connectDB().then((mongooseInstance) => {
  return mongooseInstance.connection.getClient();
});

export default clientPromise;