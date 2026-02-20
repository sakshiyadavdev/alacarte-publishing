"use client";

import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import {
    FaPlus,
    FaFileInvoiceDollar,
    FaChartLine,
    FaBookOpen,
    FaClock,
    FaDollarSign,
    FaCheckCircle,
} from "react-icons/fa";
import AddServiceForm from "@/components/AddServiceForm/AddServiceForm";

export default function DashboardPage() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);


    // console.log("Current userId:", userId);

    // 🔹 Logged-in author ka ID
    useEffect(() => {
        const storedUser = localStorage.getItem("author");
        console.log("Stored user raw:", storedUser);

        if (storedUser && storedUser !== "undefined") {
            try {
                const user = JSON.parse(storedUser);
                // console.log("Parsed user:", user);
                setUserId(user._id);
            } catch (err) {
                console.error("Invalid JSON", err);
            }
        }
    }, []);

    // 🔹 Fetch dashboard data
    useEffect(() => {
        if (!userId) {
            setLoading(false); // 👈 important
            return;
        }

        const fetchDashboard = async () => {
            try {
                const res = await fetch(`/api/dashboard?authorId=${userId}`);
                const data = await res.json();
                setDashboardData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [userId]);

    if (loading) {
        return <div className={styles.loader}>Loading dashboard...</div>;
    }

    if (!dashboardData) {
        return <div className={styles.loader}>No dashboard data available.</div>;
    }

    // console.log("Dashboard data:", dashboardData);

    const handleServiceAdded = (newService) => {
        setDashboardData((prev) => ({
            ...prev,
            services: [...prev.services, newService],
            stats: {
                ...prev.stats,
                activeServices: prev.stats.activeServices + (newService.status === "Active" ? 1 : 0),
                totalInvestment: prev.stats.totalInvestment + (newService.price || 0),
                totalServices: prev.stats.totalServices + 1,
            },
        }));
        setShowModal(false); // close modal after adding
    };


    const handleRenewService = async (service) => {
        try {
            const res = await fetch("/api/dashboard/renew-service", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    authorId: userId,
                    serviceName: service.name,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                // Only update dates, keep existing provider.image
                setDashboardData(prev => ({
                    ...prev,
                    services: prev.services.map(s =>
                        s.name === service.name
                            ? {
                                ...s,
                                purchased: data.service.purchased,
                                expires: data.service.expires,
                            }
                            : s
                    ),
                }));
                alert("Service renewed successfully!");
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* Welcome Section */}
            <div className={styles.welcomeBox}>
                <div>
                    <h1>Welcome back, {dashboardData?.user?.firstName || "Author"} 👋</h1>
                    <p>Track your publishing journey and manage services easily.</p>
                </div>

                {/* 🔹 Add Service Button */}
                <button
                    className={styles.addServiceBtn}
                    onClick={() => setShowModal(true)}
                >
                    + Add Service
                </button>
            </div>

            {/* 🔹 Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button
                            className={styles.closeModalBtn}
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        <AddServiceForm authorId={userId} onServiceAdded={handleServiceAdded} />
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            {loading ? (
                <div className={styles.loader}>Loading dashboard...</div>
            ) : dashboardData ? (
                <div className={styles.statsGrid}>
                    <div className={`${styles.statCard} ${styles.green}`}>
                        <FaCheckCircle className={styles.statIcon} />
                        <div>
                            <h3>{dashboardData?.stats?.activeServices ?? 0}</h3>
                            <p>Active Services</p>
                        </div>
                    </div>

                    <div className={`${styles.statCard} ${styles.orange}`}>
                        <FaClock className={styles.statIcon} />
                        <div>
                            <h3>{dashboardData?.stats?.expiringSoon ?? 0}</h3>
                            <p>Expiring Soon</p>
                        </div>
                    </div>

                    <div className={`${styles.statCard} ${styles.blue}`}>
                        <FaDollarSign className={styles.statIcon} />
                        <div>
                            <h3>${dashboardData?.stats?.totalInvestment ?? 0}</h3>
                            <p>Total Investment</p>
                        </div>
                    </div>

                    <div className={`${styles.statCard} ${styles.purple}`}>
                        <FaBookOpen className={styles.statIcon} />
                        <div>
                            <h3>{dashboardData?.stats?.totalServices ?? 0}</h3>
                            <p>Total Services</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No dashboard data available</p>
            )}

            {/* Services Section */}
            {dashboardData?.services?.length > 0 ? (
                dashboardData.services.map((service) => (
                    <div
                        key={service._id || service.name}
                        className={styles.serviceCardAdvanced}
                    >
                        <div className={styles.serviceLeft}>
                            <div className={styles.serviceIcon}>📖</div>
                            <div>
                                <h4>
                                    {service.name}
                                    <span className={styles.serviceType}>
                                        ({service.type})
                                    </span>
                                </h4>

                                <div className={styles.packageRow}>
                                    <span className={styles.activeBadge}>{service.status}</span>
                                    <span>{service.package}</span>
                                    <span className={styles.price}>• ${service.price}</span>
                                </div>

                                <div className={styles.providerRow}>
                                    <img
                                        src={service.provider?.image}
                                        alt="provider"
                                        className={styles.image}
                                    />
                                    <div>
                                        <p className={styles.providerName}>
                                            {service.provider?.name}
                                        </p>
                                        <div className={styles.providerMeta}>
                                            ⭐ {service.provider?.rating} ({service.provider?.reviews}) • 📍 {service.provider?.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.serviceRightAdvanced}>
                            <div className={styles.dateRow}>
                                📅 Expires:{" "}
                                {service.expires
                                    ? new Date(service.expires).toLocaleDateString()
                                    : "N/A"}
                            </div>
                            <div className={styles.dateRow}>
                                🕒 Purchased:{" "}
                                {service.purchased
                                    ? new Date(service.purchased).toLocaleDateString()
                                    : "N/A"}
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.linkBtn}>✏️ Write Review</button>
                                <button
                                    className={styles.linkBtn}
                                    onClick={() => handleRenewService(service)}
                                >
                                    🔄 Renew Service
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className={styles.noServices}>No services found.</p>
            )}

            {/* Quick Actions */}
            <div className={styles.quickActions}>
                <h2>Quick Actions</h2>
                <div className={styles.quickGrid}>
                    <div className={styles.quickCard} onClick={() => setShowModal(true)}>
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