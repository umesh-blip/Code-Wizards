# 🤖 Gemini API Setup Guide for WizCare

This guide will help you set up the Gemini API integration to enable intelligent, empathetic responses in WizCare.

## 🔑 Getting Your Gemini API Key

### Step 1: Access Google AI Studio
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" or use an existing one

### Step 2: Copy Your API Key
1. Your API key will look like: `AIzaSyC...` (long string)
2. Copy it to your clipboard
3. Keep it secure - don't share it publicly

## 🛠️ Local Development Setup

### Step 1: Create Environment File
1. In your project root, create a file named `.env`
2. Add your API key:
```bash
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

### Step 2: Restart Development Server
```bash
npm start
```

### Step 3: Test the Integration
1. Open the app in your browser
2. Try sending a message
3. You should see intelligent responses from Gemini

## 🌐 Production Deployment (Render)

### Step 1: Add Environment Variable in Render
1. Go to your Render dashboard
2. Select your WizCare site
3. Go to "Environment" tab
4. Add new environment variable:
   - **Key**: `REACT_APP_GEMINI_API_KEY`
   - **Value**: Your Gemini API key
5. Click "Save Changes"

### Step 2: Redeploy
1. Render will automatically redeploy
2. Wait for the build to complete
3. Test your live site

## 🔧 Configuration Options

### Environment Variables
You can customize the Gemini API behavior:

```bash
# Required
REACT_APP_GEMINI_API_KEY=your_api_key

# Optional (defaults shown)
REACT_APP_GEMINI_MODEL=gemini-pro
REACT_APP_GEMINI_TEMPERATURE=0.7
REACT_APP_GEMINI_MAX_TOKENS=150
```

### API Settings Explained
- **Temperature**: Controls response creativity (0.0 = focused, 1.0 = creative)
- **Max Tokens**: Maximum response length
- **Model**: Currently uses gemini-pro for best results

## 🧪 Testing the Integration

### Test Scenarios
1. **Normal Conversation**: "I'm feeling a bit stressed today"
2. **Crisis Detection**: "I'm thinking about ending it all"
3. **Mood Support**: "I'm really happy about something"
4. **Anxiety**: "I'm worried about my future"

### Expected Behavior
- **Intelligent Responses**: Context-aware, empathetic replies
- **Stress Detection**: Automatic stress level updates
- **Crisis Response**: Emergency resources for crisis situations
- **Fallback**: Predefined responses if API fails

## 🔒 Security & Privacy

### API Key Security
- ✅ **Environment Variables**: API key stored securely
- ✅ **Client-Side Only**: No server-side storage
- ✅ **No Logging**: API calls not logged permanently
- ✅ **Rate Limiting**: Built-in API rate limiting

### Data Privacy
- ✅ **No Storage**: Conversations not stored permanently
- ✅ **Temporary Context**: Only last 10 messages for context
- ✅ **Anonymous**: No personal data collected
- ✅ **Local Processing**: All analysis happens client-side

## 🚨 Troubleshooting

### Common Issues

#### API Key Not Working
- **Error**: "Invalid API key"
- **Solution**: Check your API key in environment variables
- **Verify**: Key starts with "AIzaSy"

#### No Responses
- **Error**: "Failed to fetch"
- **Solution**: Check internet connection
- **Fallback**: App will use predefined responses

#### Rate Limiting
- **Error**: "Quota exceeded"
- **Solution**: Check your Google AI Studio quota
- **Alternative**: Use fallback responses temporarily

#### Build Errors
- **Error**: "Environment variable not found"
- **Solution**: Ensure `.env` file is in project root
- **Verify**: Variable name starts with `REACT_APP_`

### Debug Mode
Enable debug logging by adding to your browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## 📊 API Usage Monitoring

### Google AI Studio Dashboard
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Check your API usage and quotas
3. Monitor for any rate limiting

### Cost Management
- **Free Tier**: 15 requests per minute
- **Paid Tier**: $0.0005 per 1K characters
- **Monitoring**: Track usage in Google AI Studio

## 🔄 Updating API Key

### Local Development
1. Update `.env` file with new key
2. Restart development server
3. Test the integration

### Production (Render)
1. Go to Render dashboard
2. Update environment variable
3. Redeploy automatically

## 🎯 Best Practices

### API Key Management
- 🔐 **Never commit API keys** to version control
- 🔐 **Use environment variables** for all deployments
- 🔐 **Rotate keys regularly** for security
- 🔐 **Monitor usage** to prevent abuse

### Response Quality
- 🎯 **Context Awareness**: Uses conversation history
- 🎯 **Stress Level Integration**: Considers user's stress state
- 🎯 **Safety First**: Built-in safety filters
- 🎯 **Empathy Focus**: Warm, supportive tone

### Performance
- ⚡ **Fast Responses**: Optimized for quick replies
- ⚡ **Fallback System**: Works without API
- ⚡ **Error Handling**: Graceful degradation
- ⚡ **Caching**: Efficient conversation management

## 🆘 Support

### Google AI Studio Support
- [API Documentation](https://ai.google.dev/docs)
- [Pricing Information](https://ai.google.dev/pricing)
- [Quota Management](https://makersuite.google.com/app/apikey)

### WizCare Support
- Check the main README.md for general issues
- Review DEPLOYMENT.md for deployment problems
- Open GitHub issues for bugs or feature requests

## 🎉 Success!

Once configured, WizCare will provide:
- 🤖 **Intelligent Responses**: Context-aware conversations
- 💙 **Empathetic Support**: Warm, understanding replies
- 🚨 **Crisis Detection**: Automatic emergency resources
- 🔄 **Seamless Fallback**: Works even if API is unavailable

Your users will experience a much more natural and supportive conversation with the Gemini AI integration! 🌟

---

**Remember**: The Gemini API enhances WizCare's capabilities, but the app works perfectly without it using predefined responses. The integration is designed to be robust and user-friendly.
