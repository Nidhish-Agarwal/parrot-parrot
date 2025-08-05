import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URL!;

if (!MONGODB_URI) {
  throw new Error("Please define DB_URL in .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("🟢 DB Connected:", mongoose.connection.host);
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
