"use client";

import { useRouter } from "next/navigation";
import styles from "./Services.module.css";
import { FaBarcode, FaBook, FaBullhorn, FaEdit, FaGlobe, FaHandshake, FaPenNib, FaPrint, FaUserTie } from "react-icons/fa";

const services = [
    {
        title: "Book Tour/Signing Management",
        slug: "book-tour-signing",
        icon: <FaBullhorn />,
        description: "Complete event planning and coordination for book tours.",
        providers: 3,
        priceRange: "$2,200 - $3,000"
    },
    {
        title: "Printing and Distribution",
        slug: "printing-distribution",
        icon: <FaPrint />,
        description: "High-quality book printing and worldwide distribution.",
        providers: 3,
        priceRange: "$2,800 - $3,500"
    },
    {
        title: "Book Promotion and Marketing",
        slug: "book-promotion-marketing",
        icon: <FaBook />,
        description: "Strategic marketing campaigns to maximize visibility.",
        providers: 2,
        priceRange: "$3,500 - $4,000"
    },
    {
        title: "Book Cover Design and Formatting",
        slug: "cover-design-formatting",
        icon: <FaPenNib />,
        description: "Professional cover design & formatting services.",
        providers: 3,
        priceRange: "$2,200 - $2,800"
    },
    {
        title: "Editing and Copyediting",
        slug: "editing-copyediting",
        icon: <FaEdit />,
        description: "Comprehensive editing for grammar and clarity.",
        providers: 3,
        priceRange: "$2,500 - $3,000"
    },
    {
        title: "ISBN and Library Assignment",
        slug: "isbn-library-assignment",
        icon: <FaBarcode />,
        description: "Official ISBN registration services.",
        providers: 2,
        priceRange: "$1,500 - $1,800"
    },
    {
        title: "Infomercial Creation Services",
        slug: "infomercial-creation",
        icon: <FaBarcode />,
        description: "Professional promotional video production.",
        providers: 2,
        priceRange: "$4,500 - $5,000"
    },
    {
        title: "Publishing Coaching Services",
        slug: "publishing-coaching",
        icon: <FaUserTie />,
        description: "One-on-one expert publishing guidance.",
        providers: 3,
        priceRange: "$3,000 - $3,500"
    }
];

export default function Services() {

    const router = useRouter();

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

            <div className={styles.grid}>
                {services.map((service, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.icon}>{service.icon}</div>
                        <h4>{service.title}</h4>
                        <p className={styles.description}>{service.description}</p>

                        <div className={styles.details}>
                            <span className={styles.providers}>
                                👤 {service.providers} providers
                            </span>

                            <span className={styles.price}>
                                💲 {service.priceRange}
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