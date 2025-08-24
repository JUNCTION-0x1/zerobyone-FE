import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatusBar from '../components/layout/StatusBar';
import { LevelTestCheckOrangeIcon } from '../assets/icons';

const ProblemSuccessPage = () => {
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

  const handleNextStage = () => {
    // 레벨업 테스트로 이동
    navigate('/mid-test', {
      state: {
        stageId,
        stageName,
        stageLevel
      }
    });
  };

  const handleBackToRoadmap = () => {
    navigate('/roadmap');
  };

  const containerStyle = {
    width: '384px',
    height: '852px',
    position: 'relative',
    background: '#F4F4F5', // zinc-100
    overflow: 'hidden',
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
  };

  const iconContainerStyle = {
    width: '112px',
    height: '112px',
    position: 'absolute',
    left: '141px',
    top: '189px',
    overflow: 'hidden'
  };

  const iconStyle = {
    width: '96px',
    height: '96px',
    position: 'absolute',
    left: '6.94px',
    top: '6.94px'
  };

  const titleStyle = {
    position: 'absolute',
    left: '112px',
    top: '316px',
    textAlign: 'center',
    justifyContent: 'start',
    color: '#404040', // neutral-700
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Pretendard',
    lineHeight: '36px'
  };

  const subtitleStyle = {
    position: 'absolute',
    left: '25px',
    top: '418px',
    width: '320px', // w-80
    textAlign: 'center',
    justifyContent: 'start',
    color: '#A3A3A3', // neutral-400
    fontSize: '20px',
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: '32px'
  };

  const primaryButtonStyle = {
    width: '384px',
    height: '56px',
    position: 'absolute',
    left: '16px',
    top: '698px',
    padding: '6px 144px',
    background: '#FB923C', // orange-400
    borderRadius: '10px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    border: 'none',
    cursor: 'pointer'
  };

  const primaryButtonTextStyle = {
    textAlign: 'center',
    justifyContent: 'start',
    color: 'black',
    fontSize: '20px',
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: '40px'
  };

  const secondaryButtonStyle = {
    width: '384px',
    height: '56px',
    position: 'absolute',
    left: '16px',
    top: '763px',
    padding: '5px 144px',
    background: '#E5E7EB', // gray-200
    borderRadius: '10px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    border: 'none',
    cursor: 'pointer'
  };

  const secondaryButtonTextStyle = {
    justifyContent: 'start',
    color: '#71717A', // zinc-500
    fontSize: '20px',
    fontWeight: '600',
    fontFamily: 'Pretendard',
    lineHeight: '40px'
  };

  const homeIndicatorStyle = {
    position: 'absolute',
    left: '1px',
    top: '818px',
    width: '384px',
    height: '32px'
  };

  const homeIndicatorBarStyle = {
    width: '128px',
    height: '5px',
    position: 'absolute',
    left: '128px',
    top: '21px',
    background: 'black',
    borderRadius: '100px'
  };

  return (
    <div style={containerStyle}>
      <StatusBar />

      {/* Icon Container */}
      <div style={iconContainerStyle}>
        <LevelTestCheckOrangeIcon style={iconStyle} />
      </div>

      {/* Title */}
      <div style={titleStyle}>
        {stageName} {stageLevel}단계를 <br />
        모두 통과했어요!
      </div>

      {/* Subtitle */}
      <div style={subtitleStyle}>
        레벨업 테스트를 통과하면 <br />
        Supervisor 관련 대화를 <br />
        배울 수 있어요.
      </div>

      {/* Primary Button */}
      <button onClick={handleNextStage} style={primaryButtonStyle}>
        <div style={primaryButtonTextStyle}>테스트 시작</div>
      </button>

      {/* Secondary Button */}
      <button onClick={handleBackToRoadmap} style={secondaryButtonStyle}>
        <div style={secondaryButtonTextStyle}>학습 종료</div>
      </button>

      {/* Home Indicator */}
      <div style={homeIndicatorStyle}>
        <div style={homeIndicatorBarStyle} />
      </div>
    </div>
  );
};

export default ProblemSuccessPage;
