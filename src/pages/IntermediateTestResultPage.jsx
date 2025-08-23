import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import StatusBar from '../components/layout/StatusBar';

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
    <div style={{
      width: '100%', 
      height: '100%', 
      position: 'relative', 
      background: '#EAF7FF', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <StatusBar />
      
      <div style={{
        fontFamily: 'Pretendard', 
        color: '#333', 
        fontSize: '28px', 
        fontWeight: '600', 
        lineHeight: '1.4em',
        marginBottom: '50px'
      }}>
        <p>당신의 현재 레벨은...</p>
        <p style={{fontSize: '36px', color: '#0099FB'}}>{level} ({levelName})</p>
      </div>

      <p style={{fontFamily: 'Pretendard', color: '#555', fontSize: '16px'}}>
        3초 후 전체 로드맵으로 이동합니다.
      </p>
    </div>
  );
};

export default IntermediateTestResultPage;
