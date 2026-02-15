"use client";

import styles from "./Contact.module.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";


export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Optional: client-side validation
        if (!formData.firstName || !formData.email || !formData.message) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                // Use the message returned by API
                throw new Error(data.message || "Server error");
            }

            alert(data.message);

            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            alert(error.message || "Something went wrong while submitting the form");
        }
    };

    
    return (
        <div className={styles.wrapper}>
            {/* HERO */}
            <section className={styles.hero}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Contact Our Team</h1>
                    <p>
                        Have questions about our publishing services? Our team is here to help you navigate your publishing journey.
                    </p>
                </motion.div>
            </section>

            {/* CONTACT INFO */}
            <section className={styles.infoSection}>
                <motion.div className={styles.infoCard} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <FaEnvelope className={styles.icon} />
                    <h3>Email Us</h3>
                    <p>publishing@proaceintl.com</p>
                    <p>We'll respond within 24 hours</p>
                </motion.div>

                <motion.div className={styles.infoCard} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <FaPhone className={styles.icon} />
                    <h3>Call Us</h3>
                    <p>Direct: 301 325 1550</p>
                    <p>Monday - Friday, 9am - 5pm EST</p>
                </motion.div>

                <motion.div className={styles.infoCard} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <FaMapMarkerAlt className={styles.icon} />
                    <h3>Visit Us</h3>
                    <p>Gaithersburg, MD 20878</p>
                    <p>Tampa, FL 34677</p>
                </motion.div>
            </section>

            {/* CONTACT FORM */}
            <section className={styles.formSection}>
                <h2>Send Us a Message</h2>
                <p>Tell us about your publishing needs...</p>
                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={styles.input}
                                type="text"
                                required
                            />
                            <label>First Name</label>
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={styles.input}
                                type="text"
                                required
                            />
                            <label>Last Name</label>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.input}
                                type="email"
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={styles.input}
                                type="text"
                            />
                            <label>Phone (optional)</label>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={styles.textarea}
                            rows="5"
                            required
                        ></textarea>
                        <label>Message</label>
                    </div>

                    {/* I’m not a robot */}
                    <div className={styles.checkboxGroup}>
                        <input type="checkbox" id="robot" required />
                        <label htmlFor="robot">I’m not a robot</label>
                    </div>

                    <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>
                        Send Message
                    </button>
                </form>
            </section>

            {/* WHY CHOOSE US */}
            <section className={styles.why}>
                <h2>Why Choose Us?</h2>
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <FaCheckCircle className={styles.featureIcon} />
                        <p>Personalized service tailored to your needs</p>
                    </div>
                    <div className={styles.feature}>
                        <FaCheckCircle className={styles.featureIcon} />
                        <p>Expert guidance throughout your publishing journey</p>
                    </div>
                    <div className={styles.feature}>
                        <FaCheckCircle className={styles.featureIcon} />
                        <p>Transparent pricing and clear communication</p>
                    </div>
                </div>
            </section>
        </div>
    );
}