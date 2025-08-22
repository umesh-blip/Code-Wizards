import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import StressMeter from './components/StressMeter';
import EmergencyPanel from './components/EmergencyPanel';
import WellnessTools from './components/WellnessTools';
import Disclaimer from './components/Disclaimer';
import Header from './components/Header';
import geminiService from './services/geminiService';

function App() {
  const [messages, setMessages] = useState([]);
  const [stressLevel, setStressLevel] = useState(0);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // Pre-defined responses for the chatbot
  const botResponses = {
    greeting: [
      "Hi there! I'm WizCare, your mental health companion. How are you feeling today? 💙",
      "Hello! I'm here to listen and support you. What's on your mind? 🌸",
      "Welcome! I'm WizCare, ready to chat whenever you need someone to talk to. 💜"
    ],
    stress: [
      "I hear you, that sounds really tough. 💙",
      "Stress can be overwhelming, but you're not alone in this.",
      "It's okay to feel this way. Want to talk more about what's stressing you?"
    ],
    anxiety: [
      "Anxiety can feel really scary, but you're doing great by reaching out.",
      "I understand how challenging anxiety can be. You're not alone.",
      "That must be really difficult. I'm here to listen and support you."
    ],
    burnout: [
      "Burnout is real and it's okay to feel exhausted. You deserve rest.",
      "I can see you've been through a lot. It's okay to take a step back.",
      "You've been pushing yourself hard. Remember, it's okay to slow down."
    ],
    crisis: [
      "I'm really concerned about what you're sharing. You're not alone, and there are people who can help right now.",
      "This sounds really serious. Please know that help is available 24/7.",
      "I want you to be safe. There are professionals ready to support you immediately."
    ]
  };

  // Stress detection function
  const detectStressLevel = (text) => {
    const lowerText = text.toLowerCase();
    let level = 0;

    // Crisis keywords (very high stress)
    const crisisKeywords = ['death', 'dying', 'kill', 'suicide', 'end it all', 'want to die', 'better off dead'];
    if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
      return 4; // Very high
    }

    // High stress keywords
    const highStressKeywords = ['overwhelmed', 'can\'t take it', 'hopeless', 'worthless', 'alone', 'nobody cares'];
    if (highStressKeywords.some(keyword => lowerText.includes(keyword))) {
      level = Math.max(level, 3);
    }

    // Medium stress keywords
    const mediumStressKeywords = ['stressed', 'anxious', 'worried', 'tired', 'exhausted', 'burnout'];
    if (mediumStressKeywords.some(keyword => lowerText.includes(keyword))) {
      level = Math.max(level, 2);
    }

    // Low stress keywords
    const lowStressKeywords = ['okay', 'fine', 'alright', 'good', 'better'];
    if (lowStressKeywords.some(keyword => lowerText.includes(keyword))) {
      level = Math.max(level, 1);
    }

    return level;
  };

  // Generate bot response using Gemini API
  const generateBotResponse = async (userMessage, stressLevel) => {
    setIsTyping(true);
    
    try {
      // Use Gemini API for intelligent responses
      const response = await geminiService.generateResponse(userMessage, stressLevel);
      
      // Show emergency panel for crisis situations
      if (stressLevel === 4) {
        setShowEmergency(true);
      }

      const botMessage = {
        id: Date.now(),
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Fallback to predefined responses if Gemini fails
      let fallbackResponse;
      if (stressLevel === 4) {
        fallbackResponse = botResponses.crisis[Math.floor(Math.random() * botResponses.crisis.length)];
        setShowEmergency(true);
      } else if (stressLevel >= 3) {
        fallbackResponse = botResponses.stress[Math.floor(Math.random() * botResponses.stress.length)];
      } else if (stressLevel >= 2) {
        fallbackResponse = botResponses.anxiety[Math.floor(Math.random() * botResponses.anxiety.length)];
      } else if (stressLevel >= 1) {
        fallbackResponse = botResponses.burnout[Math.floor(Math.random() * botResponses.burnout.length)];
      } else {
        fallbackResponse = botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
      }

      const botMessage = {
        id: Date.now(),
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle user message
  const handleUserMessage = (message) => {
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    
    const detectedStressLevel = detectStressLevel(message);
    setStressLevel(detectedStressLevel);
    
    generateBotResponse(message, detectedStressLevel);
  };

  // Quick response buttons
  const quickResponses = [
    "I'm feeling stressed",
    "I'm anxious",
    "I'm exhausted",
    "I'm okay",
    "I need help"
  ];

  return (
    <div className="App">
      {showDisclaimer && (
        <Disclaimer onClose={() => setShowDisclaimer(false)} />
      )}
      
      <Header />
      
      <div className="main-container">
        <div className="chat-section">
          <StressMeter level={stressLevel} />
          
          <ChatInterface 
            messages={messages}
            onSendMessage={handleUserMessage}
            isTyping={isTyping}
            quickResponses={quickResponses}
          />
        </div>
        
        <div className="sidebar">
          <WellnessTools />
          
          {showEmergency && (
            <EmergencyPanel onClose={() => setShowEmergency(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
