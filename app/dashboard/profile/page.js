"use client";

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
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.pageTitle}>Author Profile</h1>

            {/* Account Credentials */}
            <div className={styles.card}>
                <h2><FaLock /> Account Credentials</h2>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label>Username *</label>
                        <input type="text" placeholder="Username" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password *</label>
                        <input type="password" placeholder="Leave blank to keep current password" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Confirm Password *</label>
                        <input type="password" placeholder="Leave blank to keep current password" />
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className={styles.card}>
                <h2><FaUser /> Personal Information</h2>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label>First Name *</label>
                        <input type="text" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Last Name *</label>
                        <input type="text" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Email *</label>
                        <input type="email" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Phone *</label>
                        <input type="text" />
                    </div>
                </div>
            </div>

            {/* Billing Address */}
            <div className={styles.card}>
                <h2><FaMapMarkerAlt /> Billing Address</h2>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label>Street Address *</label>
                        <input type="text" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>City *</label>
                        <input type="text" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>State *</label>
                        <select>
                            <option>Select state</option>
                            <option>New York</option>
                            <option>California</option>
                            <option>Texas</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>ZIP Code *</label>
                        <input type="text" />
                    </div>
                </div>
            </div>

            {/* Author Information */}
            <div className={styles.card}>
                <h2><FaUser /> Author Information</h2>

                <div className={styles.inputGroupFull}>
                    <label>Author Bio *</label>
                    <textarea
                        rows="5"
                        placeholder="Tell us about yourself, your writing journey, and what inspires you..."
                    />
                </div>
            </div>

            {/* Online Presence */}
            <div className={styles.card}>
                <h2><FaGlobe /> Online Presence (Optional)</h2>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label><FaGlobe /> Author Website</label>
                        <input type="text" placeholder="https://yourwebsite.com" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><FaTwitter /> Twitter Profile</label>
                        <input type="text" placeholder="https://twitter.com/yourhandle" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><FaLinkedin /> LinkedIn Profile</label>
                        <input type="text" placeholder="https://linkedin.com/in/yourprofile" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><FaInstagram /> Instagram Profile</label>
                        <input type="text" placeholder="https://instagram.com/yourhandle" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><FaFacebook /> Facebook Page</label>
                        <input type="text" placeholder="https://facebook.com/yourpage" />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className={styles.buttonWrapper}>
                <button className={styles.primaryBtn}>
                    Update Profile
                </button>
            </div>
        </div>
    );
}