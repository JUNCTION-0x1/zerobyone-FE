import React, { useState, useRef } from 'react';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <button
        onClick={togglePlay}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#D7D7D7',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{
          width: 0,
          height: 0,
          borderLeft: '20px solid white', // 15px에서 20px로 증가
          borderTop: '12px solid transparent', // 10px에서 12px로 증가
          borderBottom: '12px solid transparent', // 10px에서 12px로 증가
          marginLeft: '3px'
        }} />
      </button>
      <audio
        ref={audioRef}
        src={src}
        onEnded={handleEnded}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AudioPlayer;
