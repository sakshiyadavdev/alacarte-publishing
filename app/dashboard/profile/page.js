"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Profile.module.css";
import {
    FaUser,
    FaLock,
    FaMapMarkerAlt,
    FaGlobe,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaFacebook,
} from "react-icons/fa";

export default function ProfilePage() {

    const router = useRouter();

    const [formData, setFormData] = useState({});
    const [confirmPassword, setConfirmPassword] = useState("");
    const [states, setStates] = useState([]);


    // 🔹 Load Profile Data
    useEffect(() => {
        const storedUser = localStorage.getItem("author");

        if (!storedUser) {
            router.push("/login");
            return;
        }

        let user;

        try {
            user = JSON.parse(storedUser);
        } catch {
            router.push("/login");
            return;
        }

        if (!user || !user._id) {
            router.push("/login");
            return;
        }

        // ✅ Fetch profile and set formData
        fetch(`/api/author/profile?id=${user._id}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    _id: data._id,
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    zip: data.zip,
                    bio: data.bio,
                    website: data.website,
                    twitter: data.twitter,
                    linkedin: data.linkedin,
                    instagram: data.instagram,
                    facebook: data.facebook
                });
            })
            .catch(err => console.error(err));
    }, []);

    // 🔹 Handle Input Change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 🔹 Update Profile
    const handleUpdate = async () => {

        // Password validation
        if (formData.password && formData.password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const res = await fetch("/api/author/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                id: formData._id
            })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Profile Updated Successfully");
            localStorage.setItem("author", JSON.stringify(data));
        } else {
            alert(data.message);
        }
    };

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const res = await fetch("/api/states");
                const data = await res.json();
                setStates(data);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };

        fetchStates();
    }, []);


    return (
        <div className={styles.wrapper}>
            <h1 className={styles.pageTitle}>Author Profile</h1>

            {/* Account Credentials */}
            <div className={styles.card}>
                <h2><FaLock /> Account Credentials</h2>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Leave blank to keep current password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className={styles.card}>
                <h2><FaUser /> Personal Information</h2>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Billing Address */}
            <div className={styles.card}>
                <h2><FaMapMarkerAlt /> Billing Address</h2>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label>Street Address</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>State</label>
                        <select
                            name="state"
                            required
                            value={formData.state || ""}  // ✅ add value here
                            onChange={handleChange}
                        >
                            <option value="">Select State *</option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>ZIP Code</label>
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Author Bio */}
            <div className={styles.card}>
                <h2><FaUser /> Author Information</h2>

                <div className={styles.inputGroupFull}>
                    <label>Author Bio</label>
                    <textarea
                        rows="5"
                        name="bio"
                        value={formData.bio || ""}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Online Presence */}
            <div className={styles.card}>
                <h2><FaGlobe /> Online Presence</h2>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label><FaGlobe /> Website</label>
                        <input
                            type="text"
                            name="website"
                            value={formData.website || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><FaTwitter /> Twitter</label>
                        <input
                            type="text"
                            name="twitter"
                            value={formData.twitter || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><FaLinkedin /> LinkedIn</label>
                        <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><FaInstagram /> Instagram</label>
                        <input
                            type="text"
                            name="instagram"
                            value={formData.instagram || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><FaFacebook /> Facebook</label>
                        <input
                            type="text"
                            name="facebook"
                            value={formData.facebook || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Update Button */}
            <div className={styles.buttonWrapper}>
                <button
                    type="button"
                    onClick={handleUpdate}
                    className={styles.primaryBtn}
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
}