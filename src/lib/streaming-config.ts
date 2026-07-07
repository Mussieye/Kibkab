export interface StreamingConfig {
  youtube: {
    channelId: string;
    apiKey?: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  zoom: {
    apiKey?: string;
    apiSecret?: string;
    webhookSecret?: string;
  };
  services: ServiceConfig[];
}

export interface ServiceConfig {
  id: number;
  title: string;
  day: string;
  time: string;
  duration: string;
  youtubeUrl: string;
  vimeoUrl: string;
  zoomMeetingId: string;
  zoomPassword: string;
  streamType: "youtube" | "vimeo" | "zoom";
  description: string;
  speaker: string;
}

// Default streaming configuration - UPDATE THESE VALUES
export const defaultStreamingConfig: StreamingConfig = {
  youtube: {
    channelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "YOUR_CHANNEL_ID",
    apiKey: process.env.YOUTUBE_API_KEY,
    defaultTitle: "Maranatha Christian Church Live Service",
    defaultDescription: "Join us for live worship and teaching",
  },
  zoom: {
    apiKey: process.env.ZOOM_API_KEY,
    apiSecret: process.env.ZOOM_API_SECRET,
    webhookSecret: process.env.ZOOM_WEBHOOK_SECRET,
  },
  services: [
    {
      id: 1,
      title: "Sunday Morning Service",
      day: "Sunday",
      time: "10:00 AM",
      duration: "2 hours",
      youtubeUrl: `https://www.youtube.com/embed/live_stream?channel=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "YOUR_CHANNEL_ID"}`,
      vimeoUrl: "https://player.vimeo.com/live/123456",
      zoomMeetingId: process.env.SUNDAY_ZOOM_MEETING_ID || "1234567890",
      zoomPassword: process.env.SUNDAY_ZOOM_PASSWORD || "maranatha",
      streamType: "youtube" as const,
      description: "Join us for our weekly Sunday morning worship service",
      speaker: "Pastor John Smith"
    },
    {
      id: 2,
      title: "Wednesday Bible Study",
      day: "Wednesday",
      time: "7:00 PM",
      duration: "1 hour",
      youtubeUrl: `https://www.youtube.com/embed/live_stream?channel=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "YOUR_CHANNEL_ID"}`,
      vimeoUrl: "https://player.vimeo.com/live/234567",
      zoomMeetingId: process.env.BIBLE_STUDY_ZOOM_MEETING_ID || "2345678901",
      zoomPassword: process.env.BIBLE_STUDY_ZOOM_PASSWORD || "bible123",
      streamType: "zoom" as const,
      description: "Mid-week Bible study and prayer meeting",
      speaker: "Pastor John Smith"
    },
    {
      id: 3,
      title: "Friday Youth Service",
      day: "Friday",
      time: "6:00 PM",
      duration: "1.5 hours",
      youtubeUrl: `https://www.youtube.com/embed/live_stream?channel=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "YOUR_CHANNEL_ID"}`,
      vimeoUrl: "https://player.vimeo.com/live/345678",
      zoomMeetingId: process.env.YOUTH_ZOOM_MEETING_ID || "3456789012",
      zoomPassword: process.env.YOUTH_ZOOM_PASSWORD || "youth456",
      streamType: "zoom" as const,
      description: "Youth-focused worship and teaching",
      speaker: "Youth Pastor Mike Johnson"
    },
    {
      id: 4,
      title: "Thursday Prayer Meeting",
      day: "Thursday",
      time: "8:00 PM",
      duration: "1 hour",
      youtubeUrl: `https://www.youtube.com/embed/live_stream?channel=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "YOUR_CHANNEL_ID"}`,
      vimeoUrl: "https://player.vimeo.com/live/456789",
      zoomMeetingId: process.env.PRAYER_MEETING_ZOOM_MEETING_ID || "4567890123",
      zoomPassword: process.env.PRAYER_MEETING_ZOOM_PASSWORD || "prayer789",
      streamType: "vimeo" as const,
      description: "Weekly prayer and worship night",
      speaker: "Prayer Team Lead"
    }
  ]
};

// Helper function to get YouTube embed URL
export function getYoutubeEmbedUrl(channelId: string): string {
  return `https://www.youtube.com/embed/live_stream?channel=${channelId}`;
}

// Helper function to get Zoom join URL
export function getZoomJoinUrl(meetingId: string, password?: string): string {
  const baseUrl = `https://zoom.us/j/${meetingId}`;
  return password ? `${baseUrl}?pwd=${password}` : baseUrl;
}

// Helper function to validate YouTube channel ID
export function isValidYouTubeChannelId(channelId: string): boolean {
  // YouTube channel IDs start with "UC" followed by 22 characters
  return /^UC[a-zA-Z0-9_-]{22}$/.test(channelId) || channelId === "YOUR_CHANNEL_ID";
}

// Helper function to validate Zoom meeting ID
export function isValidZoomMeetingId(meetingId: string): boolean {
  // Zoom meeting IDs are 10-11 digits
  return /^\d{10,11}$/.test(meetingId);
}
