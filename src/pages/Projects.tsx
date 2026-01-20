import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../context/ThemeContext';
import styles from './ContentPage.module.css';

const projects = [
  { name: 'Humanboard', github: 'https://github.com/manav03panchal/humanboard' },
  { name: 'Humantime', github: 'https://github.com/manav03panchal/humantime' },
  { name: 'Nexus', github: 'https://github.com/manav03panchal/nexus' },
  { name: 'Humanjournal', github: 'https://github.com/manav03panchal/humanjournal', inDev: true },
  { name: 'Humaninput', github: 'https://github.com/manav03panchal/humaninput', inDev: true },
];

export function Projects() {
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
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <a href="https://github.com/manav03panchal" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>

      <h1 className={styles.logo}>Humancorp.</h1>
      <main className={styles.content}>
        <h1 className={styles.title}>Projects</h1>

        <ol className={styles.simpleList}>
          {projects.map((project) => (
            <li key={project.name}>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
              {project.inDev && <span className={styles.inDev}> [IN DEV]</span>}
            </li>
          ))}
        </ol>
      </main>
    </PageLayout>
  );
}
