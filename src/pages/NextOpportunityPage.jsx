import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';

const NextOpportunityPage = () => {
  const navigate = useNavigate();

  const handleGoToOverallRoadmap = () => {
    navigate('/overall-roadmap');
  };

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
        <p>아쉽지만 다음 기회에!</p>
        <p>더 열심히 연습해 봐요!</p>
      </div>

      <button 
        onClick={handleGoToOverallRoadmap}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '300px',
          padding: '15px',
          fontSize: '18px',
          fontFamily: 'Pretendard',
          fontWeight: '600',
          color: 'white',
          background: '#53BBFD',
          border: 'none',
          borderRadius: '15px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '15px'
        }}
      >
        전체 로드맵으로
      </button>
    </div>
  );
};

export default NextOpportunityPage;
