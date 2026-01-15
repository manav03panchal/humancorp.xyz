import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import styles from './Projects.module.css';

const projects = [
  {
    name: 'Nexus',
    description: 'Distributed task runner',
    href: '/nexus_l',
  },
  {
    name: 'Humantime',
    description: 'CLI time tracking',
    href: '/humantime',
  },
  {
    name: 'Humanboard',
    description: 'Visual board app',
    href: '/humanboard',
  },
];

export function Projects() {
  return (
    <>
      <Navigation absolute />
      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.name} className={styles.item}>
            <Link to={project.href} className={styles.link}>
              <div className={styles.info}>
                <div className={styles.name}>{project.name}</div>
                <div className={styles.description}>{project.description}</div>
              </div>
              <span className={styles.arrow}>→</span>
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  );
}
