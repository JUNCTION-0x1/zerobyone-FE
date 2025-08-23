import React from 'react';
import { SignalIcon, WifiIcon, BatteryIcon } from '../../assets/icons';

const StatusBar = () => {
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
            borderRadius: 24
          }}
        >
          <div
            style={{
              width: 54,
              height: 20,
              left: 0,
              top: 1,
              position: 'absolute',
              textAlign: 'center',
              color: 'black',
              fontSize: 16,
              fontFamily: 'SF Pro Text',
              fontWeight: '600',
              lineHeight: 21,
              wordWrap: 'break-word'
            }}
          >
            9:41
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
