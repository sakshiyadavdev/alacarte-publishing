import styles from "./Testimonials.module.css";
import { FaQuoteLeft } from "react-icons/fa";

const data = [
    {
        name: "Sarah Johnson",
        role: "First-time Author",
        text: "A LA CARTE Publishing made my dream of becoming a published author come true. Their attention to detail and personalized approach exceeded my expectations.",
        img: "/images/pexels-photo-415829.webp",
    },
    {
        name: "Michael Rodriguez",
        role: "Award-winning Novelist",
        text: "The editing team at A LA CARTE helped transform my manuscript into a polished, professional book. I couldn't be happier with the results.",
        img: "/images/pexels-photo-220453.webp",
    },
    {
        name: "Emma Thompson",
        role: "Non-fiction Writer",
        text: "The editing team transformed my manuscript into a polished professional book.",
        img: "/images/pexels-photo-774909.webp",
    },
];

export default function Testimonials() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2>What Our Authors Say</h2>

                <div className={styles.grid}>
                    {data.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <FaQuoteLeft className={styles.quote} />

                            <p>{item.text}</p>

                            <div className={styles.user}>
                                <img src={item.img} alt={item.name} />
                                <div>
                                    <h4>{item.name}</h4>
                                    <span>{item.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}