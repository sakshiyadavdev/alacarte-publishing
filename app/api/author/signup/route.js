import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Author from "@/models/Author";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        if (body.password !== body.confirmPassword) {
            return NextResponse.json(
                { message: "Passwords do not match" },
                { status: 400 }
            );
        }

        const existingUser = await Author.findOne({
            $or: [{ email: body.email }, { username: body.username }],
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const { confirmPassword, agree, password, ...safeData } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAuthor = await Author.create({
            ...safeData,
            password: hashedPassword,
        });

        return NextResponse.json(
            { message: "Account created successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Signup Error:", error);

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}