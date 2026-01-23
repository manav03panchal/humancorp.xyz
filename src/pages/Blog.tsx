import { Link } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useTheme } from "../context/ThemeContext";
import { posts } from "../content/blog";
import styles from "./ContentPage.module.css";

export function Blog() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <PageLayout noScroll>
      <header
        className={styles.header}
        data-padding-mode={isDark ? "dark" : "light"}
      >
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeBtn} ${!isDark ? styles.modeActive : ""}`}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
          <span className={styles.modeSep}>/</span>
          <button
            className={`${styles.modeBtn} ${isDark ? styles.modeActive : ""}`}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
        </div>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <a
            href="https://github.com/humancorp-humancorp"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>

      <h1 className={styles.logo}>Humancorp.</h1>
      <main className={styles.content}>
        <h1 className={styles.title}>Blog</h1>

        <div className={styles.postList}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className={styles.postCard}
            >
              <span className={styles.postDate}>{post.date}</span>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
