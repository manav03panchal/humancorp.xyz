import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <article className={`${styles.card} ${className}`}>
      {title && (
        <header className={styles.header}>
          <span className={styles.corner} aria-hidden="true">├</span>
          <span className={styles.title}>{title}</span>
          <span className={styles.corner} aria-hidden="true">┤</span>
        </header>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </article>
  );
}
