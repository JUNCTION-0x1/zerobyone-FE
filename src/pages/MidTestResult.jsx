import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import StatusBar from '../components/layout/StatusBar';
import { OrangeIcon } from '../assets/icons';
import backgroundImg from '../assets/images/leveltestresult.png';

const IntermediateTestResultPage = () => {
  const navigate = useNavigate();
  const { level, levelName } = useUserStore(); // Get the level from the store

  useEffect(() => {
    // Automatically navigate to the overall roadmap after a short delay
    const timer = setTimeout(() => {
      navigate('/final-roadmap');
    }, 3000); // Display result for 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

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
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      />

     

     
   
      {/* 3초 후 로드맵으로 이동합니다 */}
      <div
        style={{
          left: 81,
          top: 544,
          position: 'absolute',
          textAlign: 'center',
          color: '#A3A3A3',
          fontSize: 20,
          fontFamily: 'Pretendard',
          fontWeight: '500',
          lineHeight: '28px'
        }}
      >
        3초 후 로드맵으로 이동합니다
      </div>
    </div>
  );
};

export default IntermediateTestResultPage;
