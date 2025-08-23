import React from 'react';

const ProgressIcon = ({ width = 167, height = 189, progress = 0, ...props }) => {
  // 원의 중심과 반지름 계산
  const centerX = 83.5;
  const centerY = 94.5;
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={width} height={height} viewBox="0 0 167 189" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* 배경 원 (회색) */}
      <circle cx={centerX} cy={centerY} r={radius} stroke="#E0E0E0" strokeWidth="8" fill="none" strokeLinecap="round" />
      {/* 진행률 원 (그라데이션) */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        stroke="url(#paint0_linear_progress)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${centerX} ${centerY})`}
        style={{
          transition: 'stroke-dashoffset 0.3s ease-in-out'
        }}
      />
      <defs>
        <linearGradient
          id="paint0_linear_progress"
          x1="36.5"
          y1="-13.5"
          x2="138"
          y2="185.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDF87" />
          <stop offset="1" stopColor="#FF7C2B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ProgressIcon;
