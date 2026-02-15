"use client";
export const dynamic = 'force-dynamic'; 
import { useSearchParams } from "next/navigation";
import styles from "./Booking.module.css";

export default function BookingPage() {
    const searchParams = useSearchParams();
    const date = searchParams.get("date");

    const provider = searchParams.get("provider");
    const packageName = searchParams.get("package");
    const price = searchParams.get("price");
    const duration = searchParams.get("duration");

    const handleBooking = async () => {
        const res = await fetch("/api/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "John Smith",
                email: "john@example.com",
                phone: "123456",
                location: "NY",
                provider,
                packageName,
                duration,
                price,
            }),
        });

        const data = await res.json();
        alert(data.message);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                <div className={styles.left}>
                    <h1 className={styles.title}>Complete Your Booking</h1>

                    {/* PROFILE */}
                    <div className={styles.section}>
                        <h3>Your Profile Information</h3>

                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Name</label>
                                <input defaultValue="John Smith" />
                            </div>

                            <div className={styles.field}>
                                <label>Email</label>
                                <input defaultValue="john.smith@example.com" />
                            </div>

                            <div className={styles.field}>
                                <label>Phone</label>
                                <input defaultValue="+1 (555) 123-4567" />
                            </div>

                            <div className={styles.field}>
                                <label>Location</label>
                                <input defaultValue="New York, NY" />
                            </div>
                        </div>
                    </div>

                    {/* ONLINE PRESENCE */}
                    <div className={styles.section}>
                        <h3>Your Online Presence</h3>

                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Author Website</label>
                                <input placeholder="https://yourwebsite.com" />
                            </div>

                            <div className={styles.field}>
                                <label>Book Page</label>
                                <input placeholder="Book landing page URL" />
                            </div>

                            <div className={styles.field}>
                                <label>Goodreads</label>
                                <input placeholder="Goodreads profile link" />
                            </div>

                            <div className={styles.field}>
                                <label>Twitter</label>
                                <input placeholder="Twitter profile link" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SUMMARY PANEL */}
                <div className={styles.summary}>
                    <h3>Selected Package</h3>

                    <div className={styles.summaryCard}>
                        <p><strong>Service Provider:</strong> {provider}</p>
                        <p><strong>Package:</strong> {packageName}</p>
                        <p><strong>Duration:</strong> {duration}</p>

                        <div className={styles.totalBox}>
                            <span>Total Amount</span>
                            <h2>${price}</h2>
                        </div>

                        <button className={styles.paymentBtn} onClick={handleBooking}>
                            Proceed to Payment
                        </button>

                        <p className={styles.secureNote}>
                            🔒 You will be redirected to our secure payment gateway
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}