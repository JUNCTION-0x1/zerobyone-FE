import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';

const StageStartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stageId } = location.state || { stageId: 1 };

  const handleStartClick = () => {
    navigate('/story-intro', { state: { stageId } });
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#EAF7FF',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      onClick={handleStartClick}
    >
      <StatusBar />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}
      >
        <img src="/icons/character.svg" alt="character" style={{ width: 150, height: 150, marginBottom: '20px' }} />
        <p style={{ fontFamily: 'Pretendard', fontSize: '22px', fontWeight: '600', color: '#333' }}>
          오렌지 농장에서 살아남기 Start ! 게임을 시작하려면 화면을 터치해 주세요.
        </p>
      </div>
    </div>
  );
};

export default StageStartPage;
