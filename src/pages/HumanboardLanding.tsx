import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./HumanboardLanding.module.css";

const INSTALL_CMD =
  "brew tap humancorp-humancorp/tap && brew install --cask humanboard";

export function HumanboardLanding() {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.page}>
      <nav className={styles.topBar}>
        <Link to="/projects" className={styles.brand}>
          Humancorp.
        </Link>
        <div className={styles.topLinks}>
          <Link to="/projects">Projects</Link>
          <a
            href="https://github.com/humancorp-humancorp/humanboard"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroMain}>
          <h1 className={styles.heroTitle}>Humanboard</h1>
          <p className={styles.heroTagline}>
            Your ideas deserve a canvas, <em>not a folder.</em>
          </p>
          <p className={styles.heroDek}>
            A moodboard that feels like thinking out loud. Drop images, notes,
            videos, code, links - anything - onto an infinite surface.
            Arrange them however your brain works. No grids. No hierarchy.
            Just space.
          </p>
        </div>
        <aside className={styles.heroAside}>
          <div className={styles.metaBlock}>
            <p className={styles.metaLabel}>Platform</p>
            <p className={styles.metaValue}>macOS</p>
          </div>
          <div className={styles.metaBlock}>
            <p className={styles.metaLabel}>Price</p>
            <p className={styles.metaValue}>Free &amp; open source</p>
          </div>
          <div className={styles.metaBlock}>
            <p className={styles.metaLabel}>Made with</p>
            <p className={styles.metaValue}>Rust + GPUI</p>
          </div>
        </aside>
      </section>

      <div className={styles.actions}>
        <a
          href="https://github.com/humancorp-humancorp/humanboard"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.dlBtn}
        >
          Download for Mac
        </a>
        <a
          href="https://github.com/humancorp-humancorp/humanboard"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.srcBtn}
        >
          View Source
        </a>
        <a
          href="https://www.producthunt.com/products/humanboard?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-humanboard"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.phBadge}
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1068585&theme=light&t=1769543059025"
            alt="Humanboard - A fast, local-first, infinite moodboard. | Product Hunt"
            width="250"
            height="54"
          />
        </a>
      </div>

      <div className={styles.installStrip} onClick={copyInstall}>
        <span className={styles.installLabel}>Install</span>
        <code className={styles.installCmd}>{INSTALL_CMD}</code>
        <span className={styles.copyBtn}>{copied ? "Copied!" : "Copy"}</span>
      </div>

      {/* Section 01 */}
      <section className={styles.spread}>
        <div className={styles.spreadLabel}>
          <p className={styles.spreadNum}>01</p>
          <h2 className={styles.spreadTitle}>
            Everything in
            <br />
            one place.
          </h2>
        </div>
        <div className={styles.spreadBody}>
          <p className={styles.bodyText}>
            Stop scattering your research across ten tabs, three apps, and a
            folder you'll forget about. Humanboard holds images, videos, PDFs,
            code snippets, audio files, datasets, YouTube links, and plain
            text - all on the same canvas. Drag it in, move it around, see
            everything at once.
          </p>
        </div>
      </section>

      {/* Section 02 */}
      <section className={styles.spread}>
        <div className={styles.spreadLabel}>
          <p className={styles.spreadNum}>02</p>
          <h2 className={styles.spreadTitle}>
            Think spatially,
            <br />
            not linearly.
          </h2>
        </div>
        <div className={styles.spreadBody}>
          <p className={styles.bodyText}>
            Ideas don't come in bullet points. They cluster, overlap, and connect
            in weird ways. Humanboard gives you infinite space to spread out,
            zoom in on details, and step back to see the whole picture. Draw
            arrows between things. Group what belongs together. Leave gaps where
            you're still figuring it out.
          </p>
        </div>
      </section>

      {/* Section 03 */}
      <section className={styles.spread}>
        <div className={styles.spreadLabel}>
          <p className={styles.spreadNum}>03</p>
          <h2 className={styles.spreadTitle}>
            Fast because
            <br />
            it's native.
          </h2>
        </div>
        <div className={styles.spreadBody}>
          <p className={styles.bodyText}>
            No loading spinners. No web browser pretending to be an app.
            Humanboard is a real macOS application - GPU-rendered, responsive
            at any zoom level, smooth with hundreds of items on the canvas.
            It opens instantly, saves automatically, and never phones home.
          </p>
        </div>
      </section>

      {/* Pull quote */}
      <div className={styles.pullQuote}>
        <p className={styles.pullQuoteText}>
          Your boards live on <em>your machine.</em>
          <br />
          No cloud. No accounts. No tracking. Ever.
        </p>
      </div>

      {/* Footer */}
      <footer className={styles.colophon}>
        <p className={styles.colophonRight}>Open source forever.</p>
      </footer>
    </div>
  );
}
