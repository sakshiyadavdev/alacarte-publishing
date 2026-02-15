import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { firstName, lastName, email, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { message: "Please fill all required fields" },
        { status: 400 }
      );
    }

    const newMessage = new Contact(body);
    await newMessage.save();

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("API POST Error:", error);

    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}