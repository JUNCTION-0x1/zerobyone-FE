import React from 'react';

const BatteryIcon = ({ width = 28, height = 13, fill = 'black', ...props }) => (
  <svg width={width} height={height} viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      opacity="0.35"
      d="M4.29944 0.5H21.2994C23.2324 0.5 24.7994 2.067 24.7994 4V9C24.7994 10.933 23.2324 12.5 21.2994 12.5H4.29944C2.36644 12.5 0.799438 10.933 0.799438 9V4C0.799438 2.067 2.36644 0.5 4.29944 0.5Z"
      stroke={fill}
    />
    <path
      opacity="0.4"
      d="M26.2994 5V9.22034C27.1485 8.86291 27.7006 8.0314 27.7006 7.11017C27.7006 6.18894 27.1485 5.35744 26.2994 5Z"
      fill={fill}
    />
    <path
      d="M2.29944 4C2.29944 2.89543 3.19487 2 4.29944 2H21.2994C22.404 2 23.2994 2.89543 23.2994 4V9C23.2994 10.1046 22.404 11 21.2994 11H4.29944C3.19487 11 2.29944 10.1046 2.29944 9V4Z"
      fill={fill}
    />
  </svg>
);

export default BatteryIcon;
