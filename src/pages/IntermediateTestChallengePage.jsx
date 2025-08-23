import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';

const IntermediateTestChallengePage = () => {
  const navigate = useNavigate();

  const handleStartTestClick = () => {
    navigate('/intermediate-test');
  };

  const handleEndLearningClick = () => {
    navigate('/roadmap');
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
        <p>정답률이 80%이상이 되어서</p>
        <p>테스트를 할 수 있어요!</p>
      </div>

      <div style={{width: '100%', maxWidth: '300px'}}>
        <button 
          onClick={handleStartTestClick}
          style={{
            display: 'block',
            width: '100%',
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
          테스트 시작
        </button>
        <button 
          onClick={handleEndLearningClick}
          style={{
            display: 'block',
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontFamily: 'Pretendard',
            fontWeight: '600',
            color: '#333',
            background: '#f0f0f0',
            border: '2px solid #A0D8FF',
            borderRadius: '15px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          학습 종료
        </button>
      </div>
    </div>
  );
};

export default IntermediateTestChallengePage;
