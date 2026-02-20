import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({ children }) {
    return (
        <>
            <DashboardNavbar />
            <main
                style={{
                    padding: "40px",
                    background: "var(--bg-color)",  // ✅ dynamic
                    minHeight: "100vh"
                }}
            >
                {children}
            </main>
        </>
    );
}