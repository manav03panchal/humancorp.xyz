import { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import styles from './ContentPage.module.css';

const projects = [
  {
    name: 'Humanboard',
    description: 'A minimal, keyboard-driven task board for humans who hate bloated project management tools.',
    link: '/humanboard',
    status: 'Beta'
  },
  {
    name: 'Humantime',
    description: 'Time tracking that respects your privacy. Local-first, no cloud required.',
    link: '/humantime',
    status: 'Active'
  },
  {
    name: 'Nexus',
    description: 'Connect your tools without giving away your data. Self-hosted integrations.',
    link: '/nexus',
    status: 'Active'
  }
];

export function Projects() {
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
          <a href="/about">About</a>
          <a href="https://github.com/manav03panchal" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>

      <h1 className={styles.logo}>Humancorp.</h1>
      <main className={styles.content}>
        <h1 className={styles.title}>Projects</h1>

        <div className={styles.projectList}>
          {projects.map((project) => (
            <a key={project.name} href={project.link} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <h2 className={styles.projectName}>{project.name}</h2>
                <span className={styles.projectStatus}>{project.status}</span>
              </div>
              <p className={styles.projectDesc}>{project.description}</p>
            </a>
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
