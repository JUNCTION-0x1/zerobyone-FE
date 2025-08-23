import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';
import useUserStore from '../store/userStore';
import { OrangePickerIcon, VocabularyIcon } from '../assets/icons';
import overallRoadmapBg from '../assets/images/overall_roadmap.png';

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
          top: '75px',
          right: '30px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          transform: 'scale(0.8)'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(0.85)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(0.8)')}
      >
        <VocabularyIcon />
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

      {/* 곰돌이 (Picker) 아이콘 (하단 중앙) */}
      <div
        onClick={handlePickerClick}
        style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(-50%) scale(1)')}
      >
        <OrangePickerIcon width={100} height={150} />
        <div
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#78350F',
            textAlign: 'center'
          }}
        >
          Picker
        </div>
      </div>
    </div>
  );
};

export default OverallRoadmapPage;
