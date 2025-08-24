import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';
import useUserStore from '../store/userStore';
import { OrangePickerIcon, VocabularyIcon } from '../assets/icons';
import overallRoadmapBg from '../assets/images/finalroadmapbackground.png';

const OverallRoadmapPage = () => {
  const navigate = useNavigate();
  const { level, levelName } = useUserStore();

  const handlePickerClick = () => {
    navigate('/stage-start', { state: { jobCategory: '오렌지 농장 피커' } });
  };

  const handleVocabularyClick = () => {
    console.log('단어장 클릭됨');
    // 추후 단어장 페이지로 이동하는 로직 추가 가능
  };

  return (
    <div
      style={{
        width: '393px',
        height: '852px',
        position: 'relative',
        backgroundImage: `url(${overallRoadmapBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}
    >
      <StatusBar backgroundColor="#8ED2FF" />

      {/* 단어장 아이콘 (오른쪽 상단) */}
      <div
        onClick={handleVocabularyClick}
        style={{
          position: 'absolute',
          top: '60px',
          right: '0px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          zIndex: 10
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <VocabularyIcon width={121} height={122} />
        <div
          style={{
            marginTop: '5px',
            textAlign: 'center',
            fontFamily: 'Pretendard',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#FF890A'
          }}
        ></div>
      </div>

      {/* 곰돌이 (Picker) 아이콘 (왼쪽 하단) */}
      <div
        onClick={handlePickerClick}
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '60px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <OrangePickerIcon width={160} height={240} />
      </div>
    </div>
  );
};

export default OverallRoadmapPage;
