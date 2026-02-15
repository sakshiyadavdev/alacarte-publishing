// /booking/page.js
"use client"; // optional, but safe
import { Suspense } from "react";
import BookingClient from "./BookingClient";

export const dynamic = "force-dynamic";

export default function BookingPage() {
    return (
        <Suspense fallback={<div>Loading booking...</div>}>
            <BookingClient />
        </Suspense>
    );
}