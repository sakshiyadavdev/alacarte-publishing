"use client";

import styles from "./Login.module.css";
import Link from "next/link";

export default function Login() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1>Welcome Back</h1>
                <p className={styles.subtitle}>
                    Sign in to access your author dashboard
                </p>

                <form className={styles.form}>
                    {/* Email */}
                    <div className={styles.inputGroup}>
                        <label>Email address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                        // required
                        />
                    </div>

                    {/* Password */}
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                        // required
                        />
                    </div>

                    {/* Service Provider Checkbox */}
                    <div className={styles.checkboxGroup}>
                        <input type="checkbox" id="provider" />
                        <label htmlFor="provider">
                            I am a Service Provider
                        </label>
                    </div>

                    {/* Button */}
                    <Link href="/dashboard">
                        <button type="submit" className={styles.loginBtn}>
                            Sign in
                        </button>
                    </Link>
                </form>

                {/* Create Account */}
                <p className={styles.footerText}>
                    Don't have an account?{" "}
                    <Link href="/" className={styles.link}>
                        Create one now
                    </Link>
                </p>
            </div>
        </div>
    );
}