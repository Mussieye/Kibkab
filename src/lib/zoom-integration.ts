import { getZoomJoinUrl, isValidZoomMeetingId } from './streaming-config';

export interface ZoomMeetingInfo {
  id: string;
  topic: string;
  type: number;
  startTime: string;
  duration: number;
  timezone: string;
  agenda?: string;
  settings: ZoomMeetingSettings;
}

export interface ZoomMeetingSettings {
  host_video: boolean;
  participant_video: boolean;
  cn_meeting: boolean;
  in_meeting: boolean;
  join_before_host: boolean;
  mute_upon_entry: boolean;
  watermark: boolean;
  use_pmi: boolean;
  approval_type: number;
  audio: string;
  auto_recording: string;
  enforce_login: boolean;
  enforce_login_domains: string;
  alternative_hosts: string;
  close_registration: boolean;
  waiting_room: boolean;
  allow_multiple_devices: boolean;
  registrants_confirmation_email: boolean;
}

export interface ZoomParticipant {
  id: string;
  name: string;
  email: string;
  join_time?: string;
  leave_time?: string;
  duration?: number;
}

export interface ZoomMeetingStatus {
  isLive: boolean;
  participantCount: number;
  startTime?: string;
  hostPresent: boolean;
  recordingActive: boolean;
}

/**
 * Check if a Zoom meeting is currently active
 */
export async function checkZoomMeetingStatus(meetingId: string): Promise<ZoomMeetingStatus> {
  try {
    if (!isValidZoomMeetingId(meetingId)) {
      throw new Error('Invalid Zoom meeting ID');
    }

    // In a real implementation, you would use Zoom API
    const response = await fetch(`/api/zoom/meeting-status?meetingId=${meetingId}`);
    
    if (!response.ok) {
      throw new Error('Failed to check meeting status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking Zoom meeting status:', error);
    return { 
      isLive: false, 
      participantCount: 0, 
      hostPresent: false, 
      recordingActive: false 
    };
  }
}

/**
 * Get Zoom meeting information
 */
export async function getZoomMeetingInfo(meetingId: string): Promise<ZoomMeetingInfo | null> {
  try {
    if (!isValidZoomMeetingId(meetingId)) {
      throw new Error('Invalid Zoom meeting ID');
    }

    // In a real implementation, you would use Zoom API
    const response = await fetch(`/api/zoom/meeting-info?meetingId=${meetingId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get meeting info');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting Zoom meeting info:', error);
    return null;
  }
}

/**
 * Generate Zoom join URL for meeting
 */
export function generateZoomJoinUrl(meetingId: string, password?: string): string {
  return getZoomJoinUrl(meetingId, password);
}

/**
 * Create a new Zoom meeting
 */
export async function createZoomMeeting(meetingData: Partial<ZoomMeetingInfo>): Promise<ZoomMeetingInfo | null> {
  try {
    const response = await fetch('/api/zoom/create-meeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meetingData),
    });

    if (!response.ok) {
      throw new Error('Failed to create meeting');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    return null;
  }
}

/**
 * Update an existing Zoom meeting
 */
export async function updateZoomMeeting(meetingId: string, updateData: Partial<ZoomMeetingInfo>): Promise<ZoomMeetingInfo | null> {
  try {
    if (!isValidZoomMeetingId(meetingId)) {
      throw new Error('Invalid Zoom meeting ID');
    }

    const response = await fetch(`/api/zoom/update-meeting/${meetingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Failed to update meeting');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating Zoom meeting:', error);
    return null;
  }
}

/**
 * Delete a Zoom meeting
 */
export async function deleteZoomMeeting(meetingId: string): Promise<boolean> {
  try {
    if (!isValidZoomMeetingId(meetingId)) {
      throw new Error('Invalid Zoom meeting ID');
    }

    const response = await fetch(`/api/zoom/delete-meeting/${meetingId}`, {
      method: 'DELETE',
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting Zoom meeting:', error);
    return false;
  }
}

/**
 * Get participants in a Zoom meeting
 */
export async function getZoomMeetingParticipants(meetingId: string): Promise<ZoomParticipant[]> {
  try {
    if (!isValidZoomMeetingId(meetingId)) {
      throw new Error('Invalid Zoom meeting ID');
    }

    const response = await fetch(`/api/zoom/meeting-participants?meetingId=${meetingId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get meeting participants');
    }

    const data = await response.json();
    return data.participants || [];
  } catch (error) {
    console.error('Error getting Zoom meeting participants:', error);
    return [];
  }
}

/**
 * Generate Zoom SDK signature for client-side integration
 */
export function generateZoomSdkSignature(meetingNumber: string, role: number = 0): string {
  // In a real implementation, this would be done server-side
  // using the Zoom SDK JWT token generation
  // For now, return a placeholder
  return 'placeholder_sdk_signature';
}

/**
 * Validate Zoom meeting ID format
 */
export function validateZoomMeetingId(meetingId: string): boolean {
  return isValidZoomMeetingId(meetingId);
}

/**
 * Extract meeting ID from Zoom URL
 */
export function extractMeetingIdFromUrl(url: string): string | null {
  const patterns = [
    /zoom\.us\/j\/(\d{10,11})/,
    /zoom\.us\/meeting\/(\d{10,11})/,
    /zoom\.us\/my\/(\d{10,11})/
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
 * Format meeting duration
 */
export function formatMeetingDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} minutes`;
  } else if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`;
  }
}

/**
 * Get Zoom API endpoint URL
 */
export function getZoomApiUrl(endpoint: string, params: Record<string, string> = {}): string {
  const baseUrl = 'https://api.zoom.us/v2';
  const urlParams = new URLSearchParams(params);
  
  return `${baseUrl}${endpoint}?${urlParams.toString()}`;
}

/**
 * Generate Zoom JWT token for API authentication
 */
export function generateZoomJwtToken(): string {
  // In a real implementation, this would generate a proper JWT token
  // using the Zoom API key and secret
  // For now, return a placeholder
  return 'placeholder_jwt_token';
}

/**
 * Check if Zoom meeting requires registration
 */
export function requiresRegistration(meetingType: number): boolean {
  // Zoom meeting types: 1=Instant, 2=Scheduled, 3=Recurring with no fixed time, 8=Recurring with fixed time
  return meetingType === 2 || meetingType === 8;
}

/**
 * Get meeting type description
 */
export function getMeetingTypeDescription(type: number): string {
  const types = {
    1: 'Instant Meeting',
    2: 'Scheduled Meeting',
    3: 'Recurring Meeting with No Fixed Time',
    8: 'Recurring Meeting with Fixed Time'
  };

  return types[type as keyof typeof types] || 'Unknown Meeting Type';
}
