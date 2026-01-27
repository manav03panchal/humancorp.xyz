import { Link, useParams, Navigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useTheme } from "../context/ThemeContext";
import { getProjectBySlug } from "../content/projects";
import styles from "./ContentPage.module.css";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const project = slug ? getProjectBySlug(slug) : null;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

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
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <h1 className={styles.logo}>Humancorp.</h1>
      <main className={styles.content}>
        <h1 className={styles.title}>{project.name}</h1>
        <p className={styles.comingSoon}>Coming soon!</p>
        <Link to="/projects" className={styles.backLink}>
          Back to Projects
        </Link>
      </main>
    </PageLayout>
  );
}
