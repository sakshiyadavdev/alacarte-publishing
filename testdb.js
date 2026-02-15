import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    } finally {
        process.exit(0);
    }
}

test();