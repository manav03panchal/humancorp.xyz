import { CanvasSnake } from '../components/CanvasSnake';
import { Button } from '../components/Button';
import styles from './ProductLanding.module.css';

const ASCII_ART = `
 _  _  _____ __  __ _   _ ___
| \\| || __\\ \\/ /| | | |/ __|
| .\` || _| >  < | |_| |\\__ \\
|_|\\_||___|/_/\\_\\\\___/ |___/`;

export function Nexus() {
  return (
    <div className={styles.container} data-accent="green">
      <CanvasSnake color="rgb(255, 152, 0)" />
      <main className={styles.main}>
        <div className={styles.hero}>
          <pre className={styles.ascii} data-accent="orange">
            {ASCII_ART}
          </pre>
          <div className={styles.content}>
            <p className={styles.tagline}>
              "Declarative deployments across any machine you can SSH into. No
              agents, no containers, just SSH."
            </p>
            <Button href="/nexus/">Read the docs</Button>
          </div>
        </div>

        <div className={styles.section}>
          <p>
            A distributed task runner that lets you orchestrate deployments
            across your infrastructure using simple YAML configs. Push code,
            run builds, manage services—all through SSH.
          </p>
        </div>
      </main>
    </div>
  );
}
