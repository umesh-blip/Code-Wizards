import React from 'react';
import './StressMeter.css';

const StressMeter = ({ level }) => {
  const stressLevels = [
    { name: 'Low', color: '#48bb78', emoji: '😊' },
    { name: 'Medium', color: '#ed8936', emoji: '😐' },
    { name: 'High', color: '#e53e3e', emoji: '😰' },
    { name: 'Very High', color: '#9b2c2c', emoji: '😨' }
  ];

  const currentLevel = stressLevels[level - 1] || stressLevels[0];

  return (
    <div className="stress-meter">
      <div className="stress-meter-header">
        <h3>Stress Level</h3>
        <span className="stress-emoji">{currentLevel.emoji}</span>
      </div>
      
      <div className="stress-meter-bar">
        <div 
          className="stress-meter-fill"
          style={{ 
            width: `${(level / 4) * 100}%`,
            backgroundColor: currentLevel.color
          }}
        ></div>
      </div>
      
      <div className="stress-meter-labels">
        {stressLevels.map((stress, index) => (
          <span 
            key={index}
            className={`stress-label ${level === index + 1 ? 'active' : ''}`}
            style={{ color: level === index + 1 ? stress.color : '#a0aec0' }}
          >
            {stress.name}
          </span>
        ))}
      </div>
      
      {level > 0 && (
        <div className="stress-level-info">
          <p>Current: <strong style={{ color: currentLevel.color }}>{currentLevel.name}</strong></p>
        </div>
      )}
    </div>
  );
};

export default StressMeter;
