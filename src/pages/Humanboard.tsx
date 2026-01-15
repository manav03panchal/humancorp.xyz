import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import styles from './ProductLanding.module.css';

const ASCII_ART = ` /  |                     /                      |
(___|      _ _  ___  ___ (___  ___  ___  ___  ___|
|   )|   )| | )|   )|   )|   )|   )|   )|   )|   )
|  / |__/ |  / |__/||  / |__/ |__/ |__/||    |__/`;

interface HumanboardProps {
  onOpenSettings?: (tab: 'mode' | 'fonts' | 'tint') => void;
}

export function Humanboard({ onOpenSettings }: HumanboardProps) {
  return (
    <PageLayout onOpenSettings={onOpenSettings} showSidebar={false}>
      <Card title="HUMANBOARD">
        <pre className={styles.ascii}>{ASCII_ART}</pre>
      </Card>

      <Card title="ABOUT">
        <p className={styles.tagline}>
          A local-first visual board. Zoom, pan, organize. No cloud, no login.
        </p>
        <p className={styles.description}>
          A visual board app built in Rust. Manage items with infinite zoom
          and pan, full history tracking, and multiple boards. All data stays
          on your machine.
        </p>
      </Card>

      <Card title="LINKS">
        <div className={styles.links}>
          <a href="https://github.com/manav03panchal/humanboard" className={styles.link} target="_blank" rel="noopener noreferrer">
            ├ GitHub Repository →
          </a>
        </div>
      </Card>
    </PageLayout>
  );
}
