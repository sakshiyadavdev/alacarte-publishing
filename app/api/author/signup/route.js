import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Author from "@/modals/Author";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        // Check password match
        if (body.password !== body.confirmPassword) {
            return NextResponse.json(
                { message: "Passwords do not match" },
                { status: 400 }
            );
        }

        // Check existing user
        const existingUser = await Author.findOne({
            $or: [{ email: body.email }, { username: body.username }],
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newAuthor = await Author.create({
            ...body,
            password: hashedPassword,
        });

        return NextResponse.json(
            { message: "Account created successfully", data: newAuthor },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup Error:", error);

        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}