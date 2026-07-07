import { getYoutubeEmbedUrl, isValidYouTubeChannelId } from './streaming-config';

export interface YouTubeLiveStatus {
  isLive: boolean;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  viewerCount?: number;
  startTime?: string;
}

export interface YouTubeChannelInfo {
  channelId: string;
  channelTitle: string;
  subscriberCount: number;
  videoCount: number;
  thumbnailUrl: string;
}

/**
 * Check if a YouTube channel is currently live streaming
 */
export async function checkYouTubeLiveStatus(channelId: string): Promise<YouTubeLiveStatus> {
  try {
    if (!isValidYouTubeChannelId(channelId)) {
      throw new Error('Invalid YouTube channel ID');
    }

    // In a real implementation, you would use YouTube Data API v3
    // For now, we'll simulate the check
    const response = await fetch(`/api/youtube/live-status?channelId=${channelId}`);
    
    if (!response.ok) {
      throw new Error('Failed to check live status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking YouTube live status:', error);
    return { isLive: false };
  }
}

/**
 * Get YouTube channel information
 */
export async function getYouTubeChannelInfo(channelId: string): Promise<YouTubeChannelInfo | null> {
  try {
    if (!isValidYouTubeChannelId(channelId)) {
      throw new Error('Invalid YouTube channel ID');
    }

    // In a real implementation, you would use YouTube Data API v3
    const response = await fetch(`/api/youtube/channel-info?channelId=${channelId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get channel info');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting YouTube channel info:', error);
    return null;
  }
}

/**
 * Generate YouTube embed URL for live streaming
 */
export function generateYouTubeEmbedUrl(channelId: string, options?: {
  autoplay?: boolean;
  mute?: boolean;
  controls?: boolean;
}): string {
  const baseUrl = getYoutubeEmbedUrl(channelId);
  const params = new URLSearchParams();

  if (options?.autoplay) {
    params.set('autoplay', '1');
  }
  if (options?.mute) {
    params.set('mute', '1');
  }
  if (options?.controls === false) {
    params.set('controls', '0');
  }

  const paramString = params.toString();
  return paramString ? `${baseUrl}&${paramString}` : baseUrl;
}

/**
 * Extract YouTube channel ID from various URL formats
 */
export function extractChannelIdFromUrl(url: string): string | null {
  const patterns = [
    /youtube\.com\/channel\/([UCa-zA-Z0-9_-]{22})/,
    /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/@([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Validate YouTube channel URL
 */
export function validateYouTubeUrl(url: string): boolean {
  const youtubeUrlPatterns = [
    /^https?:\/\/(www\.)?youtube\.com\/channel\/[UCa-zA-Z0-9_-]{22}\/?$/,
    /^https?:\/\/(www\.)?youtube\.com\/c\/[a-zA-Z0-9_-]+\/?$/,
    /^https?:\/\/(www\.)?youtube\.com\/user\/[a-zA-Z0-9_-]+\/?$/,
    /^https?:\/\/(www\.)?youtube\.com\/@[a-zA-Z0-9_-]+\/?$/
  ];

  return youtubeUrlPatterns.some(pattern => pattern.test(url));
}

/**
 * Get YouTube thumbnail URL for a video
 */
export function getYouTubeThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'default'): string {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault'
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Format YouTube subscriber count
 */
export function formatSubscriberCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Get YouTube API endpoint URL
 */
export function getYouTubeApiUrl(endpoint: string, params: Record<string, string> = {}): string {
  const baseUrl = 'https://www.googleapis.com/youtube/v3';
  const urlParams = new URLSearchParams(params);
  
  // Add API key if available
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (apiKey) {
    urlParams.set('key', apiKey);
  }

  return `${baseUrl}${endpoint}?${urlParams.toString()}`;
}
