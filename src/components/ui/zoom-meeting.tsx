"use client";

import { useState, useEffect } from "react";

interface ZoomMeetingProps {
  meetingId: string;
  meetingPassword?: string;
  isLive: boolean;
  title: string;
}

export function ZoomMeeting({ meetingId, meetingPassword, isLive, title }: ZoomMeetingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");

  const handleJoinMeeting = () => {
    if (!userName.trim()) {
      setError("Please enter your name to join the meeting");
      return;
    }

    setIsLoading(true);
    setError("");

    // Create Zoom meeting URL
    const zoomUrl = `https://zoom.us/j/${meetingId}${meetingPassword ? `?pwd=${meetingPassword}` : ""}`;
    
    // Open in new tab
    window.open(zoomUrl, "_blank", "noopener,noreferrer");
    
    setIsLoading(false);
  };

  const handleJoinViaApp = () => {
    if (!userName.trim()) {
      setError("Please enter your name to join the meeting");
      return;
    }

    // Create Zoom app URL
    const zoomAppUrl = `zoommtg://zoom.us/join?confno=${meetingId}${meetingPassword ? `&pwd=${meetingPassword}` : ""}`;
    
    // Try to open Zoom app
    window.location.href = zoomAppUrl;
    
    // Fallback to web if app doesn't open
    setTimeout(() => {
      const zoomUrl = `https://zoom.us/j/${meetingId}${meetingPassword ? `?pwd=${meetingPassword}` : ""}`;
      window.open(zoomUrl, "_blank", "noopener,noreferrer");
    }, 2000);
  };

  if (!isLive) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-royal-purple/20 to-burgundy/20 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="mb-6">
            <svg className="h-24 w-24 mx-auto text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Zoom Meeting Not Started</h3>
          <p className="text-lg opacity-80">The meeting will start during scheduled service time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-royal-purple/10 to-burgundy/10 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="h-20 w-20 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-glow">
              <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            ZOOM MEETING LIVE
          </div>
          <p className="text-white/80">Join our live service via Zoom</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="mb-6">
            <label htmlFor="userName" className="block text-sm font-medium text-white mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg bg-white/20 border border-white/30 px-4 py-3 text-white placeholder-white/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
            />
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/20 border border-red-500/30 p-3 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleJoinMeeting}
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-glow transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Joining..." : "Join in Browser"}
            </button>

            <button
              onClick={handleJoinViaApp}
              disabled={isLoading}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Opening..." : "Open Zoom App"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-sm text-white/70 mb-2">Meeting ID: {meetingId}</p>
              {meetingPassword && (
                <p className="text-sm text-white/70">Password: {meetingPassword}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            Don't have Zoom?{' '}
            <a 
              href="https://zoom.us/download" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light underline"
            >
              Download here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
