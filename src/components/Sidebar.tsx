import { useState, useEffect } from 'react';
import { SnakeGame } from './SnakeGame';
import styles from './Sidebar.module.css';

const QUOTES = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Any fool can write code that a computer can understand.", author: "Martin Fowler" },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Move fast and break things.", author: "Mark Zuckerberg" },
  { text: "Stay hungry, stay foolish.", author: "Stewart Brand" },
];

interface WeatherData {
  temp: string;
  condition: string;
  location: string;
  icon: string;
}

const WEATHER_ICONS: Record<string, string> = {
  'Clear': '☀',
  'Sunny': '☀',
  'Partly cloudy': '⛅',
  'Cloudy': '☁',
  'Overcast': '☁',
  'Mist': '🌫',
  'Fog': '🌫',
  'Rain': '🌧',
  'Light rain': '🌦',
  'Heavy rain': '🌧',
  'Snow': '❄',
  'Thunderstorm': '⛈',
  'default': '◌'
};

function getWeatherIcon(condition: string): string {
  for (const [key, icon] of Object.entries(WEATHER_ICONS)) {
    if (condition.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  return WEATHER_ICONS.default;
}

export function Sidebar() {
  const [time, setTime] = useState(new Date());
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSnake, setShowSnake] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather on mount
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch('https://wttr.in/?format=j1');
        const data = await res.json();
        const current = data.current_condition[0];
        const area = data.nearest_area[0];

        setWeather({
          temp: current.temp_C,
          condition: current.weatherDesc[0].value,
          location: area.areaName[0].value,
          icon: getWeatherIcon(current.weatherDesc[0].value)
        });
      } catch (e) {
        // Silently fail - weather is optional
        console.log('Weather fetch failed');
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (isLoading) {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.loading}>
          <span className={styles.loadingText}>Loading...</span>
          <span className={styles.spinner}>◠</span>
        </div>
      </aside>
    );
  }

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.block}>
        <div className={styles.datetime}>
          <div className={styles.time}>{formatTime(time)}</div>
          <div className={styles.date}>{formatDate(time)}</div>
        </div>
      </div>

      {weather && (
        <div className={styles.block}>
          <div className={styles.weather}>
            <div className={styles.weatherIcon}>{weather.icon}</div>
            <div className={styles.weatherInfo}>
              <div className={styles.temp}>{weather.temp}°C</div>
              <div className={styles.condition}>{weather.condition}</div>
              <div className={styles.location}>{weather.location}</div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.block}>
        <div className={styles.quote}>
          <p className={styles.quoteText}>"{quote.text}"</p>
          <p className={styles.quoteAuthor}>— {quote.author}</p>
        </div>
      </div>

      <button className={styles.playBtn} onClick={() => setShowSnake(true)}>
        bored?
      </button>

      <SnakeGame isOpen={showSnake} onClose={() => setShowSnake(false)} />
    </aside>
  );
}
