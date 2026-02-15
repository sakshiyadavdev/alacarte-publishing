import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Investor from "@/modals/Investor";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const investor = await Investor.create(body);

        return NextResponse.json(
            { message: "Inquiry submitted successfully", data: investor },
            { status: 201 }
        );
    } catch (error) {
        console.error("API Error:", error);

        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}