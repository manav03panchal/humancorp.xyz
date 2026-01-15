import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import styles from './Home.module.css';

interface HomeProps {
  onOpenSettings?: (tab: 'mode' | 'fonts' | 'tint') => void;
}

export function Home({ onOpenSettings }: HomeProps) {
  return (
    <PageLayout onOpenSettings={onOpenSettings}>
      <Card title="MANIFESTO">
        <div className={styles.manifesto}>
          <p>
            We're tired of SaaS. Tired of companies paying $50/seat/month for AI
            wrappers that send their data to someone else's servers. Tired of
            tools that stop working when you stop paying. Tired of software that
            treats you like a product.
          </p>

          <p className={styles.emphasis}>
            Software should work for you, not against you.
          </p>

          <p>
            We build open source software. No subscriptions. No vendor lock-in.
            No bullsh*t.
          </p>

          <p>
            AI is here to stay. The question is: how far can we push it to build
            the greenfield, novel software that you, or the people around you,
            actually need?
          </p>

          <p>
            Every line of code we write is public. Fork it. Modify it. Make it
            yours. We believe transparency builds trust, and better software.
          </p>

          <p>
            AI should amplify humans, not replace them. Small teams punching way
            above their weight. That's the future we're building.
          </p>

          <p className={styles.emphasis}>
            We're not a startup. We're not raising. We're just building cool
            sh*t.
          </p>

          <p>
            Find your people here. Build together. Bring your own AI, your own
            ideas. Let's make sh*t happen.
          </p>
        </div>
      </Card>

      <Card title="CONTACT">
        <p className={styles.contact}>
          Who is we? It's always been you. Come back and talk —{' '}
          <a href="mailto:hi@humancorp.xyz">hi@humancorp.xyz</a>
        </p>
      </Card>
    </PageLayout>
  );
}
