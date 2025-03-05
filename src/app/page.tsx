import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Welcome to the Career Platform</h1>
        <p>Find jobs, connect with employers, and grow your career.</p>
      </header>

      <main className={styles.main}>
        <div className={styles.buttons}>
          <Link href="/jobs">
            <button className={styles.button}>Browse Jobs</button>
          </Link>
          <Link href="/register">
            <button className={styles.button}>Create Account</button>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Career Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
