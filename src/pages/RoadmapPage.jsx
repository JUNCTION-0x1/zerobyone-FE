import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';

const RoadmapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stageId } = location.state || { stageId: 1 };

  const handleStartClick = () => {
    navigate('/roadmap', { state: { stageId } });
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#EAF7FF',
        overflow: 'hidden'
      }}
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
        <p
          style={{ fontFamily: 'Pretendard', fontSize: '22px', fontWeight: '600', color: '#333', marginBottom: '30px' }}
        >
          오렌지 농장에서 살아남기 Start !
        </p>
        <button
          onClick={handleStartClick}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            cursor: 'pointer',
            background: '#0099FB',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontFamily: 'Pretendard',
            fontWeight: '600'
          }}
        >
          게임 시작하기
        </button>
      </div>
    </div>
  );
};

export default RoadmapPage;
