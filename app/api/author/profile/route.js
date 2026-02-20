import {connectDB} from "@/lib/db"; 
import Author from "@/models/Author"; 

export async function GET(req) {
    try {
        await connectDB();
        const id = req.nextUrl.searchParams.get("id");
        if (!id) return new Response(JSON.stringify({ message: "ID missing" }), { status: 400 });

        const author = await Author.findById(id).lean();
        if (!author) return new Response(JSON.stringify({ message: "Author not found" }), { status: 404 });

        return new Response(JSON.stringify(author), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) return new Response(JSON.stringify({ message: "ID missing" }), { status: 400 });

        const updated = await Author.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!updated) return new Response(JSON.stringify({ message: "Author not found" }), { status: 404 });

        return new Response(JSON.stringify(updated), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}