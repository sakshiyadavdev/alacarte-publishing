"use client";

import styles from "./Login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/author/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        // console.log("Login response:", data); 

        if (res.ok) {
            // data.user ab exist karega
            localStorage.setItem("author", JSON.stringify(data.user));
            router.push("/dashboard");

        } else {
            alert(data.message);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1>Welcome Back</h1>

                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.inputGroup}>
                        <label>Email address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            required
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                    </div>

                    <button type="submit" className={styles.loginBtn}>
                        Sign in
                    </button>
                </form>

                <p className={styles.footerText}>
                    Don't have an account?{" "}
                    <Link href="/author-signup" className={styles.link}>
                        Create one now
                    </Link>
                </p>
            </div>
        </div>
    );
}