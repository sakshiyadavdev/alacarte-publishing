"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./ProvidersPage.module.css";

const providersData = [
    {
        name: "Book Tour Experts",
        rating: 5,
        location: "New York, NY",
        phone: "+1 (555) 123-4567",
        price: 2800,
        image:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
        name: "Author Tour Solutions",
        rating: 4.5,
        location: "Chicago, IL",
        phone: "+1 (555) 456-7890",
        price: 2400,
        image:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
        name: "Literary Events Pro",
        rating: 4,
        location: "Los Angeles, CA",
        phone: "+1 (555) 987-6543",
        price: 1900,
        image:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
];

export default function ProvidersPage({ params }) {
    const router = useRouter();
    const slug = params?.slug || "service";
    const title = slug.replace(/-/g, " ");

    const [maxPrice, setMaxPrice] = useState(3000);
    const [rating, setRating] = useState("all");
    const [location, setLocation] = useState("all");

    const [selectedProvider, setSelectedProvider] = useState(null);

    const filteredProviders = providersData.filter((p) => {
        const priceMatch = p.price <= maxPrice;
        const ratingMatch =
            rating === "all" ? true : p.rating >= Number(rating);
        const locationMatch =
            location === "all" ? true : p.location === location;

        return priceMatch && ratingMatch && locationMatch;
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* SIDEBAR */}
                <aside className={styles.sidebar}>
                    <h3>Filters</h3>

                    <label>Price Range</label>
                    <div className={styles.priceValue}>
                        $0 - ${maxPrice}
                    </div>
                    <input
                        type="range"
                        min="1000"
                        max="3000"
                        step="100"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />

                    <label>Minimum Rating</label>
                    <select onChange={(e) => setRating(e.target.value)}>
                        <option value="all">Any Rating</option>
                        <option value="4">4★ & up</option>
                        <option value="4.5">4.5★ & up</option>
                        <option value="5">5★</option>
                    </select>

                    <label>Location</label>
                    <select onChange={(e) => setLocation(e.target.value)}>
                        <option value="all">All Locations</option>
                        <option value="New York, NY">New York, NY</option>
                        <option value="Chicago, IL">Chicago, IL</option>
                        <option value="Los Angeles, CA">Los Angeles, CA</option>
                    </select>
                </aside>

                {/* PROVIDERS */}
                <main className={styles.providers}>
                    <h2 className={styles.heading}>
                        {title} Providers
                    </h2>

                    {filteredProviders.map((p, i) => (
                        <div key={i} className={styles.card}>
                            <img src={p.image} alt={p.name} />

                            <div className={styles.info}>
                                <h3>{p.name}</h3>
                                <p className={styles.meta}>
                                    ⭐ {p.rating} | 📍 {p.location}
                                </p>
                                <p className={styles.price}>${p.price}</p>

                                <button
                                    className={styles.btn}
                                    onClick={() => setSelectedProvider(p)}
                                >
                                    Select Package →
                                </button>
                            </div>
                        </div>
                    ))}
                </main>
            </div>

            {/* MODAL */}
            {selectedProvider && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => setSelectedProvider(null)}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.closeBtn}
                            onClick={() => setSelectedProvider(null)}
                        >
                            ✕
                        </button>

                        <h2>
                            {selectedProvider.name} - Available Packages
                        </h2>

                        <p className={styles.modalSub}>
                            Choose from available packages for {title} services
                        </p>

                        <div className={styles.packageGrid}>

                            {/* BASIC */}
                            <div className={styles.packageCard}>
                                <h3>Basic Package</h3>
                                <p>2-3 weeks</p>
                                <h4>$2,500</h4>
                                <span>one-time</span>

                                <ul>
                                    <li>3-city book tour</li>
                                    <li>Venue booking and coordination</li>
                                    <li>Basic event promotion</li>
                                    <li>Post-event report</li>
                                    <li>Email support</li>
                                </ul>

                                <button>Select Package</button>
                            </div>

                            {/* PREMIUM */}
                            <div className={styles.packageCardPremium}>
                                <h3>Premium Package</h3>
                                <p>4-6 weeks</p>
                                <h4>$5,000</h4>
                                <span>one-time</span>

                                <ul>
                                    <li>5-city book tour</li>
                                    <li>Comprehensive marketing campaign</li>
                                    <li>Media outreach</li>
                                    <li>Social media promotion</li>
                                    <li>Post-event analytics</li>
                                    <li>Priority support</li>
                                </ul>

                                <button
                                    onClick={() =>
                                        router.push(
                                            `/booking?provider=${selectedProvider.name}&package=Basic Package&price=2500&duration=2-3 weeks`
                                        )
                                    }
                                >
                                    Select Package
                                </button>
                            </div>

                        </div>

                        <p className={styles.guarantee}>
                            All packages include a 100% satisfaction guarantee,
                            customizable options, and dedicated support.
                        </p>

                    </div>
                </div>
            )}
        </div>
    );
}