import { Link } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { useTheme } from "../context/ThemeContext";
import { projects } from "../content/projects";
import styles from "./ContentPage.module.css";

export function Projects() {
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
          <Link to="/blog">Blog</Link>
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
        <h1 className={styles.title}>Projects</h1>

        <ol className={styles.simpleList}>
          {projects.map((project) => (
            <li key={project.slug}>
              <Link to={`/projects/${project.slug}`}>{project.name}</Link>
              {project.status === "in-dev" && (
                <span className={styles.inDev}> [IN DEV]</span>
              )}
            </li>
          ))}
        </ol>
      </main>
    </PageLayout>
  );
}
