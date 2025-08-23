import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';
import audioSrc from '../assets/dummy.m4a'; // Placeholder audio

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

  const handleNextClick = () => {
    navigate('/problem', { state: { stageId } });
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
      <StatusBar />
      <audio ref={audioRef} src={audioSrc} style={{display: 'none'}} />
      
      <div>
        <p style={{fontFamily: 'Pretendard', fontSize: '28px', fontWeight: '600', color: '#333'}}>
          주인이 소리쳐요!<br/>과연 무슨 일일까요?
        </p>
      </div>

      <button 
        onClick={handleNextClick}
        style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          padding: '15px 30px',
          fontSize: '18px',
          cursor: 'pointer',
          background: '#0099FB',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          fontFamily: 'Pretendard',
          fontWeight: '600'
        }}
      >
        다음
      </button>
    </div>
  );
};

export default ProblemIntroPage;
