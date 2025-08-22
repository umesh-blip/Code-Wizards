# WizCare - AI Mental Health Companion Chatbot

WizCare is an AI-powered mental health companion chatbot designed to provide emotional support, detect early signs of stress and anxiety, and offer wellness tools to users. Built with React and featuring a beautiful, calming UI.

## 🌟 Features

### 🤖 AI Chatbot
- **Gemini AI Integration**: Intelligent, context-aware responses using Google's Gemini API
- **Empathetic Conversations**: Human-like responses that feel supportive and caring
- **Stress Detection**: AI-powered analysis to detect stress levels from text
- **Quick Response Buttons**: Pre-defined responses for easy interaction
- **Typing Indicators**: Natural conversation flow with typing animations
- **Fallback System**: Works perfectly even without API key

### 📊 Stress Monitoring
- **Real-time Stress Meter**: Visual indicator showing current stress level (Low, Medium, High, Very High)
- **Crisis Detection**: Automatically detects crisis keywords and triggers emergency alerts
- **Stress Level Categories**: Color-coded stress levels with emoji indicators

### 🚨 Emergency Support
- **Crisis Helpline Integration**: Direct access to helpline number 14416
- **Emergency Panel**: Automatic display when very high stress is detected
- **Resource Links**: Quick access to mental health websites and resources
- **Multiple Contact Options**: Phone, text, and emergency services

### 🧘 Wellness Tools
- **Mood Check-in**: Daily mood tracking with emoji-based interface
- **Journaling**: Private space to write thoughts and feelings
- **Guided Breathing**: Interactive breathing exercises (4-7-8, Box Breathing, Deep Breathing)
- **Breathing Animations**: Visual breathing circle with color-coded phases

### 🎨 Beautiful UI/UX
- **Calming Design**: Soft pastel colors (light blue, lavender, green)
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Gentle transitions and hover effects
- **Accessibility**: Focus states and keyboard navigation support

### ⚠️ Safety Features
- **Comprehensive Disclaimer**: Clear warnings about limitations
- **Medical Disclaimer**: Emphasizes that it's not a replacement for professional care
- **Emergency Alerts**: Prominent crisis resources when needed
- **Privacy Focus**: Conversations not permanently stored

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Gemini API key (optional, for enhanced responses)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wizcare-mental-health-bot.git
   cd wizcare-mental-health-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Optional: Enable Gemini AI
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the project root
3. Add: `REACT_APP_GEMINI_API_KEY=your_api_key_here`
4. Restart the development server
5. See `GEMINI_SETUP.md` for detailed instructions

### Building for Production

```bash
npm run build
```

## 🌐 Deployment on Render

### Step 1: Prepare Your Repository
1. Push your code to a GitHub repository
2. Ensure your repository is public or connected to Render

### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Static Site"
3. Connect your GitHub repository
4. Configure the build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
   - **Environment**: Node.js

### Step 3: Environment Variables (Optional)
No environment variables are required for basic functionality.

### Step 4: Deploy
Click "Create Static Site" and wait for the deployment to complete.

## 🛠️ Technology Stack

- **Frontend**: React 18
- **AI Integration**: Google Gemini API for intelligent responses
- **Styling**: CSS3 with custom animations
- **Icons**: Lucide React
- **Animations**: CSS animations and transitions
- **Deployment**: Render (Static Site)

## 📱 Features in Detail

### Stress Detection Algorithm
The chatbot analyzes user messages for:
- **Crisis Keywords**: death, dying, kill, suicide, etc. (Very High Stress)
- **High Stress**: overwhelmed, hopeless, alone, etc. (High Stress)
- **Medium Stress**: stressed, anxious, worried, etc. (Medium Stress)
- **Low Stress**: okay, fine, good, etc. (Low Stress)

### Emergency Response System
When crisis keywords are detected:
1. Emergency panel automatically appears
2. Helpline numbers are prominently displayed
3. Crisis resources are immediately accessible
4. User is encouraged to seek professional help

### Wellness Tools
- **Mood Tracking**: 5 different mood states with color coding
- **Journaling**: Private text area for thoughts and feelings
- **Breathing Exercises**: 3 different patterns with visual guidance

## 🔒 Privacy & Safety

- **No Data Storage**: Conversations are not permanently stored
- **Client-Side Only**: All processing happens in the browser
- **No Personal Data**: No collection of personal information
- **Emergency Focus**: Prioritizes user safety with crisis resources

## 📞 Emergency Resources

- **National Crisis Helpline**: 14416
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911
- **Mental Health Websites**: Links to official resources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Disclaimer

**WizCare is NOT a replacement for professional medical care.** This chatbot is designed to provide emotional support and general wellness guidance only. For mental health crises or medical concerns, please contact qualified healthcare professionals or emergency services immediately.

## 🙏 Acknowledgments

- Mental health professionals for guidance on appropriate responses
- Crisis helpline organizations for providing emergency resources
- The React community for excellent documentation and tools

---

**Remember**: Your mental health matters. Don't hesitate to reach out to professionals when you need help. 💙
