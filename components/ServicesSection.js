"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ServicesSection.module.css";

import {
    FaBullhorn,
    FaPrint,
    FaBook,
    FaPenNib,
    FaEdit,
    FaBarcode,
    FaUserTie,
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
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                // console.log("Full API response:", data); 
                setServices(data);
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>Our Publishing Services</h2>

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
                                <span className={styles.price}>$ {service.priceRange}</span>
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
            </div>
        </section>
    );
}