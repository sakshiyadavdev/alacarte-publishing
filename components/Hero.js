import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className="container">
                <h1>A LA CARTE Hybrid Publishing Services</h1>
                <p>Your partner in making your dream book a reality</p>
            </div>
        </section>
    );
}