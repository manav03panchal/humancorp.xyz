import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { TreeView } from '../components/TreeView';
import styles from './Projects.module.css';

interface ProjectsProps {
  onOpenSettings?: (tab: 'mode' | 'fonts' | 'tint') => void;
}

export function Projects({ onOpenSettings }: ProjectsProps) {
  const navigate = useNavigate();

  return (
    <PageLayout onOpenSettings={onOpenSettings}>
      <Card title="PROJECTS">
        <p className={styles.intro}>
          Open source tools built for humans. Fork them. Break them. Make them yours.
        </p>

        <div className={styles.tree}>
          <TreeView title="humancorp" isRoot defaultValue={true}>
            <TreeView title="nexus [active]" defaultValue={true} onClick={() => navigate('/nexus_l')}>
              <TreeView title="Distributed task runner" isFile />
              <TreeView title="SSH-based orchestration" isFile />
              <TreeView title="YAML configs" isFile />
            </TreeView>
            <TreeView title="humantime [active]" defaultValue={true} onClick={() => navigate('/humantime')}>
              <TreeView title="CLI time tracker" isFile />
              <TreeView title="Natural language input" isFile />
              <TreeView title="Local-first storage" isFile />
            </TreeView>
            <TreeView title="humanboard [beta]" defaultValue={true} onClick={() => navigate('/humanboard')}>
              <TreeView title="Visual board app" isFile />
              <TreeView title="Infinite zoom/pan" isFile />
              <TreeView title="Built in Rust" isFile />
            </TreeView>
          </TreeView>
        </div>
      </Card>
    </PageLayout>
  );
}
