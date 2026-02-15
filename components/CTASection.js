import Link from "next/link";

export default function CTASection() {
    return (
        <section style={{ textAlign: "center", padding: "100px 20px" }}>
            <h2>Ready to Publish Your Book?</h2>
            <p style={{ margin: "15px 0 25px", color: "#555" }}>
                Let us help you navigate the publishing journey
            </p>
            <Link href="/contact" passHref>
                <button
                    style={{
                        background: "black",
                        color: "white",
                        padding: "12px 28px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Contact Us Today
                </button>
            </Link>
        </section>
    );
}