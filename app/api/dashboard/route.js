import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Author from "@/models/Author";

export async function GET(request) {
    // console.log("🔥 Dashboard API HIT");

    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get("authorId");

    if (!authorId) {
        return NextResponse.json(
            { error: "authorId required" },
            { status: 400 }
        );
    }

    try {
        // 1️⃣ Connect DB
        await connectDB();

        // 2️⃣ Fetch author from DB
        const author = await Author.findById(authorId);

        if (!author) {
            return NextResponse.json(
                { error: "Author not found" },
                { status: 404 }
            );
        }

        // 3️⃣ Services from DB
        // ✅ Fully dynamic, fallback optional
        const services = author.services || [];

        // Optional: fallback dummy if you want to test
        // const services = author.services.length
        //   ? author.services
        //   : [
        //       {
        //         name: "Book Marketing",
        //         type: "Marketing",
        //         status: "Active",
        //         package: "Gold",
        //         price: 2000,
        //         provider: {
        //           name: "ProAce Agency",
        //           avatar: "https://i.pravatar.cc/100",
        //           rating: 4.8,
        //           reviews: 120,
        //           location: "New York",
        //         },
        //         expires: new Date(),
        //         purchased: new Date(),
        //       },
        //     ];

        // 4️⃣ Stats
        const stats = {
            activeServices: services.filter((s) => s.status === "Active").length,
            expiringSoon: services.filter((s) => {
                const now = new Date();
                const exp = new Date(s.expires);
                const diff = (exp - now) / (1000 * 60 * 60 * 24);
                return diff <= 7 && diff > 0;
            }).length,
            totalInvestment: services.reduce((sum, s) => sum + (s.price || 0), 0),
            totalServices: services.length,
        };

        // 5️⃣ Return fully dynamic JSON
        return NextResponse.json({
            user: {
                firstName: author.firstName,
            },
            stats,
            services, 
        });
    } catch (err) {
        console.error("Dashboard API Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}