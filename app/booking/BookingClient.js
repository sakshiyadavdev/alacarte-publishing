"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./Booking.module.css";

export default function BookingClient() {

    const searchParams = useSearchParams();

    const provider = searchParams.get("provider") || "N/A";
    const packageName = searchParams.get("package") || "N/A";
    const price = searchParams.get("price") || 0;
    const duration = searchParams.get("duration") || "N/A";

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        bookPage: "",
        goodreads: "",
        twitter: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBooking = async () => {
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Please fill required fields.");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    provider,
                    packageName,
                    duration,
                    price: Number(price),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = data.url; 
            } else {
                alert("Payment failed");
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* LEFT PROFILE PANEL */}
                <div className={styles.left}>
                    <h1 className={styles.title}>Complete Your Booking</h1>

                    <div className={styles.section}>
                        <h3>Your Profile Information</h3>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Name *</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Email *</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Phone *</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Location</label>
                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3>Your Online Presence</h3>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Author Website</label>
                                <input
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Book Page</label>
                                <input
                                    name="bookPage"
                                    value={formData.bookPage}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Goodreads</label>
                                <input
                                    name="goodreads"
                                    value={formData.goodreads}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Twitter</label>
                                <input
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                />
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

                        <button
                            className={styles.paymentBtn}
                            onClick={handleBooking}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Proceed to Payment"}
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