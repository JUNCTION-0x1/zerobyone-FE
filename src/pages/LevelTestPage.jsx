import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Spinner from '../components/common/Spinner';
import StatusBar from '../components/layout/StatusBar'; // Import StatusBar

const LevelTestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [levelResult, setLevelResult] = useState(null);
  const navigate = useNavigate();
  const { setLevel, hasCompletedLevelTest } = useUserStore();

  useEffect(() => {
    if (hasCompletedLevelTest) {
      navigate('/roadmap', { replace: true });
    }
  }, [hasCompletedLevelTest, navigate]);

  const submitForLevelTest = async () => {
    setIsSubmitting(true);
    console.log("Recording started...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Recording finished. Submitting for level test...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockResponse = { level: '인턴', levelName: 'A2' };
    setLevel(mockResponse.level, mockResponse.levelName);
    setLevelResult(mockResponse);
    setIsSubmitting(false);
    console.log("Level test result:", mockResponse);
    setTimeout(() => {
      navigate('/roadmap');
    }, 3000);
  };

  if (levelResult) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>측정된 당신의 레벨은...</h2>
        <h3>{levelResult.level} ({levelResult.levelName})</h3>
        <p>3초 후 로드맵으로 이동합니다.</p>
      </div>
    );
  }
  
  if (hasCompletedLevelTest) {
    return null;
  }

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden'}}>
      <StatusBar />

      <div style={{left: '50%', transform: 'translateX(-50%)', top: 244, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 36, fontFamily: 'Pretendard', fontWeight: '600', lineHeight: '52px', width: '90%', whiteSpace: 'pre-wrap'}}>
        {isSubmitting ? '레벨 측정 중...' : '(예)다른 건 필요없어?\n라고 말해보세요.'}
      </div>
      
      <div 
        onClick={!isSubmitting ? submitForLevelTest : undefined}
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

export default LevelTestPage;
