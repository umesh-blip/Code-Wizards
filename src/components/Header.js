import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">
            <span className="logo-text">🧠</span>
          </div>
          <div className="logo-text-container">
            <h1>WizCare</h1>
            <p>Mental Health Companion</p>
          </div>
        </div>
        <div className="header-info">
          <span className="status-indicator">
            <span className="status-dot"></span>
            Available 24/7
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
