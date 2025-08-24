import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';
import { MidTestSpeakerIcon, MicOffIcon } from '../assets/icons';

// SVG 아이콘 컴포넌트들
const SpeechBubbleIcon = ({ className = '' }) => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className={className}>
    <rect x="4" y="6" width="32" height="22" rx="4" fill="white" stroke="white" strokeWidth="2" />
    <path
      d="M12 32L16 28H36C38.2091 28 40 26.2091 40 24V10C40 7.79086 38.2091 6 36 6H8C5.79086 6 4 7.79086 4 10V24C4 26.2091 5.79086 28 8 28H12V32Z"
      fill="white"
    />
    <circle cx="14" cy="17" r="2" fill="#A8A29E" />
    <circle cx="22" cy="17" r="2" fill="#A8A29E" />
    <circle cx="30" cy="17" r="2" fill="#A8A29E" />
  </svg>
);

const MicrophoneIcon = ({ className = '', isActive = false }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className={className}>
    <rect x="30" y="10" width="20" height="35" rx="10" fill="white" />
    <path
      d="M20 35C20 43.2843 26.7157 50 35 50H45C53.2843 50 60 43.2843 60 35"
      stroke="white"
      strokeWidth="3"
      fill="none"
    />
    <line x1="40" y1="50" x2="40" y2="65" stroke="white" strokeWidth="3" />
    <line x1="30" y1="65" x2="50" y2="65" stroke="white" strokeWidth="3" />
    {isActive && (
      <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
        <animate attributeName="r" values="35;45;35" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
    )}
  </svg>
);

const MidTestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    stageId,
    stageName = 'Picker',
    stageLevel = 10
  } = location.state || {
    stageId: 1,
    stageName: 'Picker',
    stageLevel: 10
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(2); // 2/3로 표시
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const recordingTimeRef = useRef(null);
  const totalQuestions = 3;

  const handleMicClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // 녹음 시간 카운터
      recordingTimeRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // 자동으로 10초 후 정지
      setTimeout(() => {
        if (mediaRecorderRef.current && isRecording) {
          stopRecording();
        }
      }, 10000);
    } catch (error) {
      console.error('마이크 접근 오류:', error);
      alert('마이크에 접근할 수 없습니다. 브라우저 설정을 확인해주세요.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }

    if (recordingTimeRef.current) {
      clearInterval(recordingTimeRef.current);
    }

    setIsRecording(false);
    setRecordingTime(0);

    // 녹음 완료 후 다음 단계로 이동
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // 테스트 완료
        alert('레벨업 테스트를 완료했습니다!');
        navigate('/roadmap');
      }
    }, 1000);
  };

  const containerStyle = {
    width: '384px',
    height: '852px',
    position: 'relative',
    background: '#F4F4F5', // zinc-100
    overflow: 'hidden',
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
  };

  const titleStyle = {
    position: 'absolute',
    left: '132px',
    top: '83px',
    textAlign: 'center',
    justifyContent: 'start',
    color: '#404040', // neutral-700
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Pretendard',
    lineHeight: '36px'
  };

  const cardStyle = {
    width: '230px',
    height: '216px',
    position: 'absolute',
    left: '15px',
    top: '202px',
    padding: '28px 64px', // px-16 py-7
    background: '#E5E7EB', // neutral-200
    borderRadius: '30px',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    gap: '10px'
  };

  const cardContentStyle = {
    width: '208px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '16px'
  };

  const iconContainerStyle = {
    width: '73px',
    height: '73px',
    padding: '0px',
    background: '#D6D3D1', // stone-300
    borderRadius: '36.50px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0px'
  };

  const iconInnerStyle = {
    width: '73px',
    height: '73px',
    position: 'relative',
    overflow: 'hidden'
  };

  const cardTextStyle = {
    textAlign: 'center',
    justifyContent: 'start',
    color: '#A3A3A3', // neutral-400
    fontSize: '20px',
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: '32px'
  };

  const orangeTextStyle = {
    color: '#FB923C', // orange-400
    fontSize: '20px',
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: '32px'
  };

  const micSectionStyle = {
    width: '256px', // w-64
    position: 'absolute',
    left: '68px',
    top: '509px',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '32px' // gap-8
  };

  const micTextStyle = {
    alignSelf: 'stretch',
    textAlign: 'center',
    justifyContent: 'start',
    color: '#A3A3A3', // neutral-400
    fontSize: '20px',
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: '28px' // leading-7
  };

  const micButtonStyle = {
    width: '144px', // w-36
    height: '144px', // h-36
    padding: '32px', // p-8
    background: isRecording ? '#DC2626' : '#52525B', // recording: red-600, default: neutral-700
    borderRadius: '74px', // rounded-[74px]
    display: 'inline-flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '10px', // gap-2.5
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isRecording ? '0 0 20px rgba(220, 38, 38, 0.4)' : '0 4px 8px rgba(0,0,0,0.1)'
  };

  const micIconContainerStyle = {
    width: '80px', // w-20
    height: '80px', // h-20
    position: 'relative',
    overflow: 'hidden'
  };

  const micIconStyle = {
    width: '56px', // w-14
    height: '80px', // h-20
    position: 'absolute',
    left: '15.94px',
    top: '5.31px',
    background: 'white'
  };

  const recordingIndicatorStyle = {
    position: 'absolute',
    bottom: '-30px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#DC2626',
    fontSize: '16px',
    fontWeight: '600'
  };

  return (
    <div style={containerStyle}>
      <StatusBar />

      {/* Title */}
      <div style={titleStyle}>레벨업 테스트</div>

      {/* Card */}
      <div style={cardStyle}>
        <div style={cardContentStyle}>
          <div style={iconContainerStyle}>
            <div style={iconInnerStyle}>
              <MidTestSpeakerIcon width="73" height="73" />
            </div>
          </div>
          <div style={cardTextStyle}>
            제시하는 상황에 맞는 말을
            <br />
            자유롭게 대답해 보세요.
            <span style={orangeTextStyle}> {currentQuestionIndex}</span>
            <span style={cardTextStyle}>/{totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Mic Section */}
      <div style={micSectionStyle}>
        <div style={micTextStyle}>마이크를 눌러 영어로 말해보세요.</div>
        <div style={{ position: 'relative' }}>
          <button
            onClick={handleMicClick}
            style={micButtonStyle}
            onMouseOver={(e) => {
              if (!isRecording) {
                e.currentTarget.style.background = '#525252'; // hover: neutral-600
              }
            }}
            onMouseOut={(e) => {
              if (!isRecording) {
                e.currentTarget.style.background = isRecording ? '#DC2626' : '#52525B';
              }
            }}
          >
            <div style={micIconContainerStyle}>
              {isRecording ? (
                <div style={micIconStyle}>
                  <MicrophoneIcon isActive={isRecording} />
                </div>
              ) : (
                <div style={micIconStyle}>
                  <MicOffIcon width="56" height="80" />
                </div>
              )}
            </div>
          </button>

          {isRecording && <div style={recordingIndicatorStyle}>녹음 중... {recordingTime}초</div>}
        </div>
      </div>
    </div>
  );
};

export default MidTestPage;
