import { NextRequest, NextResponse } from 'next/server';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  category: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const calendarId = searchParams.get('calendarId') || 'primary';
    
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
    
    if (!apiKey || apiKey === 'your-google-calendar-api-key') {
      return NextResponse.json(
        { error: 'Google Calendar API key not configured' },
        { status: 400 }
      );
    }

    // Calculate time range (next 30 days)
    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    // Fetch events from Google Calendar API
    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?` +
      `timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&` +
      `key=${apiKey}`;

    const response = await fetch(calendarUrl);
    
    if (!response.ok) {
      throw new Error(`Google Calendar API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform Google Calendar events to our format
    const events: CalendarEvent[] = data.items
      .filter((item: any) => item.status === 'confirmed' && item.summary)
      .map((item: any) => ({
        id: item.id,
        title: item.summary,
        description: item.description || '',
        startTime: item.start.dateTime || item.start.date,
        endTime: item.end.dateTime || item.end.date,
        location: item.location,
        category: categorizeEvent(item.summary, item.description)
      }));

    return NextResponse.json({
      success: true,
      events,
      lastSync: new Date().toISOString(),
      totalEvents: events.length
    });

  } catch (error) {
    console.error('Calendar sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync with Google Calendar' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { calendarId, action } = await request.json();
    
    if (action === 'sync') {
      // Trigger manual sync
      const syncResponse = await GET(request);
      return syncResponse;
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Calendar POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process calendar request' },
      { status: 500 }
    );
  }
}

// Helper function to categorize events
function categorizeEvent(title: string, description: string): string {
  const titleLower = title.toLowerCase();
  const descLower = description.toLowerCase();

  if (titleLower.includes('service') || titleLower.includes('worship') || descLower.includes('worship')) {
    return 'Weekly Services';
  } else if (titleLower.includes('bible') || titleLower.includes('study') || descLower.includes('bible')) {
    return 'Bible Study';
  } else if (titleLower.includes('youth') || descLower.includes('youth')) {
    return 'Youth';
  } else if (titleLower.includes('conference') || descLower.includes('conference')) {
    return 'Conferences';
  } else if (titleLower.includes('outreach') || descLower.includes('outreach')) {
    return 'Outreach';
  } else {
    return 'Other';
  }
}
