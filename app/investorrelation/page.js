"use client";

import styles from "./InvestorRelations.module.css";
import { motion } from "framer-motion";

export default function InvestorRelations() {

    const handleSubmit = async () => {
        const formData = {
            fullname: document.getElementById("fullname").value,
            email: document.getElementById("email").value,
            company: document.getElementById("company").value,
            range: document.getElementById("range").value,
            message: document.getElementById("message").value,
        };

        try {
            const res = await fetch("/api/investor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            alert("Inquiry Submitted Successfully ✅");

            // reset form
            document.querySelector("form").reset();
        } catch (error) {
            console.error("Submit Error:", error);
            alert("Something went wrong ❌");
        }
    };
    
    return (
        <div className={styles.wrapper}>
            {/* HERO */}
            <section className={styles.hero}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.heroContent}
                >
                    <h1>Investor Relations</h1>
                    <p>
                        Join us in revolutionizing the publishing industry with our innovative platform connecting authors with professional publishing services.
                    </p>
                </motion.div>
            </section>

            {/* INVESTMENT OPPORTUNITY */}
            <section className={styles.opportunity}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Investment Opportunity</h2>
                    <p>Why invest in A LA CARTE Publishing Services?</p>

                    <h3>Market Potential</h3>
                    <p>
                        The global publishing market is valued at over $100 billion, with digital transformation creating new opportunities for innovative platforms.
                    </p>

                    <h3>Our Unique Value Proposition</h3>
                    <p>
                        We're building the first comprehensive marketplace connecting authors with professional publishing services, streamlining the entire publishing process.
                    </p>

                    <h3>Growth Strategy</h3>
                    <p>
                        Our platform is designed to scale rapidly, with plans to expand into international markets and add new service categories.
                    </p>

                    {/* Current Platform Status as Cards */}
                    <section className={styles.statusSection}>
                        <h3>Current Platform Status</h3>
                        <div className={styles.statusCards}>
                            <motion.div
                                className={styles.card}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h4>10</h4>
                                <p>Core Services* (*coming soon)</p>
                            </motion.div>
                            <motion.div
                                className={styles.card}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h4>21+</h4>
                                <p>Potential Providers* (*coming soon)</p>
                            </motion.div>
                            <motion.div
                                className={styles.card}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h4>100%</h4>
                                <p>Provider Verification</p>
                            </motion.div>
                            <motion.div
                                className={styles.card}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h4>24/7</h4>
                                <p>Technical Support</p>
                            </motion.div>
                        </div>
                    </section>
                </motion.div>
            </section>

            {/* INVESTOR INQUIRIES FORM */}
            <section className={styles.formSection}>
                <h2>Investor Inquiries</h2>
                <p>
                    Interested in learning more about our investment opportunities? Fill out the form below and our team will get back to you.
                </p>

                <form className={styles.form}>
                    {/* First Row */}
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="fullname">Full Name</label>
                            <input
                                id="fullname"
                                type="text"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="company">Company</label>
                            <input
                                id="company"
                                type="text"
                                placeholder="Investment Firm LLC"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="range">Investment Range</label>
                            <input
                                id="range"
                                type="text"
                                placeholder="$50,000 - $100,000"
                                required
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            placeholder="Tell us about your investment interests and any specific questions you have..."
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    {/* I’m not a robot */}
                    <div className={styles.checkboxGroup}>
                        <input type="checkbox" id="robot" required />
                        <label htmlFor="robot">I’m not a robot</label>
                    </div>

                    {/* Submit */}
                    <div className={styles.submitWrapper}>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={styles.submitBtn}
                        >
                            Submit Inquiry
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}