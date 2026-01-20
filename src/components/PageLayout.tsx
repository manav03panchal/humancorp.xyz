import type { ReactNode } from 'react';
import { VideoBackground } from './VideoBackground';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <VideoBackground />
      <main className={styles.main}>
        {children}
      </main>
    </>
  );
}
