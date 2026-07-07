# Google Calendar Integration Setup Guide

## Overview

This guide explains how to set up Google Calendar synchronization for the Maranatha Christian Church website. This feature allows automatic syncing of church events from Google Calendar to the website.

## Prerequisites

- Google Cloud Console account
- Google Calendar with church events
- Website admin access

## Step 1: Create Google Calendar API Key

### 1.1 Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### 1.2 Create API Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key (keep it secure)
4. Restrict the API key:
   - Click on the API key
   - Under "Application restrictions", select "HTTP referrers"
   - Add your website domain (e.g., `https://your-domain.com`)
   - Under "API restrictions", select "Restrict key" and select "Google Calendar API"

## Step 2: Configure Google Calendar

### 2.1 Share Calendar Publicly
1. Open [Google Calendar](https://calendar.google.com/)
2. Find your church calendar
3. Hover over the calendar name and click the three dots
4. Select "Settings and sharing"
5. Under "Access permissions", set to "Public" or "Share with specific people"
6. Under "Integrate calendar", copy the Calendar ID (looks like an email address)

### 2.2 Make Calendar Events Public
1. In calendar settings, ensure events are visible to the public
2. Set default visibility to "Public" if desired
3. Test by accessing the calendar in incognito mode

## Step 3: Configure Website

### 3.1 Add Environment Variables
Add these to your `.env.local` file or Vercel environment variables:

```env
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=your-api-key-here
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
```

### 3.2 Update Calendar Configuration
In the Google Calendar sync component, update the calendar ID:

```typescript
<GoogleCalendarSync
  calendarId="your-calendar-id@group.calendar.google.com"
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
  onEventsFetched={handleEvents}
/>
```

## Step 4: Test Integration

### 4.1 Manual Sync Test
1. Go to the Events page on your website
2. Click "Show Sync" to reveal the Google Calendar sync panel
3. Click "Sync Now" to test the connection
4. Check if events appear in the "Synced Events" section

### 4.2 Verify Data
- Check that event titles appear correctly
- Verify dates and times are accurate
- Confirm locations are displayed
- Test event categorization

## Step 5: Automate Sync

### 5.1 Set Up Automatic Sync
The system can be configured to sync automatically:

```typescript
// Auto-sync every hour
useEffect(() => {
  const interval = setInterval(() => {
    fetchCalendarEvents();
  }, 60 * 60 * 1000); // 1 hour

  return () => clearInterval(interval);
}, []);
```

### 5.2 Webhook Integration (Advanced)
For real-time updates, set up Google Calendar webhooks:
1. Create a webhook endpoint in your API
2. Configure Google Calendar to send notifications
3. Process webhook events to update local data

## Event Categorization

The system automatically categorizes events based on title and description:

- **Weekly Services**: "service", "worship"
- **Bible Study**: "bible", "study"
- **Youth**: "youth"
- **Conferences**: "conference"
- **Outreach**: "outreach"
- **Other**: Everything else

### Custom Categories
You can customize categorization logic in the `categorizeEvent` function:

```typescript
function categorizeEvent(title: string, description: string): string {
  const titleLower = title.toLowerCase();
  const descLower = description.toLowerCase();

  // Add your custom logic here
  if (titleLower.includes('prayer') || descLower.includes('prayer')) {
    return 'Prayer Meetings';
  }
  
  // ... existing logic
}
```

## Troubleshooting

### Common Issues

#### API Key Not Working
- Verify the API key is correct
- Check that Google Calendar API is enabled
- Ensure API key restrictions allow your domain
- Check that the key hasn't expired

#### Calendar Not Accessible
- Verify calendar is shared publicly
- Check calendar ID is correct
- Ensure events are marked as public
- Test calendar URL in browser

#### Events Not Syncing
- Check network connectivity
- Verify API quota limits
- Check calendar has events in the next 30 days
- Review browser console for errors

#### Time Zone Issues
- Ensure calendar and server time zones match
- Check event time zone settings
- Verify date formatting

### Error Messages

#### "Google Calendar API key not configured"
- Add the API key to environment variables
- Restart the development server

#### "Failed to sync with Google Calendar"
- Check API key permissions
- Verify calendar accessibility
- Review network connectivity

#### "No events found"
- Check calendar has future events
- Verify time range (next 30 days)
- Ensure events are confirmed (not cancelled)

## Security Best Practices

### API Key Security
- Never expose API keys in client-side code
- Use environment variables for sensitive data
- Restrict API key to your domain only
- Monitor API usage and quotas

### Calendar Privacy
- Only share necessary calendar information
- Use separate calendar for public events
- Regularly review sharing settings
- Consider using service account for production

## Performance Optimization

### Caching Strategy
- Cache calendar events for 1 hour
- Use stale-while-revalidate pattern
- Implement background refresh

### Rate Limiting
- Respect Google Calendar API quotas
- Implement exponential backoff for errors
- Cache responses to reduce API calls

## Maintenance

### Regular Tasks
- Monitor API usage and quotas
- Update calendar sharing settings
- Review event categorization accuracy
- Check sync status regularly

### Updates
- Keep Google Calendar API dependencies updated
- Review API key security periodically
- Update event categorization rules as needed
- Monitor for API changes

## Support

For additional help:
1. Check the [Google Calendar API documentation](https://developers.google.com/calendar)
2. Review the admin guide for website management
3. Contact your web developer for technical issues
4. Test thoroughly before going live

---

**Note**: This feature requires a Google Calendar API key. Free tier includes limited API requests per day. For high-traffic websites, consider upgrading to a paid plan.
