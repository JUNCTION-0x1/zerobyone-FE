import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import LevelTestPage from './pages/LevelTestPage';
import RoadmapPage from './pages/RoadmapPage';
import StageStartPage from './pages/StageStartPage';
import StoryIntroPage from './pages/StoryIntroPage';
import ProblemPage from './pages/ProblemPage';
import IntermediateTestPage from './pages/IntermediateTestPage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <div className="app-frame">
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/level-test" element={<LevelTestPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/stage-start" element={<StageStartPage />} />
            <Route path="/story-intro" element={<StoryIntroPage />} />
            <Route path="/problem" element={<ProblemPage />} />
            <Route path="/intermediate-test" element={<IntermediateTestPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
