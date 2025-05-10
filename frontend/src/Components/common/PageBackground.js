import React from 'react';
import './PageBackground.css';

const PageBackground = ({ pattern }) => {
  return (
    <div className="background-wrapper">
      <div className="gradient-background"></div>
      <div className="pattern-overlay" style={{ backgroundImage: pattern || 'none' }}></div>
      <div 
        className="circle" 
        style={{ top: '10%', right: '15%', width: '300px', height: '300px' }} 
      />
      <div 
        className="circle" 
        style={{ bottom: '10%', left: '5%', width: '400px', height: '400px' }} 
      />
      <div 
        className="circle" 
        style={{ top: '40%', left: '30%', width: '200px', height: '200px' }} 
      />
    </div>
  );
};

export default PageBackground;
