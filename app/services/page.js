"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Services.module.css";

import {
    FaBullhorn,
    FaPrint,
    FaBook,
    FaPenNib,
    FaEdit,
    FaBarcode,
    FaUserTie,
    FaGlobe,
    FaHandshake,
} from "react-icons/fa";

const iconMap = {
    FaBullhorn: <FaBullhorn />,
    FaPrint: <FaPrint />,
    FaBook: <FaBook />,
    FaPenNib: <FaPenNib />,
    FaEdit: <FaEdit />,
    FaBarcode: <FaBarcode />,
    FaUserTie: <FaUserTie />,
};

export default function ServicesSection() {

    const [services, setServices] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className={styles.wrapper}>

            {/* HERO */}
            <section className={styles.hero}>
                <h1>Our Publishing Services</h1>
                <p>
                    Comprehensive, professional publishing solutions tailored to bring
                    your book to life.
                </p>
                <button className={styles.primaryBtn}>Explore Services</button>
            </section>

            {/* SERVICES GRID */}
            <div className={styles.grid}>
                {services.map((service) => (
                    <div key={service._id} className={styles.card}>

                        <div className={styles.icon}>
                            {iconMap[service.icon]}
                        </div>

                        <h3 className={styles.title}>{service.title}</h3>
                        <p className={styles.description}>{service.description}</p>

                        <div className={styles.meta}>
                            <span>👤 {service.providers.length} providers</span>
                            <span className={styles.price}>
                                {service.priceRange}
                            </span>
                        </div>

                        <button
                            className={styles.button}
                            onClick={() => router.push(`/services/${service.slug}`)}
                        >
                            Select Service →
                        </button>

                    </div>
                ))}
            </div>

            {/* WHY US */}
            <section className={styles.why}>
                <h2>Why Choose Us?</h2>
                <p className={styles.subtitle}>
                    Our professional approach ensures your book reaches its full potential.
                </p>

                <div className={styles.features}>
                    <div className={styles.featureCard}>
                        <FaUserTie className={styles.featureIcon} />
                        <h4>Industry Experts</h4>
                        <p>Experienced publishing professionals guiding every step.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <FaGlobe className={styles.featureIcon} />
                        <h4>Global Reach</h4>
                        <p>Distribution networks that connect your book worldwide.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <FaHandshake className={styles.featureIcon} />
                        <h4>Personalized Support</h4>
                        <p>Dedicated team to ensure your success at every stage.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}