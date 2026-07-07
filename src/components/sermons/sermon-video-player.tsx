"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface SermonVideoPlayerProps {
  src: string;
  thumbnail?: string;
  title: string;
  speaker: string;
  date: string;
  description?: string;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
}

export function SermonVideoPlayer({ 
  src, 
  thumbnail, 
  title, 
  speaker, 
  date,
  description,
  autoPlay = false, 
  muted = false,
  className = "" 
}: SermonVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setVolume(vol);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Video Container */}
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-black">
        <video
          ref={videoRef}
          src={src}
          poster={thumbnail}
          className="w-full aspect-video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          autoPlay={autoPlay}
          muted={muted}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="space-y-3">
            {/* Title and Info */}
            <div>
              <h3 className="text-white font-semibold text-lg">{title}</h3>
              <p className="text-white/80 text-sm">{speaker} • {date}</p>
              {description && (
                <p className="text-white/70 text-sm mt-1">{description}</p>
              )}
            </div>
            
            {/* Controls */}
            <div className="space-y-2">
              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <span className="text-white text-xs">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white text-xs">{formatTime(duration)}</span>
              </div>
              
              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-gold transition-colors"
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                  
                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Fullscreen Button */}
                <button className="text-white hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Info Card */}
      <div className="bg-white rounded-lg p-6 border border-royal-purple/20">
        <h3 className="font-serif text-2xl text-royal-purple mb-2">{title}</h3>
        <p className="text-charcoal/70 mb-4">{speaker} • {date}</p>
        {description && (
          <p className="text-charcoal/80 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
