import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';
import backgroundImage from '../assets/images/roadmapBackground.png'; 
import oranges from '../assets/images/oranges.png';
import orange10 from '../assets/images/orange10.png';

const StageStartPage = () => {
const navigate = useNavigate();
const location = useLocation();
const { jobCategory } = location.state || { jobCategory: 'General' }; // Get jobCategory

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#EAF7FF', overflow: 'hidden' }}>
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 4 
      }}>
        <StatusBar />
      </div>
    
      {/* oranges 배경 이미지 레이어 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`, // oranges를 배경으로
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      />

      {/* oranges 이미지를 배경 위에 올리기 */}
      <div
        style={{
          position: 'absolute',
          top: '54%', 
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}
      >
        <img 
          src={oranges} 
          alt="oranges" 
          style={{
            // 원본 크기 유지
          }}
        />
      </div>

      {/* orange10 이미지를 oranges 위에 추가 */}
      <div
        onClick={() => navigate('/problem-intro', { state: { stageId: 10, jobCategory } })} 
        style={{
          position: 'absolute',
          top: '15%',
          left: '80%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          cursor: 'pointer' // 클릭 가능함을 표시
        }}
      >
        <img 
          src={orange10} 
          alt="orange10" 
          style={{
            // 원본 크기 유지
          }}
        />
      </div>
    </div>
  );
};

export default StageStartPage;