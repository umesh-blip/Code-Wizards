# 🚀 Deployment Guide for WizCare

This guide will help you deploy WizCare to Render for free hosting.

## 📋 Prerequisites

1. **GitHub Account**: You need a GitHub account to host your code
2. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
3. **Node.js**: Make sure you have Node.js installed locally for testing

## 🔧 Step 1: Prepare Your Code

### 1.1 Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: WizCare mental health chatbot"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it `wizcare-mental-health-bot`
4. Make it **Public** (required for free Render deployment)
5. Don't initialize with README (we already have one)

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/wizcare-mental-health-bot.git
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Deploy on Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Verify your email address

### 2.2 Create New Static Site
1. In Render dashboard, click **"New +"**
2. Select **"Static Site"**
3. Connect your GitHub repository
4. Select the `wizcare-mental-health-bot` repository

### 2.3 Configure Build Settings
Fill in the following details:

- **Name**: `wizcare-mental-health-bot` (or any name you prefer)
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Environment**: `Node.js`

### 2.4 Environment Variables (Required for Gemini API)
1. Click on "Environment" section
2. Add the following environment variable:
   - **Key**: `REACT_APP_GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
3. Click "Save Changes"

### 2.5 Advanced Settings (Optional)
- **Auto-Deploy**: Enabled (recommended)
- **Branch**: `main`
- **Root Directory**: Leave empty (if your code is in the root)

### 2.5 Deploy
Click **"Create Static Site"** and wait for the deployment to complete.

## ✅ Step 3: Verify Deployment

### 3.1 Check Build Logs
- Monitor the build process in Render dashboard
- Look for any errors in the build logs
- Ensure the build completes successfully

### 3.2 Test Your Application
- Once deployed, Render will provide a URL (e.g., `https://wizcare.onrender.com`)
- Open the URL in your browser
- Test all features:
  - Chat functionality
  - Stress meter
  - Emergency panel
  - Wellness tools
  - Mobile responsiveness

### 3.3 Custom Domain (Optional)
If you want a custom domain:
1. Go to your site settings in Render
2. Click "Custom Domains"
3. Add your domain and follow the DNS instructions

## 🔧 Troubleshooting

### Common Issues

#### Build Fails
- **Error**: "Build command failed"
- **Solution**: Check that `package.json` has the correct build script
- **Verify**: `"build": "react-scripts build"` is in your package.json

#### Dependencies Missing
- **Error**: "Module not found"
- **Solution**: Ensure all dependencies are in `package.json`
- **Check**: Run `npm install` locally to verify

#### Static Files Not Found
- **Error**: "404 on assets"
- **Solution**: Verify `build` directory is specified correctly
- **Check**: Run `npm run build` locally to test

#### Environment Variables
- **Required**: `REACT_APP_GEMINI_API_KEY` for intelligent responses
- **Setup**: Add in Render dashboard under "Environment"
- **Fallback**: App works without API key using predefined responses

### Performance Optimization

#### Enable Caching
1. Go to your site settings in Render
2. Enable "Auto-Deploy from Git"
3. Configure cache headers for static assets

#### Optimize Images
- Use WebP format for images
- Compress images before adding to the project
- Consider using a CDN for large assets

## 📱 Mobile Testing

### Test on Different Devices
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: iPad, Android tablets

### Responsive Design
- Test the chat interface on small screens
- Verify stress meter is readable on mobile
- Check emergency panel accessibility

## 🔒 Security Considerations

### HTTPS
- Render automatically provides HTTPS
- No additional configuration needed

### Content Security Policy
- Consider adding CSP headers for production
- Test emergency features work correctly

### Privacy
- No user data is stored permanently
- All processing happens client-side
- Emergency resources are clearly displayed

## 📊 Monitoring

### Render Analytics
- Monitor site performance in Render dashboard
- Check build times and deployment frequency
- Set up alerts for build failures

### User Analytics (Optional)
- Consider adding Google Analytics
- Monitor user engagement with wellness tools
- Track emergency resource usage

## 🔄 Updates and Maintenance

### Regular Updates
1. Make changes to your local code
2. Test locally with `npm start`
3. Commit and push to GitHub
4. Render will automatically redeploy

### Dependency Updates
```bash
npm update
npm audit fix
git add package*.json
git commit -m "Update dependencies"
git push
```

## 🆘 Support

### Render Support
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [Render Status](https://status.render.com)

### GitHub Issues
- Report bugs in your GitHub repository
- Use GitHub Issues for feature requests
- Tag issues appropriately

## 🎉 Success!

Once deployed, your WizCare mental health chatbot will be:
- ✅ Accessible worldwide
- ✅ Mobile-friendly
- ✅ Secure with HTTPS
- ✅ Free to host
- ✅ Automatically updated

**Your URL will be**: `https://your-app-name.onrender.com`

Share this URL with others who might benefit from mental health support! 💙

---

**Remember**: This is a supportive tool, not a replacement for professional medical care. Always encourage users to seek professional help when needed.
