import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Spinner from '../components/common/Spinner';
import StatusBar from '../components/layout/StatusBar';

const IntermediateTestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const { setLevel } = useUserStore();

  const submitForIntermediateTest = async () => {
    setIsSubmitting(true);
    console.log("Submitting for intermediate test...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResponse = { score: 85, passed: true, newLevel: '주니어', newLevelName: 'B2' }; // Simulate pass
    // const mockResponse = { score: 70, passed: false }; // Simulate fail
    
    if (mockResponse.passed) {
      setLevel(mockResponse.newLevel, mockResponse.newLevelName);
    }
    
    setResult(mockResponse);
    setIsSubmitting(false);
    console.log("Intermediate test result:", mockResponse);

    setTimeout(() => {
      if (mockResponse.passed) {
        navigate('/level-up'); // Navigate to LevelUpPage
      } else {
        navigate('/next-opportunity'); // Navigate to NextOpportunityPage
      }
    }, 4000);
  };

  if (result) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {result.passed ? (
          <div>
            <h2>Congratulations! You've Leveled Up!</h2>
            <h3>New Level: {result.newLevel} ({result.newLevelName})</h3>
            <p>Your score: {result.score}%</p>
          </div>
        ) : (
          <div>
            <h2>Almost there!</h2>
            <p>Your score: {result.score}%. You need 80% to pass.</p>
            <p>Keep practicing and try again!</p>
          </div>
        )}
        <p>4초 후 결과 페이지로 이동합니다.</p>
      </div>
    );
  }

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden'}}>
      <StatusBar />

      <div style={{left: '50%', transform: 'translateX(-50%)', top: 244, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 36, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '52px', width: '90%', whiteSpace: 'pre-wrap'}}>
        {isSubmitting ? '채점 중...' : '중간 테스트를 시작합니다.\n아래 문장을 읽어주세요.'}
      </div>
      
      <div 
        onClick={!isSubmitting ? submitForIntermediateTest : undefined}
        style={{
          width: 170, 
          height: 170, 
          left: '50%', 
          top: 445, 
          position: 'absolute', 
          transform: 'translateX(-50%)',
          background: isSubmitting ? '#D9D9D9' : '#7B7B7B', 
          borderRadius: '50%',
          cursor: isSubmitting ? 'default' : 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black',
          fontSize: 36,
          fontFamily: 'Pretendard',
          fontWeight: '600'
        }}
      >
        {isSubmitting ? '...' : '마이크'}
      </div>

      {isSubmitting && <Spinner />}
    </div>
  );
};

export default IntermediateTestPage;
