"use client";

import styles from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {

    const [email, setEmail] = useState("");

    const handleSubscribe = async () => {

        if (!email) {
            alert("Please enter email");
            return;
        }

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            alert(data.message);
            setEmail("");  // clear input
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <footer className={styles.footer}>
            <div className="container">

                <div className={styles.topSection}>
                    <h2>A La Carte Publishing</h2>
                    <p>
                        Empowering authors with professional publishing, marketing,
                        and global distribution services.
                    </p>

                    <div className={styles.newsletter}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={handleSubscribe}>Subscribe</button>
                    </div>
                </div>

                <div className={styles.grid}>

                    <div>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Publishing Services</h4>
                        <ul>
                            <li>Editing</li>
                            <li>Cover Design</li>
                            <li>Marketing</li>
                            <li>Distribution</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Contact Us</h4>
                        <p>Email: support@alacartepublishing.com</p>
                        <p>Phone: +1 (800) 123-4567</p>

                        <div className={styles.social}>
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                </div>

                <div className={styles.bottom}>
                    © {new Date().getFullYear()} A LA CARTE Publishing Services. All rights reserved.
                </div>

            </div>
        </footer>
    );
}