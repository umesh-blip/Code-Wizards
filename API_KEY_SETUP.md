# 🔑 Fix Your AI Responses - API Key Setup Guide

## 🚨 Current Issue
Your AI is giving generic fallback responses instead of intelligent AI responses. This happens when the Gemini API key isn't configured in Render.

## ✅ Quick Fix Steps

### Step 1: Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key (starts with "AIzaSyC...")

### Step 2: Add to Render Environment Variables
1. Go to your [Render Dashboard](https://dashboard.render.com)
2. Click on your deployed site
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add:
   - **Key**: `REACT_APP_GEMINI_API_KEY`
   - **Value**: Your copied API key
6. Click **"Save Changes"**

### Step 3: Redeploy Your Site
1. In Render dashboard, click **"Manual Deploy"**
2. Wait for build to complete
3. Test your site

## 🔍 Verify It's Working

### Check Browser Console
1. Open your deployed site
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for these messages:
   - ✅ `Gemini API key found in environment variables.` = **SUCCESS**
   - ⚠️ `REACT_APP_GEMINI_API_KEY not found` = **Still needs API key**
   - 🚫 `Gemini API key not configured` = **Still needs API key**

### Test the Chat
- **Before**: Generic responses like "Hello! I'm here to listen and support you. 🌸"
- **After**: Intelligent, contextual responses that understand your specific situation

## 🛠️ Local Testing

Create a `.env` file in your project root:
```
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

Then run:
```bash
npm start
```

## 📱 What You'll See

### Before (Fallback Responses):
- Generic, repetitive messages
- Same responses regardless of what you say
- No context awareness

### After (Intelligent AI):
- Personalized responses based on your messages
- Context-aware conversations
- Empathetic and supportive language
- Different responses for different stress levels

## 🔧 Troubleshooting

### Issue: "API key not found"
**Solution**: Make sure you added `REACT_APP_GEMINI_API_KEY` (exact spelling) to Render

### Issue: "Invalid API key"
**Solution**: Get a fresh API key from Google AI Studio

### Issue: "CORS error"
**Solution**: This is normal - the app will use fallback responses

### Issue: "Build fails"
**Solution**: Check that the environment variable name is exactly `REACT_APP_GEMINI_API_KEY`

## 🎯 Expected Results

Once configured correctly, your AI will:
- ✅ Respond intelligently to specific messages
- ✅ Understand context and conversation history
- ✅ Provide empathetic, personalized support
- ✅ Adapt responses based on stress level detection
- ✅ Give different responses for different situations

## 💡 Pro Tips

1. **Test locally first** with a `.env` file
2. **Check browser console** for status messages
3. **Redeploy after adding environment variables**
4. **Keep API key secure** - never commit to Git
5. **Monitor usage** - Google provides free tier with limits

## 🆘 Still Having Issues?

1. **Double-check the environment variable name**: Must be exactly `REACT_APP_GEMINI_API_KEY`
2. **Verify API key format**: Should start with "AIzaSyC..."
3. **Check Render logs**: Look for build or runtime errors
4. **Test API key locally**: Use the `.env` file method first

---

**Remember**: The app works without the API key using fallback responses, but for intelligent AI responses, you need the API key properly configured in Render's environment variables.
