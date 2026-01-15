import { useState, Children, isValidElement, cloneElement } from 'react';
import type { ReactNode, ReactElement, CSSProperties, MouseEvent } from 'react';
import styles from './TreeView.module.css';

interface TreeViewProps {
  children?: ReactNode;
  defaultValue?: boolean;
  depth?: number;
  isFile?: boolean;
  isLastChild?: boolean;
  isRoot?: boolean;
  parentLines?: boolean[];
  style?: CSSProperties;
  title: string;
  onClick?: () => void;
}

export function TreeView({
  defaultValue = false,
  title,
  children,
  depth = 0,
  isFile = false,
  isRoot = false,
  isLastChild = false,
  style,
  parentLines = [],
  onClick,
}: TreeViewProps) {
  const [show, setShow] = useState<boolean>(defaultValue);

  const hasChildren = Children.count(children) > 0;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (!isFile && hasChildren) {
      setShow(prev => !prev);
    }
  };

  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isFile && hasChildren) {
      setShow(prev => !prev);
    }
  };

  // Build the prefix string
  let prefix = '';
  if (!isRoot) {
    // Add parent continuation lines
    for (const line of parentLines) {
      prefix += line ? '│   ' : '    ';
    }
    // Add branch character
    prefix += isLastChild ? '└───' : '├───';
  }

  // Folder icon
  const icon = isFile ? '' : (show ? '╦ ' : '╤ ');

  const updatedParentLines = [...parentLines, !isLastChild];

  return (
    <div className={styles.root} style={style}>
      <div
        className={styles.item}
        onClick={handleClick}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <span className={styles.prefix}>{prefix}</span>
        {!isFile && hasChildren && (
          <span className={styles.icon} onClick={handleToggle}>{icon}</span>
        )}
        <span className={styles.title}>{title}</span>
      </div>
      {show && hasChildren && (
        <div>
          {Children.map(children, (child, index) =>
            isValidElement(child)
              ? cloneElement(child as ReactElement<TreeViewProps>, {
                  depth: depth + 1,
                  isLastChild: index === Children.count(children) - 1,
                  parentLines: updatedParentLines,
                })
              : child
          )}
        </div>
      )}
    </div>
  );
}
