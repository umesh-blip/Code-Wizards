import React from 'react';
import './Disclaimer.css';

const Disclaimer = ({ onClose }) => {
  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-modal">
        <div className="disclaimer-header">
          <h2>⚠️ Important Disclaimer</h2>
          <button className="disclaimer-close" onClick={onClose}>×</button>
        </div>
        
        <div className="disclaimer-content">
          <div className="disclaimer-section">
            <h3>🚨 Emergency Situations</h3>
            <p>
              <strong>WizCare is NOT a replacement for professional medical care.</strong> 
              If you are experiencing a mental health crisis or having thoughts of self-harm, 
              please contact emergency services immediately:
            </p>
            <div className="emergency-contact">
              <strong>National Crisis Helpline: 14416</strong>
            </div>
          </div>
          
          <div className="disclaimer-section">
            <h3>📋 What WizCare Can Do</h3>
            <ul>
              <li>Provide emotional support and active listening</li>
              <li>Offer general wellness tips and coping strategies</li>
              <li>Help you track your mood and stress levels</li>
              <li>Guide you through breathing exercises</li>
              <li>Encourage you to seek professional help when needed</li>
            </ul>
          </div>
          

          
          <div className="disclaimer-section warning">
            <h3>🔔 Important Reminders</h3>
            <ul>
              <li>Always consult with qualified healthcare professionals for medical concerns</li>
              <li>Don't rely solely on this chatbot for mental health treatment</li>
              <li>If you're in crisis, reach out to emergency services or crisis hotlines</li>
              <li>Your privacy is important - conversations are not stored permanently</li>
            </ul>
          </div>
          
          <div className="disclaimer-footer">
            <p>
              By using WizCare, you acknowledge that this is a supportive tool and not a 
              substitute for professional medical care. Your mental health matters - 
              please seek appropriate professional help when needed.
            </p>
          </div>
        </div>
        
        <div className="disclaimer-actions">
          <button className="disclaimer-btn primary" onClick={onClose}>
            I Understand - Continue to WizCare
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
