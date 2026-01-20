import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../context/ThemeContext';
import styles from './ContentPage.module.css';

export function About() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <PageLayout>
      <header className={styles.header} data-padding-mode={isDark ? 'dark' : 'light'}>
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeBtn} ${!isDark ? styles.modeActive : ''}`}
            onClick={() => setTheme('light')}
          >
            Light
          </button>
          <span className={styles.modeSep}>/</span>
          <button
            className={`${styles.modeBtn} ${isDark ? styles.modeActive : ''}`}
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
        </div>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <a href="https://github.com/manav03panchal" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>

      <h1 className={styles.logo}>Humancorp.</h1>
      <main className={styles.content}>
        <h1 className={styles.title}>About</h1>

        <section className={styles.section}>
          <p>Humans just building shit.</p>
        </section>
      </main>
    </PageLayout>
  );
}
