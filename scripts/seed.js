const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;


async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    await mongoose.connection.db.collection("pings").insertOne({
      message: "pong",
      createdAt: new Date(),
    });

    console.log("Seed successful");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();