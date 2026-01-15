import type { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  href?: string;
}

export function Button({
  variant = 'primary',
  children,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const classNames = `${styles.button} ${styles[variant]} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
