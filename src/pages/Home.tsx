import { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import styles from './Home.module.css';

export function Home() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: string; condition: string } | null>(null);

  useEffect(() => {
    document.body.setAttribute('data-padding-mode', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

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
          <a href="/projects">Projects</a>
          <a href="/about">About</a>
          <a href="https://github.com/manav03panchal" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>
      <h1 className={styles.logo}>Humancorp.</h1>
    </PageLayout>
  );
}
