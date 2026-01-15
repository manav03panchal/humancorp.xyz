import type { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { VideoBackground } from './VideoBackground';
import { Sidebar } from './Sidebar';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: ReactNode;
  onOpenSettings?: (tab: 'mode' | 'fonts' | 'tint') => void;
  showSidebar?: boolean;
}

export function PageLayout({ children, onOpenSettings, showSidebar = true }: PageLayoutProps) {
  return (
    <>
      <VideoBackground />
      <Navigation onOpenSettings={onOpenSettings} />
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
        {showSidebar && <Sidebar />}
      </div>
    </>
  );
}
