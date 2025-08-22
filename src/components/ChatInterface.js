import React, { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ messages, onSendMessage, isTyping, quickResponses }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleQuickResponse = (response) => {
    onSendMessage(response);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <div className="welcome-content">
              <h2>Welcome to WizCare 💙</h2>
              <p>I'm here to listen and support you. Feel free to share what's on your mind.</p>
              <div className="quick-start">
                <p>Quick start:</p>
                <div className="quick-buttons">
                  {quickResponses.map((response, index) => (
                    <button
                      key={index}
                      className="quick-response-btn"
                      onClick={() => handleQuickResponse(response)}
                    >
                      {response}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">{message.timestamp}</span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="chat-input"
              rows="1"
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputMessage.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9"></polygon>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
