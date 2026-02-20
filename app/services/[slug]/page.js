"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./ProvidersPage.module.css";

export default function ProvidersPage() {

    const { slug } = useParams();  
    const router = useRouter();


    const [service, setService] = useState(null);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [rating, setRating] = useState("all");
    const [location, setLocation] = useState("all");
    const [selectedProvider, setSelectedProvider] = useState(null);

    // 🔥 Fetch Selected Service Data
    useEffect(() => {
        if (!slug) return;

        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => {
                const selected = data.find((s) => s.slug === slug);
                setService(selected);
            })
            .catch((err) => console.error(err));
    }, [slug]);

    if (!service) return <p>Loading...</p>;

    const filteredProviders = service.providers.filter((p) => {
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
                        min="100"
                        max="5000"
                        step="100"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
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
                        {[...new Set(service.providers.map(p => p.location))]
                            .map((loc, i) => (
                                <option key={i} value={loc}>
                                    {loc}
                                </option>
                            ))}
                    </select>
                </aside>

                {/* PROVIDERS */}
                <main className={styles.providers}>
                    <h2 className={styles.heading}>
                        {service.title} Providers
                    </h2>

                    {filteredProviders.map((p) => (
                        <div key={p._id} className={styles.card}>
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
                            Choose from available packages for {service.title}
                        </p>

                        <div className={styles.packageGrid}>

                            {selectedProvider.packages.map((pkg) => (
                                <div
                                    key={pkg._id}
                                    className={
                                        pkg.type === "premium"
                                            ? styles.packageCardPremium
                                            : styles.packageCard
                                    }
                                >
                                    <h3>{pkg.name}</h3>
                                    <p>{pkg.duration}</p>
                                    <h4>${pkg.price}</h4>
                                    <span>one-time</span>

                                    <ul>
                                        {pkg.features.map((f, i) => (
                                            <li key={i}>{f}</li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/booking?provider=${selectedProvider.name}&package=${pkg.name}&price=${pkg.price}&duration=${pkg.duration}`
                                            )
                                        }
                                    >
                                        Select Package
                                    </button>
                                </div>
                            ))}

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