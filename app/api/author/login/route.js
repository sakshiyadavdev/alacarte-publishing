import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Author from "@/models/Author";

export async function POST(req) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        const user = await Author.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 400 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 400 }
            );
        }

        // ✅ Return the user object (without password for security)
        const safeUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            street: user.street,
            city: user.city,
            state: user.state,
            zip: user.zip,
            bio: user.bio,
            website: user.website,
            twitter: user.twitter,
            linkedin: user.linkedin,
            instagram: user.instagram,
            facebook: user.facebook,
        };

        return NextResponse.json(
            { message: "Login successful", user: safeUser },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}