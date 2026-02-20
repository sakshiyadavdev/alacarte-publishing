// app/api/dashboard/renew-service/route.js
import { NextResponse } from "next/server";
import Author from "@/models/Author";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        await connectDB();

        const { authorId, serviceName, newPurchased, newExpires } = await req.json();

        if (!authorId || !mongoose.Types.ObjectId.isValid(authorId)) {
            return NextResponse.json({ error: "Invalid authorId" }, { status: 400 });
        }

        const author = await Author.findById(authorId);
        if (!author) {
            return NextResponse.json({ error: "Author not found" }, { status: 404 });
        }

        // Find the service to renew
        const service = author.services.find(s => s.name === serviceName);
        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        // Update purchased and expires dates
        service.purchased = newPurchased ? new Date(newPurchased) : new Date();
        service.expires = newExpires ? new Date(newExpires) : new Date(new Date().setFullYear(new Date().getFullYear() + 1));

        await author.save();

        return NextResponse.json({ message: "Service renewed successfully", service }, { status: 200 });
    } catch (err) {
        console.error("Error in renew-service POST:", err);
        return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
    }
}