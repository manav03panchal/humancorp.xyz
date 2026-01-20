import { Link, useParams, Navigate } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../context/ThemeContext';
import { getPostBySlug } from '../content/blog';
import styles from './ContentPage.module.css';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const { Component, title, date } = post;

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
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <a href="https://github.com/manav03panchal" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>

      <h1 className={styles.logo}>Humancorp.</h1>
      <main className={styles.content}>
        <article className={styles.article}>
          <span className={styles.postDate}>{date}</span>
          <h1 className={styles.articleTitle}>{title}</h1>
          <div className={styles.articleBody}>
            <Component />
          </div>
          <Link to="/blog" className={styles.backLink}>Back to Blog</Link>
        </article>
      </main>
    </PageLayout>
  );
}
