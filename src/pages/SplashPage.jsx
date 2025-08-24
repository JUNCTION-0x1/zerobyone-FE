import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';
import StatusBar from '../components/layout/StatusBar';
import airplaneImage from '../assets/images/airplane.png';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('SplashPage: Navigating to /level-test in 5 seconds.');
    const timer = setTimeout(() => {
      navigate('/level-test');
      console.log('SplashPage: Navigated to /level-test.');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: 'linear-gradient(138deg, #CAEAFF 0%, #53BBFD 54%, #0099FB 100%)',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <StatusBar />
      </div>

      {/* Background airplane image */}
      <img
        src={airplaneImage}
        alt="Airplane Background"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />

      <Spinner />
    </div>
  );
};

export default SplashPage;
