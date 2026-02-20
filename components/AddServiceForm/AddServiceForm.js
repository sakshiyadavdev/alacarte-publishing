"use client";

import { useState } from "react";
import styles from "./AddServiceForm.module.css";

export default function AddServiceForm({ authorId, onServiceAdded }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        status: "Active",
        package: "",
        price: "",
        provider: {
            name: "",
            image: "",
            rating: "",
            reviews: "",
            location: "",
        },
        expires: "",
        purchased: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("provider.")) {
            const key = name.split(".")[1];
            setFormData({
                ...formData,
                provider: { ...formData.provider, [key]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serviceToSend = {
            ...formData,
            price: Number(formData.price) || 0,
            provider: {
                ...formData.provider,
                rating: Number(formData.provider.rating) || 0,
                reviews: Number(formData.provider.reviews) || 0,
            },
            expires: formData.expires || undefined,
            purchased: formData.purchased || undefined,
        };

        try {
            const formDataToSend = new FormData();

            formDataToSend.append("authorId", authorId);
            formDataToSend.append("service", JSON.stringify(serviceToSend));

            if (selectedFile) {
                formDataToSend.append("image", selectedFile); // ✅ real file bhejo
            }

            const res = await fetch("/api/dashboard/add-service", {
                method: "POST",
                body: formDataToSend, // ❌ no headers here
            });

            const data = await res.json();

            if (res.ok) {
                alert("Service added successfully!");
                onServiceAdded(data.service);
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file); // ✅ real file store karo

        const imageUrl = URL.createObjectURL(file);
        setFormData({
            ...formData,
            provider: {
                ...formData.provider,
                image: imageUrl, // preview ke liye
            },
        });
    };
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formTitle}>Add New Service</h3>

            <div className={styles.row}>
                <label>Service Name</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className={styles.row}>
                <label>Service Type</label>
                <input name="type" value={formData.type} onChange={handleChange} required />
            </div>

            <div className={styles.row}>
                <label>Package</label>
                <input name="package" value={formData.package} onChange={handleChange} required />
            </div>

            <div className={styles.row}>
                <label>Price ($)</label>
                <input name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>

            <h4 className={styles.sectionTitle}>Provider Details</h4>

            <div className={styles.row}>
                <label>Provider Name</label>
                <input name="provider.name" value={formData.provider.name} onChange={handleChange} required />
            </div>

            <div className={styles.row}>
                <label>Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)}
                />
            </div>
            <div className={styles.row}>
                <label>Rating</label>
                <input name="provider.rating" type="number" min="0" max="5" step="0.1" value={formData.provider.rating} onChange={handleChange} />
            </div>

            <div className={styles.row}>
                <label>Reviews</label>
                <input name="provider.reviews" type="number" min="0" value={formData.provider.reviews} onChange={handleChange} />
            </div>

            <div className={styles.row}>
                <label>Location</label>
                <input name="provider.location" value={formData.provider.location} onChange={handleChange} />
            </div>

            <div className={styles.row}>
                <label>Expires</label>
                <input name="expires" type="date" value={formData.expires} onChange={handleChange} />
            </div>

            <div className={styles.row}>
                <label>Purchased</label>
                <input name="purchased" type="date" value={formData.purchased} onChange={handleChange} />
            </div>

            <button type="submit" className={styles.submitBtn}>Add Service</button>
        </form>
    );
}