import { connectDB } from "../../../lib/db";
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    location: String,
    provider: String,
    packageName: String,
    duration: String,
    price: String,
}, { timestamps: true });

const Booking = mongoose.models.Booking ||
    mongoose.model("Booking", BookingSchema);

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();

        const newBooking = new Booking(data);
        await newBooking.save();

        return Response.json({ message: "Booking successful" });
    } catch (error) {
        return Response.json({ error: "Booking failed" }, { status: 500 });
    }
}