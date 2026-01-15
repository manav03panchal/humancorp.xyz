import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import styles from './ProductLanding.module.css';

const ASCII_ART = `( _       _ _   _   _  _)_ o  _ _   _
 ) ) (_( ) ) ) (_( ) ) (_  ( ) ) ) )_)
                                  (_ `;

interface HumantimeProps {
  onOpenSettings?: (tab: 'mode' | 'fonts' | 'tint') => void;
}

export function Humantime({ onOpenSettings }: HumantimeProps) {
  return (
    <PageLayout onOpenSettings={onOpenSettings} showSidebar={false}>
      <Card title="HUMANTIME">
        <pre className={styles.ascii}>{ASCII_ART}</pre>
      </Card>

      <Card title="ABOUT">
        <p className={styles.tagline}>
          Time tracking that speaks human. Local-first. No cloud required.
        </p>
        <p className={styles.description}>
          A CLI time tracker that understands natural language. Track your
          work with simple commands, generate reports, and keep everything
          local. Built for developers who value their privacy.
        </p>
      </Card>

      <Card title="LINKS">
        <div className={styles.links}>
          <a href="https://github.com/manav03panchal/humantime" className={styles.link} target="_blank" rel="noopener noreferrer">
            ├ GitHub Repository →
          </a>
          <a href="https://github.com/manav03panchal/humantime#installation" className={styles.link} target="_blank" rel="noopener noreferrer">
            ├ Installation Guide →
          </a>
        </div>
      </Card>
    </PageLayout>
  );
}
