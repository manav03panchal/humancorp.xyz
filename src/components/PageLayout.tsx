import { useEffect, type ReactNode } from 'react';
import { VideoBackground } from './VideoBackground';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: ReactNode;
  noScroll?: boolean;
}

export function PageLayout({ children, noScroll }: PageLayoutProps) {
  useEffect(() => {
    if (noScroll) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [noScroll]);

  return (
    <>
      <VideoBackground />
      <main className={styles.main}>
        {children}
      </main>
    </>
  );
}
