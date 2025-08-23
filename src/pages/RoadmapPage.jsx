import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoadmapPage = () => {
  const navigate = useNavigate();

  // Mock data for roadmap stages - now all active
  const roadmapStages = [
    { id: 1, title: 'Stage 1: The Basics', active: true },
    { id: 2, title: 'Stage 2: Greetings', active: true },
    { id: 3, title: 'Stage 3: At the Airport', active: true },
    { id: 4, title: 'Stage 4: Ordering Food', active: true },
  ];

  const allStagesComplete = roadmapStages.every(stage => stage.active);

  const handleStageClick = (stage) => {
    if (stage.active) {
      navigate('/learning', { state: { stageId: stage.id } });
    }
  };

  const handleIntermediateTestClick = () => {
    navigate('/intermediate-test');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Roadmap</h1>
      <div>
        {roadmapStages.map(stage => (
          <div
            key={stage.id}
            onClick={() => handleStageClick(stage)}
            style={{
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
              cursor: stage.active ? 'pointer' : 'not-allowed',
              backgroundColor: stage.active ? 'white' : '#f0f0f0',
              color: stage.active ? 'black' : '#aaa',
            }}
          >
            <h3>{stage.title}</h3>
          </div>
        ))}
      </div>
      {allStagesComplete && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button 
            onClick={handleIntermediateTestClick}
            style={{ padding: '15px 30px', fontSize: '1.2em', cursor: 'pointer' }}
          >
            Take Intermediate Test
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
