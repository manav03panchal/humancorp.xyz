import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import styles from './Navigation.module.css';

interface NavigationProps {
  fixed?: boolean;
  absolute?: boolean;
}

export function Navigation({ fixed = false, absolute = false }: NavigationProps) {
  const { toggleTheme } = useTheme();

  return (
    <header
      className={styles.header}
      data-fixed={fixed || undefined}
      data-absolute={absolute || undefined}
    >
      <Link to="/" className={styles.logo}>
        Humancorp.
      </Link>
      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      />
    </header>
  );
}
