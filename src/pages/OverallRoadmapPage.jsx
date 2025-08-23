import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';
import useUserStore from '../store/userStore';

const OverallRoadmapPage = () => {
  const navigate = useNavigate();
  const { level, levelName } = useUserStore();

  // Updated job categories based on user's clarification
  const jobCategories = [
    { id: 3, name: '스타벅스 파트너', active: true, minLevel: '주니어' }, // Example: requires '주니어' level
    { id: 2, name: '맥도날드 크루', active: true, minLevel: '인턴' }, // Example: requires '인턴' level
    { id: 1, name: '오렌지 농장 피커', active: true, minLevel: '초보' }, // Example: requires '초보' level
  ];

  const handleJobClick = (job) => {
    // In a real app, you'd check if the user's level meets minLevel
    if (job.active) {
      navigate('/roadmap', { state: { jobCategory: job.name } });
    }
  };

  const jobCardStyle = (job) => ({
    width: '100%',
    padding: '20px',
    marginBottom: '15px',
    backgroundColor: job.active ? 'white' : '#f0f0f0',
    border: job.active ? '2px solid #53BBFD' : '2px solid #ccc',
    borderRadius: '15px', // Rectangular components
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: job.active ? 'pointer' : 'not-allowed',
    fontFamily: 'Pretendard',
    color: '#333',
    fontSize: '20px',
    fontWeight: '600',
    textAlign: 'center'
  });

  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      position: 'relative', 
      background: '#EAF7FF', 
      overflow: 'hidden',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <StatusBar />
      
      <h1 style={{textAlign: 'center', marginTop: '70px', fontFamily: 'Pretendard', color: '#333'}}>전체 로드맵</h1>
      <p style={{textAlign: 'center', fontFamily: 'Pretendard', color: '#555', fontSize: '16px'}}>
        현재 레벨: {level || 'N/A'} ({levelName || 'Unranked'})
      </p>

      <div style={{marginTop: '30px'}}>
        {jobCategories.map(job => (
          <div key={job.id} onClick={() => handleJobClick(job)} style={jobCardStyle(job)}>
            {job.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallRoadmapPage;
