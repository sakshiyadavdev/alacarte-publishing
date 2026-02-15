"use client";

import styles from "./DashboardNavbar.module.css";
import Link from "next/link";
import { FaBell, FaUserCircle, FaSignOutAlt, FaSun, FaMoon } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);


    const [showDropdown, setShowDropdown] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Your manuscript review is complete.", read: false },
        { id: 2, text: "Invoice #2034 has been generated.", read: false },
        { id: 3, text: "Editor left feedback on Chapter 3.", read: true },
    ]);

    const dropdownRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        // localStorage.removeItem("token");
        localStorage.clear();
        sessionStorage.clear();

        router.push("/");
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
        <header className={styles.navbar}>
            {/* Left Side */}
            <div className={styles.logo}>
                📖 A LA CARTE Hybrid Publishing Services
            </div>

            {/* Right Side */}
            <nav className={styles.navLinks}>
                <Link
                    href="/dashboard"
                    className={
                        pathname === "/dashboard" ? styles.active : ""
                    }
                >
                    Dashboard
                </Link>

                <Link
                    href="/dashboard/profile"
                    className={
                        pathname === "/dashboard/profile" ? styles.active : ""
                    }
                >
                    <FaUserCircle /> Profile
                </Link>

                <div
                    className={styles.notification}
                    ref={dropdownRef}
                >
                    <FaBell onClick={toggleDropdown} className={styles.bellIcon} />
                    {unreadCount > 0 && (
                        <span className={styles.badge}>{unreadCount}</span>
                    )}

                    {showDropdown && (
                        <div className={styles.dropdown}>
                            {notifications.length === 0 && (
                                <div className={styles.empty}>No notifications</div>
                            )}

                            {notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={`${styles.dropdownItem} ${!n.read ? styles.unread : ""}`}
                                >
                                    <span>{n.text}</span>

                                    {!n.read && (
                                        <button
                                            className={styles.markBtn}
                                            onClick={() => markAsRead(n.id)}
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    className={styles.logout}
                    onClick={handleLogout}
                >
                    <FaSignOutAlt /> Logout
                </button>

                <li className={styles.themeItem}>
                    <button onClick={toggleTheme} className={styles.themeBtn}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                        {darkMode ? " Light Mode" : " Dark Mode"}
                    </button>
                </li>
            </nav>
        </header>
    );
}