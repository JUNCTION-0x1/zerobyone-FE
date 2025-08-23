import React, { useState, useEffect } from 'react';
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
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#F4F4F4',
        overflow: 'hidden'
      }}
    >
      <StatusBar />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 393 852"
        width="393"
        height="852"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Main Text */}
        {isSubmitting ? (
          <text
            x="50%"
            y="260"
            textAnchor="middle"
            fill="#353535"
            fontSize="24"
            fontFamily="Pretendard"
            fontWeight="700"
          >
            레벨 측정 중...
          </text>
        ) : (
          <>
            <text
              x="50%"
              y="250"
              textAnchor="middle"
              fill="#353535"
              fontSize="24"
              fontFamily="Pretendard"
              fontWeight="700"
            >
              "영어를 더 잘하고 싶어서
            </text>
            <text
              x="50%"
              y="280"
              textAnchor="middle"
              fill="#353535"
              fontSize="24"
              fontFamily="Pretendard"
              fontWeight="700"
            >
              매일 조금씩 공부해요."
            </text>
          </>
        )}

        {/* Instruction Text */}
        <text x="50%" y="360" textAnchor="middle" fill="#8E8E8E" fontSize="20" fontFamily="Pretendard" fontWeight="500">
          마이크를 눌러 영어로 말해보세요.
        </text>

        {/* Mic Button */}
        <g transform="translate(122, 436)">
          <rect
            width="148"
            height="148"
            rx="74"
            fill={isSubmitting ? '#D9D9D9' : '#353535'}
            onClick={!isSubmitting ? handleTestSubmit : undefined}
            style={{ cursor: isSubmitting ? 'default' : 'pointer' }}
          />
          <path
            d="M73.5 36.8125C69.2731 36.8125 65.2193 38.4916 62.2305 41.4805C59.2416 44.4693 57.5625 48.5231 57.5625 52.75V74C57.5625 78.2269 59.2416 82.2807 62.2305 85.2695C65.2193 88.2584 69.2731 89.9375 73.5 89.9375C77.7269 89.9375 81.7807 88.2584 84.7695 85.2695C87.7584 82.2807 89.4375 78.2269 89.4375 74V52.75C89.4375 48.5231 87.7584 44.4693 84.7695 41.4805C81.7807 38.4916 77.7269 36.8125 73.5 36.8125ZM49.5938 71.3438C50.2982 71.3438 50.9739 71.6236 51.472 72.1217C51.9701 72.6199 52.25 73.2955 52.25 74C52.25 79.6358 54.4888 85.0409 58.474 89.026C62.4591 93.0112 67.8641 95.25 73.5 95.25C79.1358 95.25 84.5409 93.0112 88.526 89.026C92.5112 85.0409 94.75 79.6358 94.75 74C94.75 73.2955 95.0299 72.6199 95.528 72.1217C96.0261 71.6236 96.7018 71.3438 97.4062 71.3438C98.1107 71.3438 98.7864 71.6236 99.2845 72.1217C99.7826 72.6199 100.062 73.2955 100.062 74C100.062 87.7753 89.5783 99.1016 76.1536 100.43L76.1562 100.562V108.531C76.1562 109.236 75.8764 109.911 75.3783 110.41C74.8801 110.908 74.2045 111.188 73.5 111.188C72.7955 111.188 72.1199 110.908 71.6217 110.41C71.1236 109.911 70.8438 109.236 70.8438 108.531V100.562L70.8464 100.43C57.4217 99.1016 46.9375 87.778 46.9375 74C46.9375 73.2955 47.2174 72.6199 47.7155 72.1217C48.2136 71.6236 48.8893 71.3438 49.5938 71.3438Z"
            fill={isSubmitting ? '#8E8E8E' : 'white'}
            onClick={!isSubmitting ? handleTestSubmit : undefined}
            style={{ cursor: isSubmitting ? 'default' : 'pointer' }}
          />
        </g>
      </svg>

      {isSubmitting && <Spinner />}
    </div>
  );
};

export default LevelTestPage;
