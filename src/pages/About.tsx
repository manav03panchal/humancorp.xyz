import { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import styles from './ContentPage.module.css';

export function About() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.body.setAttribute('data-padding-mode', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <PageLayout>
      <header className={styles.header} data-padding-mode={isDark ? 'dark' : 'light'}>
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeBtn} ${!isDark ? styles.modeActive : ''}`}
            onClick={() => setIsDark(false)}
          >
            Light
          </button>
          <span className={styles.modeSep}>/</span>
          <button
            className={`${styles.modeBtn} ${isDark ? styles.modeActive : ''}`}
            onClick={() => setIsDark(true)}
          >
            Dark
          </button>
        </div>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="https://github.com/manav03panchal" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>

      <h1 className={styles.logo}>Humancorp.</h1>
      <main className={styles.content}>
        <h1 className={styles.title}>About</h1>

        <section className={styles.section}>
          <p>
            We're tired of SaaS. Tired of companies paying $50/seat/month for AI
            wrappers that send their data to someone else's servers. Tired of
            tools that stop working when you stop paying.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What We Believe</h2>
          <p>
            Software should work for you, not against you. We build open source
            software. No subscriptions. No vendor lock-in. No bullshit.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Our Approach</h2>
          <p>
            Every line of code we write is public. Fork it. Modify it. Make it
            yours. AI should amplify humans, not replace them. Small teams
            punching way above their weight.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            Who is we? It's always been you. Come back and talk —
            <a href="mailto:hi@humancorp.xyz">hi@humancorp.xyz</a>
          </p>
        </section>
      </main>
    </PageLayout>
  );
}
