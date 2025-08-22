import React from 'react';
import './EmergencyPanel.css';

const EmergencyPanel = ({ onClose }) => {
  const emergencyResources = [
    {
      name: "National Crisis Helpline",
      number: "14416",
      description: "24/7 mental health crisis support",
      type: "primary"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free crisis counseling via text",
      type: "secondary"
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "For immediate emergency situations",
      type: "emergency"
    }
  ];

  const wellnessWebsites = [
    {
      name: "MentalHealth.gov",
      url: "https://www.mentalhealth.gov",
      description: "Official government mental health resources"
    },
    {
      name: "NIMH",
      url: "https://www.nimh.nih.gov",
      description: "National Institute of Mental Health"
    },
    {
      name: "Psychology Today",
      url: "https://www.psychologytoday.com",
      description: "Find therapists and mental health resources"
    }
  ];

  return (
    <div className="emergency-panel">
      <div className="emergency-header">
        <h3>🚨 Emergency Support Available</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="emergency-content">
        <div className="emergency-alert">
          <p>
            <strong>You're not alone.</strong> There are people ready to help you right now. 
            Please reach out to one of these resources:
          </p>
        </div>
        
        <div className="helpline-section">
          <h4>📞 Immediate Help</h4>
          <div className="helpline-cards">
            {emergencyResources.map((resource, index) => (
              <div key={index} className={`helpline-card ${resource.type}`}>
                <div className="helpline-info">
                  <h5>{resource.name}</h5>
                  <div className="helpline-number">{resource.number}</div>
                  <p>{resource.description}</p>
                </div>
                <div className="helpline-action">
                  {resource.type === 'primary' && (
                    <a 
                      href={`tel:${resource.number}`}
                      className="call-btn primary"
                    >
                      Call Now
                    </a>
                  )}
                  {resource.type === 'secondary' && (
                    <a 
                      href={`sms:${resource.number}`}
                      className="call-btn secondary"
                    >
                      Text Now
                    </a>
                  )}
                  {resource.type === 'emergency' && (
                    <a 
                      href={`tel:${resource.number}`}
                      className="call-btn emergency"
                    >
                      Emergency
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="websites-section">
          <h4>🌐 Online Resources</h4>
          <div className="website-links">
            {wellnessWebsites.map((website, index) => (
              <a
                key={index}
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="website-link"
              >
                <div className="website-info">
                  <h5>{website.name}</h5>
                  <p>{website.description}</p>
                </div>
                <span className="external-link">↗</span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="emergency-footer">
          <p>
            <strong>Remember:</strong> You matter, and help is always available. 
            Don't hesitate to reach out to these resources or talk to someone you trust.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPanel;
