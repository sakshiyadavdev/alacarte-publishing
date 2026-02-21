export const runtime = "nodejs";

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Author from "@/models/Author";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
    try {
        // ✅ Connect DB
        await connectDB();

        // ✅ Get FormData
        const formData = await req.formData();
        const authorId = formData.get("authorId");
        const service = JSON.parse(formData.get("service"));
        const file = formData.get("image");

        // ✅ Validate authorId
        if (!authorId || !mongoose.Types.ObjectId.isValid(authorId)) {
            return NextResponse.json(
                { error: "Invalid authorId" },
                { status: 400 }
            );
        }

        // ✅ Find Author
        const author = await Author.findById(authorId);
        if (!author) {
            return NextResponse.json(
                { error: "Author not found" },
                { status: 404 }
            );
        }

        // ✅ Handle Image Upload
        let imagePath = "";

        if (file && file.name) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "services" }, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    })
                    .end(buffer);
            });

            imagePath = uploadResult.secure_url;
        }

        // ✅ Ensure services array exists
        if (!Array.isArray(author.services)) {
            author.services = [];
        }

        // ✅ Build New Service
        const newService = {
            name: service.name || "",
            type: service.type || "",
            status: service.status || "Active",
            package: service.package || "",
            price: Number(service.price) || 0,
            provider: {
                name: service.provider?.name || "",
                image: imagePath, // ✅ saved file path
                rating: Number(service.provider?.rating) || 0,
                reviews: Number(service.provider?.reviews) || 0,
                location: service.provider?.location || "",
            },
            expires: service.expires ? new Date(service.expires) : undefined,
            purchased: service.purchased
                ? new Date(service.purchased)
                : undefined,
        };

        // ✅ Save to DB
        author.services.push(newService);
        await author.save();

        return NextResponse.json(
            { message: "Service added successfully", service: newService },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error in add-service POST:", err);
        return NextResponse.json(
            { error: err.message || "Server error" },
            { status: 500 }
        );
    }
}