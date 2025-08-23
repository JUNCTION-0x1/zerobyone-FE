import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import StatusBar from '../components/layout/StatusBar';
import { OrangeIcon } from '../assets/icons';

const IntermediateTestResultPage = () => {
  const navigate = useNavigate();
  const { level, levelName } = useUserStore(); // Get the level from the store

  useEffect(() => {
    // Automatically navigate to the overall roadmap after a short delay
    const timer = setTimeout(() => {
      navigate('/overall-roadmap');
    }, 3000); // Display result for 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#F4F4F4', overflow: 'hidden' }}>
      <StatusBar />

      {/* 당신의 현재 레벨은... */}
      <div
        style={{
          left: 99,
          top: 242,
          position: 'absolute',
          textAlign: 'center',
          color: '#525252',
          fontSize: 24,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          lineHeight: '36px'
        }}
      >
        당신의 현재 레벨은...
      </div>

      {/* 오렌지 농장 PIcker */}
      <div
        style={{
          width: 249,
          height: 51,
          left: 75,
          top: 301,
          position: 'absolute',
          color: '#F97316',
          fontSize: 32,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          lineHeight: '52px'
        }}
      >
        {levelName || '오렌지 농장 PIcker'}
      </div>

      {/* 귤 아이콘 (가운데) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 384,
          transform: 'translateX(-50%)'
        }}
      >
        <OrangeIcon width={84} height={113} />
      </div>

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
