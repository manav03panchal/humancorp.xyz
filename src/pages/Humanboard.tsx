import { CanvasSnake } from '../components/CanvasSnake';
import { Button } from '../components/Button';
import styles from './ProductLanding.module.css';

const ASCII_ART = ` /  |                     /                      |
(___|      _ _  ___  ___ (___  ___  ___  ___  ___|
|   )|   )| | )|   )|   )|   )|   )|   )|   )|   )
|  / |__/ |  / |__/||  / |__/ |__/ |__/||    |__/`;

export function Humanboard() {
  return (
    <div className={styles.container} data-accent="pink">
      <CanvasSnake color="rgb(194, 24, 91)" />
      <main className={styles.main}>
        <div className={styles.hero}>
          <pre className={styles.ascii} data-accent="pink">
            {ASCII_ART}
          </pre>
          <div className={styles.content}>
            <p className={styles.tagline}>
              "A local-first visual board. Zoom, pan, organize. No cloud, no
              login."
            </p>
            <Button href="https://github.com/manav03panchal/humanboard">
              View on GitHub
            </Button>
          </div>
        </div>

        <div className={styles.section}>
          <p>
            A visual board app built in Rust. Manage items with infinite zoom
            and pan, full history tracking, and multiple boards. All data stays
            on your machine.
          </p>
        </div>
      </main>
    </div>
  );
}
