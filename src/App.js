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
      "Welcome! I'm WizCare, ready to chat whenever you need someone to talk to. 💜",
      "Hey there! I'm your AI companion here to support your mental wellness journey. How's your day going? 🌟",
      "Hi! I'm WizCare, and I'm here to listen without judgment. What would you like to share? 💙",
      "Welcome to WizCare! I'm ready to be your supportive companion today. How are you feeling? 💜"
    ],
    stress: [
      "I hear you, that sounds really tough. 💙",
      "Stress can be overwhelming, but you're not alone in this.",
      "It's okay to feel this way. Want to talk more about what's stressing you?",
      "I understand that stress can feel heavy sometimes. Would you like to talk about what's been on your mind? 🌟",
      "It's completely normal to feel stressed, and it's brave of you to reach out. What's been troubling you? 💙",
      "Stress affects us all differently, and it's okay to not be okay. I'm here to listen to whatever you want to share. 🌸",
      "Sometimes just talking about what's stressing us can help lighten the load. What's been on your mind? 💜"
    ],
    anxiety: [
      "Anxiety can feel really scary, but you're doing great by reaching out.",
      "I understand how challenging anxiety can be. You're not alone.",
      "That must be really difficult. I'm here to listen and support you.",
      "Anxiety can be overwhelming, but you're taking a great step by talking about it. 💙",
      "I hear how anxiety can make everything feel uncertain. You're not alone in this struggle. 🌸",
      "It's brave of you to share your anxiety with me. What's been making you feel anxious lately? 💜",
      "Anxiety can feel like a heavy weight, but you don't have to carry it alone. I'm here to listen. 🌟"
    ],
    burnout: [
      "Burnout is real and it's okay to feel exhausted. You deserve rest.",
      "I can see you've been through a lot. It's okay to take a step back.",
      "You've been pushing yourself hard. Remember, it's okay to slow down.",
      "Burnout can make you feel like you're running on empty. You deserve to take care of yourself. 💙",
      "It sounds like you've been giving so much of yourself. It's time to give yourself permission to rest. 🌸",
      "You've been working so hard, and it's completely understandable to feel burned out. What would help you feel better? 💜",
      "Burnout is your body and mind telling you to slow down. You don't have to keep pushing through. 🌟"
    ],
    crisis: [
      "I'm really concerned about what you're sharing. You're not alone, and there are people who can help right now.",
      "This sounds really serious. Please know that help is available 24/7.",
      "I want you to be safe. There are professionals ready to support you immediately.",
      "I'm deeply worried about what you're going through. Your life has value, and there are people who want to help you.",
      "What you're experiencing sounds like a crisis, and I want you to know that professional help is available right now.",
      "I can hear how much pain you're in, and I want you to know that you don't have to face this alone. Help is here.",
      "Your feelings are valid, and what you're going through is serious. Please reach out to a crisis helpline right now."
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
    const highStressKeywords = ['overwhelmed', 'can\'t take it', 'hopeless', 'worthless', 'alone', 'nobody cares', 'cry', 'crying', 'sad', 'depressed', 'miserable', 'terrible', 'awful', 'hate', 'desperate'];
    if (highStressKeywords.some(keyword => lowerText.includes(keyword))) {
      level = Math.max(level, 3);
    }

    // Medium stress keywords
    const mediumStressKeywords = ['stressed', 'anxious', 'worried', 'tired', 'exhausted', 'burnout', 'upset', 'frustrated', 'annoyed', 'angry', 'mad', 'confused', 'lost'];
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
