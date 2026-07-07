# Step-by-Step Streaming Setup Guide

This guide will help you connect your YouTube channel and Zoom account to enable live streaming for your church services.

## Step 1: Environment Configuration

### Create Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# YouTube Configuration
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_actual_channel_id_here
YOUTUBE_API_KEY=your_youtube_api_key_here

# Zoom Configuration
ZOOM_API_KEY=your_zoom_api_key_here
ZOOM_API_SECRET=your_zoom_api_secret_here
ZOOM_WEBHOOK_SECRET=your_webhook_secret_here

# Service-Specific Zoom Meetings
SUNDAY_ZOOM_MEETING_ID=1234567890
SUNDAY_ZOOM_PASSWORD=your_sunday_password
BIBLE_STUDY_ZOOM_MEETING_ID=2345678901
BIBLE_STUDY_ZOOM_PASSWORD=your_bible_study_password
YOUTH_ZOOM_MEETING_ID=3456789012
YOUTH_ZOOM_PASSWORD=your_youth_password
PRAYER_MEETING_ZOOM_MEETING_ID=4567890123
PRAYER_MEETING_ZOOM_PASSWORD=your_prayer_password
```

## Step 2: YouTube Live Setup

### 2.1 Enable Live Streaming

1. **Sign in to YouTube Studio**
   - Go to [YouTube Studio](https://studio.youtube.com/)
   - Sign in with your Google account

2. **Verify Your Channel**
   - Click on "Create" in the right menu
   - Follow the verification process (phone verification usually takes 24 hours)
   - Your channel must have at least 1,000 subscribers and 4,000 watch hours in the last 12 months

3. **Enable Live Streaming**
   - In YouTube Studio, go to "Settings" > "Channel" > "Features"
   - Find "Live streaming" and click "Enable"
   - Accept the terms and conditions

### 2.2 Get Your Channel ID

1. **Method 1: From URL**
   - Go to your YouTube channel homepage
   - Look at the URL: `https://www.youtube.com/channel/CHANNEL_ID`
   - Copy the CHANNEL_ID (starts with "UC")

2. **Method 2: From YouTube Studio**
   - Go to YouTube Studio > "Settings" > "Channel" > "Basic info"
   - Your Channel ID will be displayed there

3. **Update Configuration**
   - Replace `YOUR_CHANNEL_ID` in your `.env.local` file with your actual channel ID

### 2.3 Get YouTube API Key (Optional)

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable YouTube Data API**
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"

3. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key to your `.env.local` file

## Step 3: Zoom Integration Setup

### 3.1 Get Zoom Pro Account

1. **Sign Up for Zoom Pro**
   - Go to [Zoom](https://zoom.us/)
   - Sign up for a Pro, Business, or Enterprise account
   - Free accounts have 40-minute limits (not suitable for services)

### 3.2 Create Zoom App

1. **Go to Zoom App Marketplace**
   - Visit [Zoom App Marketplace](https://marketplace.zoom.us/)
   - Click "Develop" > "Build App"

2. **Create JWT App**
   - Choose "JWT" app type
   - Fill in app information:
     - App Name: "Maranatha Church Streaming"
     - Company Name: "Maranatha Christian Church"
     - Developer Name: Your name
     - Email: Your email

3. **Get App Credentials**
   - Once approved, you'll get an API Key and API Secret
   - Copy these to your `.env.local` file

### 3.3 Create Recurring Meetings

1. **Sunday Service Meeting**
   - Schedule a recurring meeting for Sundays at 10:00 AM
   - Set duration to 2 hours
   - Enable "Join before host"
   - Note the Meeting ID and password

2. **Wednesday Bible Study**
   - Schedule recurring meeting for Wednesdays at 7:00 PM
   - Set duration to 1 hour
   - Note the Meeting ID and password

3. **Friday Youth Service**
   - Schedule recurring meeting for Fridays at 6:00 PM
   - Set duration to 1.5 hours
   - Note the Meeting ID and password

4. **Thursday Prayer Meeting**
   - Schedule recurring meeting for Thursdays at 8:00 PM
   - Set duration to 1 hour
   - Note the Meeting ID and password

### 3.4 Update Configuration

Replace the placeholder values in your `.env.local` file with your actual meeting IDs and passwords.

## Step 4: Update Streaming Configuration

### 4.1 Customize Service Information

Edit `src/lib/streaming-config.ts` to update:

1. **Service Details**
   - Update speaker names
   - Customize descriptions
   - Adjust service times if needed

2. **Stream Types**
   - Choose which platform for each service (YouTube, Zoom, or Vimeo)
   - Update stream URLs accordingly

### 4.2 Test Configuration

1. **Restart Development Server**
   ```bash
   npm run dev
   ```

2. **Check Live Streaming Page**
   - Navigate to `/media/live-stream`
   - Verify all services are displayed correctly
   - Test platform switching

## Step 5: Testing Your Setup

### 5.1 Test YouTube Integration

1. **Start Test Stream**
   - Go to YouTube Studio
   - Click "Create" > "Go Live"
   - Set up a test stream

2. **Check Website**
   - Go to your live streaming page
   - Select "YouTube" stream type
   - Verify the embed loads correctly

### 5.2 Test Zoom Integration

1. **Start Test Meeting**
   - Start your scheduled Zoom meeting
   - Verify meeting is active

2. **Check Website**
   - Go to your live streaming page
   - Select "Zoom" stream type
   - Verify the meeting interface loads

### 5.3 Test Live Detection

1. **Check Schedule**
   - Verify service times match your actual schedule
   - Check that "LIVE NOW" indicator appears during scheduled times

2. **Manual Testing**
   - Temporarily change a service time to test live detection
   - Verify the indicator works correctly

## Step 6: Go Live

### 6.1 First Service

1. **Prepare 15 Minutes Before**
   - Start your YouTube stream or Zoom meeting
   - Test audio/video quality
   - Verify website shows "LIVE NOW"

2. **Start Service**
   - Begin your actual service
   - Monitor the live stream
   - Engage with online viewers

### 6.2 Promote Your Streaming

1. **Share Links**
   - Direct people to your website
   - Share the live streaming page URL
   - Encourage social media sharing

2. **Regular Schedule**
   - Maintain consistent streaming times
   - Update schedule if changes occur
   - Communicate schedule to congregation

## Troubleshooting

### Common Issues

**YouTube Stream Not Loading**
- Verify channel ID is correct
- Check if channel is live streaming
- Ensure live streaming is enabled

**Zoom Meeting Not Loading**
- Verify meeting ID and password
- Check if meeting is active
- Ensure Zoom account is Pro level

**Live Status Not Updating**
- Check service times are correct
- Verify server time zone
- Test with manual time changes

**Configuration Errors**
- Check environment variables are set
- Restart development server
- Verify syntax in configuration files

### Support Resources

- **YouTube Help**: [YouTube Live Streaming Support](https://support.google.com/youtube/topic/9257498)
- **Zoom Help**: [Zoom Live Streaming Guide](https://support.zoom.us/hc/en-us/articles/203749855-Live-streaming-meetings-and-webinars)
- **Website Issues**: Check browser console for errors

## Next Steps

1. **Regular Testing** - Test all features weekly
2. **Backup Plans** - Have backup streaming options ready
3. **User Feedback** - Collect feedback from congregation
4. **Continuous Improvement** - Update based on user needs

Your church live streaming platform is now ready to connect your congregation wherever they are!
