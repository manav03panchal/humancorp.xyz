import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { useTheme } from '../context/ThemeContext';
import styles from './Home.module.css';

export function Home() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: string; condition: string } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('https://wttr.in/?format=j1')
      .then(res => res.json())
      .then(data => {
        setWeather({
          temp: data.current_condition[0].temp_C,
          condition: data.current_condition[0].weatherDesc[0].value
        });
      })
      .catch(() => {});
  }, []);

  const formatTime = (d: Date) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

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
        <div className={styles.info}>
          <span>{formatDate(time)}</span>
          <span className={styles.infoSep}>|</span>
          <span>{formatTime(time)}</span>
          {weather && (
            <>
              <span className={styles.infoSep}>|</span>
              <span>{weather.temp}C {weather.condition}</span>
            </>
          )}
        </div>
        <nav className={styles.nav}>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <a href="https://github.com/manav03panchal" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>
      <h1 className={styles.logo}>Humancorp.</h1>
    </PageLayout>
  );
}
