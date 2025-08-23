import React from 'react';

const ProgressIcon = ({ width = 180, height = 180, progress = 0, ...props }) => {
  // 원의 중심과 반지름 계산 (마이크 버튼 148x148 주위에 맞춤)
  const centerX = 90;
  const centerY = 90;
  const radius = 80; // 마이크 버튼(74px radius) + 여백
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={width} height={height} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* 배경 원 (연한 회색) */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        stroke="#E8E8E8"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* 진행률 원 (주황색 그라데이션) */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        stroke="url(#paint0_linear_progress)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${centerX} ${centerY})`}
        style={{
          transition: 'stroke-dashoffset 0.1s linear'
        }}
      />
      <defs>
        <linearGradient id="paint0_linear_progress" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDF87" />
          <stop offset="0.5" stopColor="#FFA54B" />
          <stop offset="1" stopColor="#FF7C2B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ProgressIcon;
