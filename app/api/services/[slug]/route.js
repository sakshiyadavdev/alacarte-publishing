import Service from "@/models/Service";
import { connectDB } from "@/lib/db";

export async function GET(req, { params }) {
    try {
        await connectDB();

        const { slug } = params; // destructure slug from params
        if (!slug) return new Response(JSON.stringify({ error: "Slug missing" }), { status: 400 });

        const service = await Service.findOne({ slug }).lean();
        if (!service) {
            return new Response(JSON.stringify({ error: "Service not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(service), { status: 200 });
    } catch (err) {
        console.error("API error:", err);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}