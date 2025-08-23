import React, { useState, useEffect } from 'react';
import { SignalIcon, WifiIcon, BatteryIcon } from '../../assets/icons';

const StatusBar = ({ timeFormat = '24h' }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      if (timeFormat === '12h') {
        // 12시간제 (AM/PM)
        const hours12 = now.getHours() % 12 || 12;
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        setCurrentTime(`${hours12}:${minutes} ${ampm}`);
      } else {
        // 24시간제 (기본값)
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}`);
      }
    };

    // 즉시 실행
    updateTime();

    // 1분마다 업데이트
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [timeFormat]);
  return (
    <div
      data-dark-mode="False"
      data-dyn-isl-size="Default"
      data-dynamic-island="True"
      style={{
        width: 393,
        height: 59,
        left: 0,
        top: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-end',
        display: 'inline-flex'
      }}
    >
      {/* Time Section */}
      <div
        style={{
          flex: '1 1 0',
          alignSelf: 'stretch',
          paddingBottom: 3,
          paddingLeft: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          display: 'inline-flex'
        }}
      >
        <div
          data-dark-mode="False"
          data-type="Default"
          style={{
            width: 54,
            height: 21,
            position: 'relative',
            borderRadius: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 16,
              fontFamily: 'SF Pro Text',
              fontWeight: '600',
              lineHeight: 21,
              wordWrap: 'break-word'
            }}
          >
            {currentTime}
          </div>
        </div>
      </div>

      {/* Dynamic Island Section */}
      <div
        style={{
          alignSelf: 'stretch',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'inline-flex'
        }}
      >
        <div
          data-type="Default"
          style={{
            width: 125,
            height: 37,
            position: 'relative',
            background: 'black',
            borderRadius: 100
          }}
        >
          <div
            style={{
              width: 80,
              height: 37,
              left: 0,
              top: 0,
              position: 'absolute',
              background: 'black',
              borderRadius: 100
            }}
          />
          <div
            style={{
              width: 37,
              height: 37,
              left: 88,
              top: 0,
              position: 'absolute',
              background: 'black',
              borderRadius: 100
            }}
          />
        </div>
      </div>

      {/* Icons Section */}
      <div
        style={{
          flex: '1 1 0',
          alignSelf: 'stretch',
          paddingRight: 11,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          display: 'flex'
        }}
      >
        <div
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 8,
            display: 'flex'
          }}
        >
          {/* Cellular Signal Icon */}
          <SignalIcon width={18} height={12} />

          {/* WiFi Icon */}
          <WifiIcon width={18} height={12} />

          {/* Battery Icon */}
          <BatteryIcon width={28} height={13} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
