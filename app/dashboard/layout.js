import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({ children }) {
    return (
        <>
            <DashboardNavbar />
            <main
                style={{
                    padding: "40px",
                    background: "#f5f6f8",
                    minHeight: "100vh"
                }}
            >
                {children}
            </main>
        </>
    );
}