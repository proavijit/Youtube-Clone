# YouTube Clone - API Setup Guide

## ✅ Hydration Error Fixed!
The hydration mismatch error has been resolved by adding `suppressHydrationWarning` to the HTML and body tags.

---

## 🔑 YouTube API Key Setup

### Step 1: Get Your API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create or Select a Project**
   - Click "Select a project" at the top
   - Click "New Project"
   - Name it "YouTube Clone" or similar
   - Click "Create"

3. **Enable YouTube Data API v3**
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it
   - Click "Enable"

4. **Create API Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key

5. **Add to Your Project**
   - Open your `.env` file in the project root
   - Add this line:
   ```
   NEXT_PUBLIC_YT_KEY=YOUR_API_KEY_HERE
   ```
   - Replace `YOUR_API_KEY_HERE` with your actual API key

6. **Restart the Dev Server**
   ```bash
   # Stop the server (Ctrl+C in terminal)
   # Then restart:
   yarn dev
   ```

---

## 📊 API Quota Information

- **Free Tier**: 10,000 units per day
- **Typical Usage**:
  - Search query: 100 units
  - Video details: 1 unit
  - Channel info: 1 unit
  
**Tip**: You can make ~100 searches per day on the free tier.

---

## 🔒 Optional: Restrict Your API Key

For production, restrict your API key:

1. Go to "APIs & Services" → "Credentials"
2. Click on your API key
3. Under "Application restrictions":
   - Select "HTTP referrers"
   - Add: `http://localhost:3000/*` (for development)
   - Add your production domain when deploying

---

## ⚠️ Common Issues

### Issue: "403 Forbidden"
- **Cause**: API key not set or invalid
- **Fix**: Check your `.env` file has `NEXT_PUBLIC_YT_KEY=...`

### Issue: "403 Quota Exceeded"
- **Cause**: Used all 10,000 daily units
- **Fix**: Wait until tomorrow or upgrade to paid tier

### Issue: "API not enabled"
- **Cause**: YouTube Data API v3 not enabled
- **Fix**: Enable it in Google Cloud Console

---

## 🎯 Quick Test

After setting up your API key:

1. Restart the dev server
2. Go to http://localhost:3000
3. You should see videos loading
4. Try searching for something
5. Click on a video to watch

---

## 📝 Your .env File Should Look Like:

```
NEXT_PUBLIC_YT_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**: 
- Must start with `NEXT_PUBLIC_` for Next.js client-side access
- Never commit this file to Git (it's in .gitignore)
- Keep your API key secret!

---

## ✨ What's Fixed

1. ✅ Hydration error resolved
2. ✅ Metadata updated with your name
3. ✅ Browser extension conflicts suppressed

Now just add your YouTube API key and you're all set! 🚀
