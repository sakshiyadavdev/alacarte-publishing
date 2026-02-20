import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
    try {
        await connectDB();
        const services = await Service.find();
        return Response.json(services);
    } catch (error) {
        // console.log("REAL ERROR:", error);
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}