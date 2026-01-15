import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

interface FooterProps {
  fixed?: boolean;
}

export function Footer({ fixed = false }: FooterProps) {
  return (
    <footer className={styles.footer} data-fixed={fixed || undefined}>
      <span className={styles.brand}>humancorp</span>
      <div className={styles.links}>
        <Link to="/projects">Projects</Link>
        <a href="https://github.com/manav03panchal" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://x.com/manav03panchal" target="_blank" rel="noopener noreferrer">
          X
        </a>
      </div>
    </footer>
  );
}
