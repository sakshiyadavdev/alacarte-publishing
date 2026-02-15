"use client";

import styles from "./Dashboard.module.css";
import {
    FaPlus,
    FaFileInvoiceDollar,
    FaChartLine,
    FaBookOpen,
    FaClock,
    FaDollarSign,
    FaCheckCircle,
    FaEdit
} from "react-icons/fa";

export default function DashboardPage() {
    return (
        <div className={styles.wrapper}>
            {/* Welcome Section */}
            <div className={styles.welcomeBox}>
                <div>
                    <h1>Welcome back, Author 👋</h1>
                    <p>Track your publishing journey and manage services easily.</p>
                </div>
                <button className={styles.primaryBtn}>
                    <FaPlus /> Purchase New Service
                </button>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.green}`}>
                    <FaCheckCircle className={styles.statIcon} />
                    <div>
                        <h3>2</h3>
                        <p>Active Services</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.orange}`}>
                    <FaClock className={styles.statIcon} />
                    <div>
                        <h3>1</h3>
                        <p>Expiring Soon</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.blue}`}>
                    <FaDollarSign className={styles.statIcon} />
                    <div>
                        <h3>$7,500</h3>
                        <p>Total Investment</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.purple}`}>
                    <FaBookOpen className={styles.statIcon} />
                    <div>
                        <h3>5</h3>
                        <p>Total Services</p>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            {/* Services Section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>Your Services</h2>
                        <p>Overview of all your active services and subscriptions</p>
                    </div>
                </div>

                {/* Service Card 1 */}
                <div className={styles.serviceCardAdvanced}>
                    <div className={styles.serviceLeft}>

                        <div className={styles.serviceIcon}>
                            📖
                        </div>

                        <div>
                            <h4>
                                Premium Writing Service
                                <span className={styles.serviceType}>
                                    (Book Tour/Signing Management)
                                </span>
                            </h4>

                            <div className={styles.packageRow}>
                                <span className={styles.activeBadge}>Active</span>
                                <span>Premium Package</span>
                                <span className={styles.price}>• $5,000</span>
                            </div>

                            <div className={styles.providerRow}>
                                <img
                                    src="https://i.pravatar.cc/40?img=3"
                                    alt="provider"
                                    className={styles.avatar}
                                />
                                <div>
                                    <p className={styles.providerName}>Book Tour Experts</p>
                                    <div className={styles.providerMeta}>
                                        ⭐ 5 (15) • 📍 New York, NY
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={styles.serviceRightAdvanced}>
                        <div className={styles.dateRow}>
                            📅 Expires: 2024-09-01
                        </div>
                        <div className={styles.dateRow}>
                            🕒 Purchased: 2024-03-01
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.linkBtn}>
                                ✏️ Write Review
                            </button>
                            <button className={styles.linkBtn}>
                                🔄 Renew Service
                            </button>
                        </div>
                    </div>
                </div>

                {/* Service Card 2 */}
                <div className={styles.serviceCardAdvanced}>
                    <div className={styles.serviceLeft}>

                        <div className={styles.serviceIcon}>
                            ✍️
                        </div>

                        <div>
                            <h4>
                                Editing Package
                                <span className={styles.serviceType}>
                                    (Book Editing)
                                </span>
                            </h4>

                            <div className={styles.packageRow}>
                                <span className={styles.activeBadge}>Active</span>
                                <span>Basic Package</span>
                                <span className={styles.price}>• $2,500</span>
                            </div>

                            <div className={styles.providerRow}>
                                <img
                                    src="https://i.pravatar.cc/40?img=5"
                                    alt="provider"
                                    className={styles.avatar}
                                />
                                <div>
                                    <p className={styles.providerName}>Literary Events Pro</p>
                                    <div className={styles.providerMeta}>
                                        ⭐ 4 (8) • 📍 Los Angeles, CA
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={styles.serviceRightAdvanced}>
                        <div className={styles.dateRow}>
                            📅 Expires: 2024-08-15
                        </div>
                        <div className={styles.dateRow}>
                            🕒 Purchased: 2024-02-15
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.linkBtn}>
                                ✏️ Write Review
                            </button>
                            <button className={styles.linkBtn}>
                                🔄 Renew Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
                <h2>Quick Actions</h2>

                <div className={styles.quickGrid}>
                    <div className={styles.quickCard}>
                        <FaPlus />
                        <p>Buy New Service</p>
                    </div>

                    <div className={styles.quickCard}>
                        <FaFileInvoiceDollar />
                        <p>View Invoices</p>
                    </div>

                    <div className={styles.quickCard}>
                        <FaChartLine />
                        <p>View Analytics</p>
                    </div>
                </div>
            </div>
        </div>
    );
}