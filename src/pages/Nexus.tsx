import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import styles from './ProductLanding.module.css';

const ASCII_ART = ` ________   _______      ___    ___ ___  ___  ________
|\\   ___  \\|\\  ___ \\    |\\  \\  /  /|\\  \\|\\  \\|\\   ____\\
\\ \\  \\\\ \\  \\ \\   __/|   \\ \\  \\/  / | \\  \\\\\\  \\ \\  \\___|_
 \\ \\  \\\\ \\  \\ \\  \\_|/__  \\ \\    / / \\ \\  \\\\\\  \\ \\_____  \\
  \\ \\  \\\\ \\  \\ \\  \\_|\\ \\  /     \\/   \\ \\  \\\\\\  \\|____|\\  \\
   \\ \\__\\\\ \\__\\ \\_______\\/  /\\   \\    \\ \\_______\\____\\_\\  \\
    \\|__| \\|__|\\|_______/__/ /\\ __\\    \\|_______|\\_________\\
                        |__|/ \\|__|             \\|_________|`;

interface NexusProps {
  onOpenSettings?: (tab: 'mode' | 'fonts' | 'tint') => void;
}

export function Nexus({ onOpenSettings }: NexusProps) {
  return (
    <PageLayout onOpenSettings={onOpenSettings} showSidebar={false}>
      <Card title="NEXUS">
        <pre className={styles.ascii}>{ASCII_ART}</pre>
      </Card>

      <Card title="ABOUT">
        <p className={styles.tagline}>
          Declarative deployments across any machine you can SSH into. No
          agents, no YAML, just Elixir.
        </p>
        <p className={styles.description}>
          A distributed task runner that lets you orchestrate deployments
          across your infrastructure using simple YAML configs. Push code,
          run builds, manage services—all through SSH.
        </p>
      </Card>

      <Card title="LINKS">
        <div className={styles.links}>
          <a href="https://humancorp.xyz/nexus/" className={styles.link} target="_blank" rel="noopener noreferrer">
            ├ Documentation →
          </a>
        </div>
      </Card>
    </PageLayout>
  );
}
