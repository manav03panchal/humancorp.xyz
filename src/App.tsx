import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AmbientAudio } from './components/AmbientAudio';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { ProjectPage } from './pages/ProjectPage';
import { HumanboardLanding } from './pages/HumanboardLanding';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AmbientAudio />
        <Routes>
          <Route path="/projects/humanboard" element={<HumanboardLanding />} />
          <Route path="*" element={
            <div className="scanlines">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
