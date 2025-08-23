import React from 'react';

const StatusBar = () => {
  return (
    <div style={{
      width: '100%', 
      height: '59px', 
      position: 'absolute', 
      left: 0, 
      top: 0, 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      padding: '0 20px 8px 20px',
      boxSizing: 'border-box'
    }}>
      {/* Time */}
      <div style={{ width: 54, textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'SF Pro Text', fontWeight: '600' }}>
        9:41
      </div>
      
      {/* Dynamic Island */}
      <div style={{ width: 125, height: 37, background: 'black', borderRadius: 100 }} />

      {/* Icons */}
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {/* Cellular Icon Placeholder */}
        <img src="/icons/cellular.svg" alt="cellular" style={{width: 18, height: 12}} />
        {/* Wifi Icon Placeholder */}
        <img src="/icons/wifi.svg" alt="wifi" style={{width: 18, height: 12}} />
        {/* Battery Icon Placeholder */}
        <div style={{ width: 28, height: 13, border: '1px solid black', borderRadius: 4, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 2, left: 2, width: 22, height: 9, background: 'black', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
