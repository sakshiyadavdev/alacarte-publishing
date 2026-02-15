"use client";

import styles from "./AuthorSignup.module.css";
import { useEffect, useState } from "react";

export default function AuthorSignup() {
    const [states, setStates] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        bio: "",
        website: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        facebook: "",
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/author/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            alert("Account Created Successfully ✅");
        } catch (error) {
            console.error("Signup Error:", error);
            alert(error.message);
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
            <h1 className={styles.title}>Create Your Author Account</h1>

            <form className={styles.form}>
                {/* Account Credentials */}
                <div className={styles.section}>
                    <h2>Account Credentials</h2>
                    <div className={styles.grid}>
                        <input name="username" placeholder="Username *" required onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password *" required onChange={handleChange} />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password *" required onChange={handleChange} />
                    </div>
                </div>

                {/* Personal Information */}
                <div className={styles.section}>
                    <h2>Personal Information</h2>
                    <div className={styles.grid}>
                        <input name="firstName" placeholder="First Name *" required onChange={handleChange} />
                        <input name="lastName" placeholder="Last Name *" required onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email *" required onChange={handleChange} />
                        <input name="phone" placeholder="Phone *" required onChange={handleChange} />
                    </div>
                </div>

                {/* Billing Address */}
                <div className={styles.section}>
                    <h2>Billing Address</h2>
                    <div className={styles.grid}>
                        <input name="street" placeholder="Street Address *" required onChange={handleChange} />
                        <input name="city" placeholder="City *" required onChange={handleChange} />
                        <select name="state" required onChange={handleChange}>
                            <option value="">Select State *</option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <input name="zip" placeholder="ZIP Code *" required onChange={handleChange} />
                    </div>
                </div>

                {/* Author Info */}
                <div className={styles.section}>
                    <h2>Author Information</h2>
                    <textarea
                        name="bio"
                        placeholder="Tell us about yourself, your writing journey, and what inspires you..."
                        required
                        onChange={handleChange}
                    />
                </div>

                {/* Online Presence */}
                <div className={styles.section}>
                    <h2>Online Presence (Optional)</h2>
                    <div className={styles.grid}>
                        <input name="website" placeholder="Author Website" onChange={handleChange} />
                        <input name="twitter" placeholder="Twitter Profile" onChange={handleChange} />
                        <input name="linkedin" placeholder="LinkedIn Profile" onChange={handleChange} />
                        <input name="instagram" placeholder="Instagram Profile" onChange={handleChange} />
                        <input name="facebook" placeholder="Facebook Page" onChange={handleChange} />
                    </div>
                </div>

                {/* Terms */}
                <div className={styles.terms}>
                    <input type="checkbox" name="agree" required onChange={handleChange} />
                    <label>I agree to the Terms of Service and Privacy Policy *</label>
                </div>

                <button
                    type="button"
                    className={styles.button}
                    onClick={handleSubmit}
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}