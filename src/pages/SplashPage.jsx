import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import StatusBar from '../components/layout/StatusBar';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SplashPage: Navigating to /level-test in 5 seconds.");
    const timer = setTimeout(() => {
      navigate('/level-test');
      console.log("SplashPage: Navigated to /level-test.");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      position: 'relative', 
      background: 'linear-gradient(138deg, #CAEAFF 0%, #53BBFD 54%, #0099FB 100%)', 
      overflow: 'hidden'
    }}>
      <StatusBar />

      {/* Placeholder for the airplane image */}
      <div style={{
        position: 'absolute',
        top: '40%', // Adjusted to make space for the spinner
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white'
      }}>
        <span style={{fontSize: '60px'}}>✈️</span>
        <p style={{fontFamily: 'Pretendard', fontSize: '24px', fontWeight: '600'}}>ZeroByOne</p>
      </div>

      <Spinner />
    </div>
  );
};

export default SplashPage;
