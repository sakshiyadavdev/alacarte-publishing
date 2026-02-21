import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
    try {
        await connectDB(); // DB connect inside function (IMPORTANT)

        const data = await req.json(); // request body read correctly

        const newBooking = await Booking.create(data);

        return NextResponse.json(newBooking, { status: 201 });

    } catch (error) {
        console.error("Booking Error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}