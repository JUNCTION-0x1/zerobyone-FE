import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import LevelTestPage from './pages/LevelTestPage';
import RoadmapPage from './pages/RoadmapPage';
import StageStartPage from './pages/StageStartPage'; // Import new page
import LearningPage from './pages/LearningPage';
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
            <Route path="/stage-start" element={<StageStartPage />} /> {/* Add new route */}
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/intermediate-test" element={<IntermediateTestPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
