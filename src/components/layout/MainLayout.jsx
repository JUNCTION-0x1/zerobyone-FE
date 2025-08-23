import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="app-frame">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
