import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';
import backgroundImage from '../assets/images/stageStartBackground.png';

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
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 4 
      }}>
        <StatusBar />
      </div>

      {/* 배경 이미지 레이어 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      />
      
      {/* 전체 화면 터치 영역 */}
      <div
        onClick={handleStartClick}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          zIndex: 2
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 3 // 터치 영역 위에 표시되도록
        }}
      >
      </div>
    </div>
  );
};

export default RoadmapPage;
