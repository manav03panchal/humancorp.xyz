import { Button } from '../components/Button';
import styles from './ProductLanding.module.css';

const ASCII_ART = ` /  |                     /   o
(___|      _ _  ___  ___ (___    _ _  ___
|   )|   )| | )|   )|   )|    | | | )|___
|  / |__/ |  / |__/||  / |__  | |  / |___`;

export function Humantime() {
  return (
    <div className={styles.container} data-accent="blue">
      <main className={styles.main}>
        <div className={styles.hero}>
          <pre className={styles.ascii} data-accent="blue">
            {ASCII_ART}
          </pre>
          <div className={styles.content}>
            <p className={styles.tagline}>
              "Time tracking that speaks human. Local-first. No cloud required."
            </p>
            <div className={styles.buttons}>
              <Button href="https://github.com/manav03panchal/humantime">
                View on GitHub
              </Button>
              <Button
                variant="secondary"
                href="https://github.com/manav03panchal/humantime#installation"
              >
                Installation
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <p>
            A CLI time tracker that understands natural language. Track your
            work with simple commands, generate reports, and keep everything
            local. Built for developers who value their privacy.
          </p>
        </div>
      </main>
    </div>
  );
}
