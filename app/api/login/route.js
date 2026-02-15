import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/modals/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await connectDB();

        const { email, password, isProvider } = await req.json();

        // 1️⃣ Check user exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // 2️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // 3️⃣ Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role, // author or provider
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return NextResponse.json(
            {
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}