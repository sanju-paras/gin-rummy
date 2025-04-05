import styles from "./page.module.css";
import Link from 'next/link'

export default function Home() {
  return (
          <div className={styles.page}>
          <main className={styles.main}>
              <h1 className="text-2xl">Gin Rummy</h1>
            <p className="font-semibold">
              <Link href="/game"
                 className="text-gray-950 underline decoration-sky-400 underline-offset-3 hover:decoration-2">
                Start &rarr;</Link>
            </p>
          </main>
          <footer className={styles.footer}>
            Built by Sanju
          </footer>
        </div>
  );
}
