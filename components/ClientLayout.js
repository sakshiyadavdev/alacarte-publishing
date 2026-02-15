"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientLayout({ children }) {
    const pathname = usePathname();

    // Dashboard routes detect
    const isDashboard = pathname.startsWith("/dashboard");

    return (
        <>
            {/* Show Landing Navbar only if NOT dashboard */}
            {!isDashboard && <Navbar />}

            {children}
        </>
    );
}