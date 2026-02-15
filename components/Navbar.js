"use client";
import { useState } from "react";
import Link from "next/link";
import {
    FaBook,
    FaBars,
    FaTimes,
    FaHome,
    FaUser,
    FaCogs,
    FaEnvelope,
    FaSun,
    FaMoon,
    FaExchangeAlt
} from "react-icons/fa";
import styles from "./Navbar.module.css";
import { useEffect } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setDarkMode(!darkMode);
    };

    return (
        <nav className={styles.nav}>
            <div className="container">
                <div className={styles.wrapper}>
                    <h2 className={styles.logo}>
                        <FaBook /> A La Carte
                    </h2>


                    <div
                        className={styles.menuIcon}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    <ul className={`${styles.links} ${menuOpen ? styles.active : ""}`}>
                        <li>
                            <Link href="/" onClick={closeMenu}>
                                <FaHome className={styles.navIcon} /> Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" onClick={closeMenu}>
                                <FaUser className={styles.navIcon} /> About
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" onClick={closeMenu}>
                                <FaCogs className={styles.navIcon} /> Services
                            </Link>
                        </li>

                        <li>
                            <Link href="/contact" onClick={closeMenu}>
                                <FaEnvelope className={styles.navIcon} /> Contact
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/investorrelation"
                                onClick={closeMenu}
                                className={styles.activeMenu}
                            >
                                <FaExchangeAlt className={styles.investor} /> Investor Relations
                            </Link>
                        </li>

                        <li>
                            <Link href="/login" onClick={closeMenu}>
                                <FaUser className={styles.navIcon} /> Login
                            </Link>
                        </li>

                        <li className={styles.themeItem}>
                            <button onClick={toggleTheme} className={styles.themeBtn}>
                                {darkMode ? <FaSun /> : <FaMoon />}
                                {darkMode ? " Light Mode" : " Dark Mode"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}