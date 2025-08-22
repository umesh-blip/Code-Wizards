// Gemini API Service for WizCare Mental Health Chatbot
// Uses environment variable for API key

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.conversationHistory = [];
    
    // Debug logging for deployment troubleshooting
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      console.warn('⚠️ REACT_APP_GEMINI_API_KEY not found in environment variables. Using fallback responses.');
    } else {
      console.log('✅ Gemini API key found in environment variables.');
    }
  }

  // Add conversation context for better responses
  addToHistory(role, content) {
    this.conversationHistory.push({ role, content });
    // Keep only last 10 messages to manage context length
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }
  }

  // Generate empathetic response using Gemini
  async generateResponse(userMessage, stressLevel) {
    try {
      // Check if API key is properly configured
      if (!process.env.REACT_APP_GEMINI_API_KEY || this.apiKey === 'YOUR_GEMINI_API_KEY') {
        console.warn('🚫 Gemini API key not configured. Using fallback responses.');
        return this.getFallbackResponse(stressLevel);
      }

      // Add user message to history
      this.addToHistory('user', userMessage);

      // Create context-aware prompt
      const prompt = this.createPrompt(userMessage, stressLevel);

      console.log('📡 Making API request to Gemini...');

      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 150,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      console.log('📥 API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Gemini API error:', response.status, errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ API Response received successfully');
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const geminiResponse = data.candidates[0].content.parts[0].text.trim();
        
        // Add bot response to history
        this.addToHistory('assistant', geminiResponse);
        
        return geminiResponse;
      } else {
        console.error('❌ Invalid response format from Gemini API:', data);
        throw new Error('Invalid response format from Gemini API');
      }

    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      // Fallback to predefined responses if API fails
      return this.getFallbackResponse(stressLevel);
    }
  }

  // Create context-aware prompt for Gemini
  createPrompt(userMessage, stressLevel) {
    const stressContext = this.getStressContext(stressLevel);
    
    return `You are WizCare, an empathetic AI mental health companion. Your role is to provide emotional support, active listening, and gentle guidance.

IMPORTANT CONTEXT:
- User's current stress level: ${stressContext}
- You are NOT a medical professional and cannot provide medical advice
- Always encourage professional help for serious mental health concerns
- Keep responses warm, supportive, and under 100 words
- Use a caring, friend-like tone with appropriate emojis

CONVERSATION HISTORY:
${this.conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

USER'S MESSAGE: "${userMessage}"

Please respond as WizCare with empathy and support, considering the stress level and conversation context. If this is a crisis situation (stress level: Very High), immediately provide crisis resources and encourage professional help.`;
  }

  // Get stress level context for better responses
  getStressContext(stressLevel) {
    const contexts = {
      0: 'No stress detected',
      1: 'Low stress - user seems generally okay',
      2: 'Medium stress - user is experiencing some anxiety or worry',
      3: 'High stress - user is feeling overwhelmed or distressed',
      4: 'Very High stress - potential crisis situation requiring immediate attention'
    };
    return contexts[stressLevel] || contexts[0];
  }

  // Fallback responses if API fails
  getFallbackResponse(stressLevel) {
    const fallbackResponses = {
      0: [
        "Hi there! I'm WizCare, your mental health companion. How are you feeling today? 💙",
        "Hello! I'm here to listen and support you. What's on your mind? 🌸",
        "Welcome to WizCare! I'm ready to chat whenever you need someone to talk to. 💜",
        "Hey there! I'm your AI companion here to support your mental wellness journey. How's your day going? 🌟",
        "Hi! I'm WizCare, and I'm here to listen without judgment. What would you like to share? 💙"
      ],
      1: [
        "I'm glad you're feeling okay! Is there anything you'd like to talk about? 😊",
        "That's great to hear! I'm here if you need someone to chat with. 💜",
        "It's wonderful that you're doing well! Sometimes it's nice to just have someone to talk to. 🌸",
        "That's fantastic! Even on good days, it's perfectly fine to want to chat. What's on your mind? 💙",
        "I'm happy you're feeling good! Is there anything you'd like to discuss or any thoughts you want to share? ✨"
      ],
      2: [
        "I hear you're feeling a bit stressed. Want to talk more about what's on your mind? 💙",
        "It's okay to feel this way. I'm here to listen and support you. 🌸",
        "Stress can be really overwhelming, but you're not alone in this. What's been causing you stress lately? 💜",
        "I understand that stress can feel heavy sometimes. Would you like to talk about what's been on your mind? 🌟",
        "It's completely normal to feel stressed, and it's brave of you to reach out. What's been troubling you? 💙",
        "Stress affects us all differently, and it's okay to not be okay. I'm here to listen to whatever you want to share. 🌸",
        "Sometimes just talking about what's stressing us can help lighten the load. What's been on your mind? 💜"
      ],
      3: [
        "I can see you're going through a tough time. You're not alone in this. 💙",
        "That sounds really difficult. I'm here to listen and support you through this. 💜",
        "I hear how much you're struggling, and I want you to know that your feelings are valid. What's been happening? 🌸",
        "It sounds like you're carrying a heavy burden right now. You don't have to carry it alone. 💙",
        "I can feel the weight of what you're going through. It's okay to not be strong all the time. 🌟",
        "What you're experiencing sounds really challenging. I'm here to listen and support you through this difficult time. 💜",
        "Your pain is real, and it matters. You don't have to face this alone. What would help you feel supported right now? 💙",
        "I can sense how overwhelmed you must be feeling. It's okay to take things one moment at a time. 🌸"
      ],
      4: [
        "I'm really concerned about what you're sharing. You're not alone, and there are people who can help right now.",
        "This sounds really serious. Please know that help is available 24/7. You matter. 💙",
        "I'm deeply worried about what you're going through. Your life has value, and there are people who want to help you.",
        "What you're experiencing sounds like a crisis, and I want you to know that professional help is available right now.",
        "I can hear how much pain you're in, and I want you to know that you don't have to face this alone. Help is here.",
        "Your feelings are valid, and what you're going through is serious. Please reach out to a crisis helpline right now.",
        "I'm concerned about your safety. You matter, and there are people who can help you through this difficult time.",
        "What you're sharing sounds like a mental health emergency. Please know that professional support is available 24/7."
      ]
    };

    const responses = fallbackResponses[stressLevel] || fallbackResponses[0];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }
}

export default new GeminiService();
