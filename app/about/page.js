"use client";

import styles from "./About.module.css";
import { FaUserFriends, FaBookOpen } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <div className={styles.wrapper}>
            {/* HERO SECTION */}
            <section className={styles.hero}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>About A LA CARTE Publishing Services</h1>
                    <p>
                        Your trusted partner in bringing authors' dreams to life through professional publishing services.
                    </p>

                </motion.div>
                <motion.div
                    className={styles.heroIcon}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <FaBookOpen size={120} color="#ff6f61" />
                </motion.div>
            </section>

            {/* MISSION SECTION */}
            <section className={styles.mission}>
                <motion.div
                    className={styles.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Our Mission</h2>
                    <p>
                        At A LA CARTE Publishing Services, we believe every author deserves access to professional publishing services. Our mission is to empower authors by providing high-quality, customizable publishing solutions that bring their stories to life.
                    </p>
                    <p>
                        We combine industry expertise with personalized attention to ensure each author receives the support they need to succeed in their publishing journey.
                    </p>
                </motion.div>
                <motion.div
                    className={styles.missionIcon}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* <FaBullseye size={100} color="#6c63ff" /> */}
                    <Image
                        src="/images/mission.jpg"
                        alt="Our Mission"
                        width={400}   // width adjust karein
                        height={300}  // height adjust karein
                        className={styles.image}
                    />

                </motion.div>
            </section>

            {/* AUTHOR-FIRST APPROACH */}
            <section className={styles.authorFirst}>
                <motion.div
                    className={styles.iconContainer}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* <FaUserFriends size={100} color="#ffb400" /> */}
                    <Image
                        src="/images/approach.jpg" 
                        alt="Our Mission"
                        width={400}   // width adjust karein
                        height={300}  // height adjust karein
                        className={styles.image}
                    />
                </motion.div>
                <motion.div
                    className={styles.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Our Author-First Approach</h2>
                    <p>We believe in empowering authors—not controlling them.</p>
                    <p>
                        We offer professional publishing services that mirror the quality and support of traditional publishers, without taking away your rights. You retain 100% ownership of your manuscript, your content, and your creative vision.
                    </p>
                    <p>
                        Unlike traditional publishing houses, we ensure that you keep all domestic and international rights to your work. Your book is—and always will be—entirely yours.
                    </p>
                </motion.div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <h2>Ready to Start Your Publishing Journey?</h2>
                <p>
                    Join hundreds of successful authors who have trusted A LA CARTE Publishing Services to bring their stories to life.
                </p>
                <Link href="/services">
                    <button className={styles.primaryBtn}>Explore Our Services</button>
                </Link>
            </section>
        </div>
    );
}