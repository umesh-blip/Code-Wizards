# 🔧 Deployment Troubleshooting Guide

## 🚨 AI Not Responding on Render - Quick Fix

If your AI chatbot isn't responding when deployed on Render, follow these steps:

### 1. **Check Environment Variables in Render**

**This is the most common cause of the issue!**

1. Go to your Render dashboard
2. Click on your deployed site
3. Go to **"Environment"** tab
4. Add this environment variable:
   - **Key**: `REACT_APP_GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
5. Click **"Save Changes"**
6. **Redeploy** your site

### 2. **Get Your Gemini API Key**

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key
5. Add it to Render environment variables

### 3. **Verify API Key Format**

Your API key should look like: `AIzaSyC...` (starts with "AIza")

### 4. **Check Browser Console**

1. Open your deployed site
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for these messages:
   - ✅ `Gemini API key found in environment variables.` = Good
   - ⚠️ `REACT_APP_GEMINI_API_KEY not found` = Problem
   - 🚫 `Gemini API key not configured` = Problem

### 5. **Test API Key Locally**

Create a `.env` file in your project root:
```
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

Then run:
```bash
npm start
```

If it works locally but not on Render, it's an environment variable issue.

## 🔍 Common Issues & Solutions

### Issue 1: "API key not configured"
**Solution**: Add `REACT_APP_GEMINI_API_KEY` to Render environment variables

### Issue 2: "CORS error"
**Solution**: This is normal - the app uses fallback responses when API fails

### Issue 3: "Build fails"
**Solution**: Check that all dependencies are in `package.json`

### Issue 4: "Site loads but AI doesn't respond"
**Solution**: Check browser console for error messages

## 🛠️ Manual Testing Steps

1. **Test Fallback Responses**:
   - Deploy without API key
   - Chat should still work with predefined responses
   - Check console for warning messages

2. **Test with API Key**:
   - Add API key to environment variables
   - Redeploy
   - Chat should use intelligent AI responses
   - Check console for success messages

3. **Test Error Handling**:
   - Use invalid API key
   - App should fall back to predefined responses
   - No crashes should occur

## 📱 Mobile Testing

- Test on mobile devices
- Check if chat interface works on small screens
- Verify emergency panel is accessible

## 🔄 Redeployment Process

1. Make changes to environment variables
2. Click **"Manual Deploy"** in Render
3. Wait for build to complete
4. Test the site
5. Check browser console for status messages

## 📞 Still Having Issues?

1. **Check Render Logs**: Look at build logs for errors
2. **Verify API Key**: Make sure it's valid and active
3. **Test Locally**: Ensure it works on your machine
4. **Check Network**: Ensure your site can make external API calls

## 🎯 Quick Checklist

- [ ] Gemini API key added to Render environment variables
- [ ] API key is valid and active
- [ ] Site redeployed after adding environment variables
- [ ] Browser console shows success messages
- [ ] Chat interface responds to messages
- [ ] Fallback responses work when API is unavailable

## 💡 Pro Tips

1. **Always test locally first** with a `.env` file
2. **Use browser console** to debug deployment issues
3. **Keep API keys secure** - never commit them to Git
4. **Monitor Render logs** for build and runtime errors
5. **Test on multiple devices** to ensure compatibility

---

**Remember**: The app is designed to work even without the API key using fallback responses. If you see fallback responses, it means the API key isn't configured properly.
