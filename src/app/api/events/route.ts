import { NextRequest, NextResponse } from 'next/server';

interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  rsvpLink?: string;
  isRecurring?: boolean;
  recurringPattern?: string;
  image?: string;
  tags: string[];
  status: "draft" | "published" | "cancelled";
}

// Mock database - in production, this would be a real database
let events: ChurchEvent[] = [
  {
    id: "1",
    title: "Sunday Morning Service",
    description: "Join us for uplifting worship and biblical teaching",
    date: "2024-01-28",
    startTime: "10:00",
    endTime: "11:30",
    location: "Main Sanctuary",
    category: "Weekly Services",
    rsvpLink: "",
    isRecurring: true,
    recurringPattern: "weekly",
    tags: ["worship", "teaching"],
    status: "published"
  },
  {
    id: "2",
    title: "Bible Study: Romans",
    description: "Deep dive into Paul's letter to the Romans",
    date: "2024-01-31",
    startTime: "19:00",
    endTime: "20:30",
    location: "Fellowship Hall",
    category: "Bible Study",
    rsvpLink: "",
    isRecurring: false,
    recurringPattern: "",
    tags: ["bible", "study"],
    status: "published"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    let filteredEvents = events;

    // Filter by category
    if (category && category !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.category === category);
    }

    // Filter by status
    if (status && status !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.status === status);
    }

    // Filter by date
    if (date) {
      filteredEvents = filteredEvents.filter(event => event.date === date);
    }

    return NextResponse.json({
      success: true,
      events: filteredEvents,
      total: filteredEvents.length
    });

  } catch (error) {
    console.error('Events GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'date', 'startTime', 'endTime', 'location', 'category'];
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new event
    const newEvent: ChurchEvent = {
      id: Date.now().toString(),
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      location: eventData.location,
      category: eventData.category,
      rsvpLink: eventData.rsvpLink || '',
      isRecurring: eventData.isRecurring || false,
      recurringPattern: eventData.recurringPattern || '',
      image: eventData.image || '',
      tags: eventData.tags || [],
      status: eventData.status || 'draft'
    };

    events.push(newEvent);

    return NextResponse.json({
      success: true,
      event: newEvent,
      message: 'Event created successfully'
    });

  } catch (error) {
    console.error('Events POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const eventData = await request.json();
    const { id } = eventData;

    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Find and update event
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Update event
    events[eventIndex] = {
      ...events[eventIndex],
      ...eventData
    };

    return NextResponse.json({
      success: true,
      event: events[eventIndex],
      message: 'Event updated successfully'
    });

  } catch (error) {
    console.error('Events PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Find and delete event
    const eventIndex = events.findIndex(event => event.id === id);
    if (eventIndex === -1) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const deletedEvent = events[eventIndex];
    events.splice(eventIndex, 1);

    return NextResponse.json({
      success: true,
      event: deletedEvent,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Events DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
