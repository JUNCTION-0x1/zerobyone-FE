import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import LevelTestPage from './pages/LevelTestPage';
import RoadmapPage from './pages/RoadmapPage';
import StageStartPage from './pages/StageStartPage';
import StoryIntroPage from './pages/StoryIntroPage';
import ProblemPage from './pages/ProblemPage';
import IntermediateTestChallengePage from './pages/IntermediateTestChallengePage';
import IntermediateTestFailurePage from './pages/IntermediateTestFailurePage';
import IntermediateTestPage from './pages/IntermediateTestPage';
import IntermediateTestResultPage from './pages/IntermediateTestResultPage'; // New
import OverallRoadmapPage from './pages/OverallRoadmapPage'; // New
import LevelUpPage from './pages/LevelUpPage'; // New
import NextOpportunityPage from './pages/NextOpportunityPage'; // New
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <div className="app-frame">
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/level-test" element={<LevelTestPage />} />
            <Route path="/intermediate-test-result" element={<IntermediateTestResultPage />} /> {/* New */}
            <Route path="/overall-roadmap" element={<OverallRoadmapPage />} /> {/* New */}
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/stage-start" element={<StageStartPage />} />
            <Route path="/story-intro" element={<StoryIntroPage />} />
            <Route path="/problem" element={<ProblemPage />} />
            <Route path="/intermediate-test-challenge" element={<IntermediateTestChallengePage />} />
            <Route path="/intermediate-test-failure" element={<IntermediateTestFailurePage />} />
            <Route path="/intermediate-test" element={<IntermediateTestPage />} />
            <Route path="/level-up" element={<LevelUpPage />} /> {/* New */}
            <Route path="/next-opportunity" element={<NextOpportunityPage />} /> {/* New */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
