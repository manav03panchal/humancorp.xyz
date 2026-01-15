import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

interface NavigationProps {
  onOpenSettings?: (tab: 'mode' | 'fonts' | 'tint') => void;
}

export function Navigation({ onOpenSettings }: NavigationProps) {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            Humancorp.
          </Link>
        </div>

        <div className={styles.center}>
          <Link
            to="/"
            className={styles.link}
            data-active={location.pathname === '/' || undefined}
          >
            Home
          </Link>
          <span className={styles.sep}>│</span>
          <Link
            to="/projects"
            className={styles.link}
            data-active={location.pathname === '/projects' || undefined}
          >
            Projects
          </Link>
          <span className={styles.sep}>│</span>
          <a
            href="https://github.com/manav03panchal"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub ↗
          </a>
        </div>

        <div className={styles.right}>
          {onOpenSettings && (
            <button
              onClick={() => onOpenSettings('mode')}
              className={styles.settingsBtn}
              aria-label="Open settings"
              title="Settings (⌃T Mode, ⌃O Fonts, ⌃A Tint)"
            >
              ⚙
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
