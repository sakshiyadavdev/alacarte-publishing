"use client";

import styles from "./AudienceSection.module.css";
import { FaBookOpen, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AudienceSection() {
    return (
        <section className={styles.section}>

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className={styles.icon}>
                    <FaBookOpen />
                </div>

                <h3>For Authors</h3>
                <p>
                    Publish your book with our comprehensive publishing services
                </p>

                <Link href="/author-signup">
                    <button className={styles.button}>Get Started</button>
                </Link>
            </motion.div>

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <div className={styles.icon}>
                    <FaBriefcase />
                </div>

                <h3>For Service Providers</h3>
                <p>
                    Join our network of professional publishing service providers
                </p>

                <button className={styles.button}>Get Started</button>
            </motion.div>

        </section>
    );
}