import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Spinner from '../components/common/Spinner';
import StatusBar from '../components/layout/StatusBar';
import { submitLevelTest } from '../services/levelTestService';

const LevelTestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setLevel } = useUserStore();

  const handleTestSubmit = async () => {
    setIsSubmitting(true);
    console.log('LevelTestPage: Recording started...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('LevelTestPage: Recording finished. Submitting for level test...');

    try {
      const dummyAudioBlob = new Blob(['dummy audio'], { type: 'audio/wav' });
      const result = await submitLevelTest(dummyAudioBlob);

      setLevel(result.level, result.levelName);

      console.log('LevelTestPage: Level test result received. Navigating to /level-test-result.');
      navigate('/level-test-result');
    } catch (error) {
      console.error('LevelTestPage: Failed to submit level test', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log('LevelTestPage: Displaying test UI.');
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white', overflow: 'hidden' }}>
      <StatusBar />

      <div
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: 244,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 36,
          fontFamily: 'Pretendard',
          fontWeight: '600',
          lineHeight: '52px',
          width: '90%',
          whiteSpace: 'pre-wrap'
        }}
      >
        {isSubmitting ? '레벨 측정 중...' : '(예)다른 건 필요없어?\n라고 말해보세요.'}
      </div>

      <div
        onClick={!isSubmitting ? handleTestSubmit : undefined}
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
