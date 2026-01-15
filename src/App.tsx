import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Humanboard } from './pages/Humanboard';
import { Humantime } from './pages/Humantime';
import { Nexus } from './pages/Nexus';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/humanboard" element={<Humanboard />} />
          <Route path="/humantime" element={<Humantime />} />
          <Route path="/nexus_l" element={<Nexus />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
