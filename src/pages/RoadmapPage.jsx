import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import StatusBar from '../components/layout/StatusBar';

const RoadmapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobCategory } = location.state || { jobCategory: 'General' }; // Get jobCategory
  const { level, levelName } = useUserStore();

  // Mock data for roadmap stages with positions for the path
  const roadmapStages = [
    { id: 1, title: 'Stage 1', active: true, pos: { top: '65%', left: '20%' } },
    { id: 2, title: 'Stage 2', active: true, pos: { top: '50%', left: '50%' } },
    { id: 3, title: 'Stage 3', active: true, pos: { top: '35%', left: '30%' } },
    { id: 4, title: 'Stage 4', active: true, pos: { top: '20%', left: '60%' } },
  ];

  const handleStageClick = (stage) => {
    if (stage.active) {
      navigate('/stage-start', { state: { stageId: stage.id, jobCategory } }); // Pass jobCategory
    }
  };

  const stageStyle = (stage) => ({
    position: 'absolute',
    top: stage.pos.top,
    left: stage.pos.left,
    transform: 'translate(-50%, -50%)',
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: stage.active ? '#53BBFD' : '#B0B0B0',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    cursor: stage.active ? 'pointer' : 'not-allowed',
    border: '4px solid white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: '16px'
  });

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: '#EAF7FF', overflow: 'hidden'}}>
      <StatusBar />
      
      {/* Title */}
      <h1 style={{textAlign: 'center', marginTop: '70px', fontFamily: 'Pretendard', color: '#333'}}>
        {jobCategory} 학습 로드맵
      </h1>

      {/* Mountain Path Background - simplified */}
      <div style={{ position: 'absolute', top: '15%', left: 0, width: '100%', height: '70%', zIndex: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 392 600" preserveAspectRatio="none">
          <path d="M 80 420 Q 196 300 120 210 T 240 120" stroke="#A0D8FF" strokeWidth="15" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Stages */}
      <div style={{position: 'relative', width: '100%', height: '100%'}}>
        {roadmapStages.map(stage => (
          <div
            key={stage.id}
            onClick={() => handleStageClick(stage)}
            style={stageStyle(stage)}
          >
            {stage.title}
          </div>
        ))}
      </div>

      {/* Bottom UI Elements */}
      <div style={{position: 'absolute', bottom: 20, left: 20, width: 'calc(100% - 40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        {/* Character Image */}
        <img src="/icons/character.svg" alt="character" style={{width: 80, height: 80}} />

        {/* User Level */}
        <div style={{textAlign: 'right', fontFamily: 'Pretendard', color: '#333'}}>
          <p style={{margin: 0, fontSize: '18px', fontWeight: '600'}}>Level: {level || 'N/A'}</p>
          <p style={{margin: 0, fontSize: '14px'}}>({levelName || 'Unranked'})</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
