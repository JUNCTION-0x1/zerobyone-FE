import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';
import audioSrc from '../assets/dummy.m4a'; // Placeholder audio
import backgroundImage from '../assets/levelstartbackground.png'; // 이미지 import 추가
import caption from '../assets/levelstartcaption.png';

const ProblemIntroPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stageId } = location.state || { stageId: 1 };
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto-play audio when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        // Auto-play might be blocked by the browser
        console.log('Audio auto-play blocked:', error);
      });
    }
  }, []);

  const handleNext = () => {
    navigate('/problem', { state: { stageId } });
  };

  const handleAudioEnded = () => {
    // 오디오가 끝나면 자동으로 다음 페이지로 이동
    handleNext();
  };

  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      position: 'relative', 
      background: '#EAF7FF', 
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      {/* 배경 이미지 레이어 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`, // import한 이미지 사용
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      />
      
      <StatusBar />
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        style={{display: 'none'}}
        onEnded={handleAudioEnded} // 오디오 끝나면 실행
      />
      
      <div style={{ 
        position: 'absolute', 
        top: '200px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 2 
      }}>
        <img 
          src={caption} 
          alt="caption" 
          style={{ 
          }} 
        />
      </div>
    </div>
  );
};

export default ProblemIntroPage;