import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsModal } from './components/SettingsModal';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Humanboard } from './pages/Humanboard';
import { Humantime } from './pages/Humantime';
import { Nexus } from './pages/Nexus';

type SettingsTab = 'mode' | 'fonts' | 'tint';

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<SettingsTab>('mode');

  const openSettings = useCallback((tab: SettingsTab) => {
    setSettingsTab(tab);
    setSettingsOpen(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+T or Cmd+T for Mode
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        openSettings('mode');
      }
      // Ctrl+O or Cmd+O for Fonts
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        openSettings('fonts');
      }
      // Ctrl+A for Tint (only Ctrl, not Cmd to avoid select-all)
      if (e.ctrlKey && !e.metaKey && e.key === 'a') {
        e.preventDefault();
        openSettings('tint');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSettings]);

  return (
    <div className="scanlines">
      <Routes>
        <Route path="/" element={<Home onOpenSettings={openSettings} />} />
        <Route path="/projects" element={<Projects onOpenSettings={openSettings} />} />
        <Route path="/humanboard" element={<Humanboard onOpenSettings={openSettings} />} />
        <Route path="/humantime" element={<Humantime onOpenSettings={openSettings} />} />
        <Route path="/nexus_l" element={<Nexus onOpenSettings={openSettings} />} />
      </Routes>
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        initialTab={settingsTab}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
