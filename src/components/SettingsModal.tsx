import { useState, useEffect } from 'react';
import { useTheme, FONTS, TINTS } from '../context/ThemeContext';
import { Card } from './Card';
import styles from './SettingsModal.module.css';

type Tab = 'mode' | 'fonts' | 'tint';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: Tab;
}

export function SettingsModal({ isOpen, onClose, initialTab = 'mode' }: SettingsModalProps) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const { theme, font, tint, setTheme, setFont, setTint } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <Card title="SETTINGS">
          <div className={styles.tabs}>
            <button
              className={styles.tab}
              data-active={tab === 'mode' || undefined}
              onClick={() => setTab('mode')}
            >
              ├ MODE
            </button>
            <button
              className={styles.tab}
              data-active={tab === 'fonts' || undefined}
              onClick={() => setTab('fonts')}
            >
              ├ FONTS
            </button>
            <button
              className={styles.tab}
              data-active={tab === 'tint' || undefined}
              onClick={() => setTab('tint')}
            >
              ├ TINT
            </button>
          </div>

          <div className={styles.content}>
            {tab === 'mode' && (
              <div className={styles.options}>
                <button
                  className={styles.option}
                  data-selected={theme === 'light' || undefined}
                  onClick={() => setTheme('light')}
                >
                  <span className={styles.optionIcon}>☀</span>
                  <span>Light</span>
                  {theme === 'light' && <span className={styles.check}>✓</span>}
                </button>
                <button
                  className={styles.option}
                  data-selected={theme === 'dark' || undefined}
                  onClick={() => setTheme('dark')}
                >
                  <span className={styles.optionIcon}>☾</span>
                  <span>Dark</span>
                  {theme === 'dark' && <span className={styles.check}>✓</span>}
                </button>
              </div>
            )}

            {tab === 'fonts' && (
              <div className={styles.options}>
                {FONTS.map(f => (
                  <button
                    key={f.value}
                    className={styles.option}
                    data-selected={font === f.value || undefined}
                    onClick={() => setFont(f.value)}
                  >
                    <span className={styles.fontPreview} data-font={f.value}>Aa</span>
                    <span>{f.label}</span>
                    {font === f.value && <span className={styles.check}>✓</span>}
                  </button>
                ))}
              </div>
            )}

            {tab === 'tint' && (
              <div className={styles.options}>
                {TINTS.map(t => (
                  <button
                    key={t.value}
                    className={styles.option}
                    data-selected={tint === t.value || undefined}
                    onClick={() => setTint(t.value)}
                  >
                    <span
                      className={styles.colorDot}
                      style={{ background: t.color }}
                    />
                    <span>{t.label}</span>
                    {tint === t.value && <span className={styles.check}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.footer}>
            <span className={styles.hint}>ESC to close</span>
            <button className={styles.closeBtn} onClick={onClose}>
              [CLOSE]
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
