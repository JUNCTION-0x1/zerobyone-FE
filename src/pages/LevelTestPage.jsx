import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Spinner from '../components/common/Spinner';
import StatusBar from '../components/layout/StatusBar';
import { submitLevelTest } from '../services/levelTestService';
import { MicOffIcon, MicOnIcon, ProgressIcon } from '../assets/icons';

const LevelTestPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setLevel } = useUserStore();
  const timerRef = useRef(null);
  const recordingDuration = 30; // 30초

  // 녹음 시작/중지 핸들러
  const handleMicClick = () => {
    if (isRecording) {
      // 녹음 중지
      stopRecording();
    } else {
      // 녹음 시작
      startRecording();
    }
  };

  // 녹음 시작
  const startRecording = () => {
    console.log('LevelTestPage: Recording started...');
    setIsRecording(true);
    setRecordingTime(0);
    setRecordingProgress(0);

    // 타이머 시작 (100ms마다 업데이트로 부드러운 애니메이션)
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => {
        const newTime = prevTime + 0.1; // 0.1초씩 증가
        const progress = (newTime / recordingDuration) * 100;
        setRecordingProgress(progress);

        // 30초 완료 시 자동 중지
        if (newTime >= recordingDuration) {
          stopRecording();
          return recordingDuration;
        }
        return newTime;
      });
    }, 100); // 100ms마다 업데이트
  };

  // 녹음 중지
  const stopRecording = () => {
    console.log('LevelTestPage: Recording stopped...');
    setIsRecording(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // 녹음 완료 후 제출
    submitRecording();
  };

  // 녹음 파일 제출
  const submitRecording = async () => {
    setIsSubmitting(true);
    console.log('LevelTestPage: Submitting recording for level test...');

    try {
      // 실제 녹음 파일이 있다면 여기서 처리
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

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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
        {/* Main Text - 항상 동일한 텍스트 표시 */}
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

        {/* Instruction Text - 항상 표시 */}
        {!isSubmitting && (
          <text
            x="50%"
            y="360"
            textAnchor="middle"
            fill="#8E8E8E"
            fontSize="20"
            fontFamily="Pretendard"
            fontWeight="500"
          >
            마이크를 눌러 영어로 말해보세요.
          </text>
        )}
      </svg>

      {/* Progress Ring (녹음 중일 때만 표시) */}
      {isRecording && (
        <div
          style={{
            position: 'absolute',
            left: 106, // 마이크 버튼(122) - 진행바 절반(90) + 중앙 정렬(16) = 106
            top: 420, // 마이크 버튼(436) - 여백(16) = 420
            pointerEvents: 'none',
            zIndex: 1 // 마이크 버튼 뒤에 배치
          }}
        >
          <ProgressIcon width={180} height={180} progress={recordingProgress} />
        </div>
      )}

      {/* Mic Button */}
      <div
        style={{
          position: 'absolute',
          left: 122,
          top: 436,
          cursor: isSubmitting ? 'default' : 'pointer',
          zIndex: 2 // 진행바 위에 표시
        }}
        onClick={!isSubmitting ? handleMicClick : undefined}
      >
        {isRecording ? (
          <MicOnIcon width={148} height={148} />
        ) : (
          <MicOffIcon
            width={148}
            height={148}
            fill={isSubmitting ? '#8E8E8E' : 'white'}
            bgFill={isSubmitting ? '#D9D9D9' : '#353535'}
          />
        )}
      </div>

      {isSubmitting && <Spinner />}
    </div>
  );
};

export default LevelTestPage;
