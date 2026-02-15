import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
    email: { type: String, required: true },
}, { timestamps: true });

const Newsletter = mongoose.models.Newsletter ||
    mongoose.model("Newsletter", NewsletterSchema);

export async function POST(req) {
    try {
        await connectDB();

        const { email } = await req.json();

        const newSubscriber = new Newsletter({ email });
        await newSubscriber.save();

        return Response.json({ message: "Subscribed successfully" });
    } catch (error) {
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}