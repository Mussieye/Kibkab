"use client";

import { useState, useRef, useEffect } from "react";

interface SermonAudioPlayerProps {
  src: string;
  title: string;
  speaker?: string;
  date?: string;
  className?: string;
}

export function SermonAudioPlayer({
  src,
  title,
  speaker,
  date,
  className = "",
}: SermonAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [src]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`bg-white rounded-xl border border-royal-purple/20 p-6 shadow-lg ${className}`}>
      {/* Audio Player Header */}
      <div className="mb-4">
        <h3 className="font-serif text-xl text-royal-purple mb-2">{title}</h3>
        {speaker && (
          <p className="text-charcoal/70">
            <span className="font-medium">Speaker:</span> {speaker}
          </p>
        )}
        {date && (
          <p className="text-charcoal/70">
            <span className="font-medium">Date:</span> {date}
          </p>
        )}
      </div>

      {/* Audio Player Controls */}
      <div className="bg-gradient-to-br from-royal-purple/10 to-burgundy/10 rounded-lg p-4 mb-4">
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          className="w-full"
        />
        
        <div className="flex items-center gap-4 mb-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="bg-royal-purple text-white p-3 rounded-full hover:bg-royal-purple/90 transition-colors"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v2a2 2 0 012 2v2a2 2 0 01-2V6a2 2 0 00-2h-2a2 2 0 00-2v2a2 2 0 012 2z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7v-14z"/>
              </svg>
            )}
          </button>

          {/* Time Display */}
          <div className="flex-1 text-sm text-charcoal/70">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5v2H5V9zm4.5-1.5A1.5 1.5 0 014 1.5v3A1.5 1.5 0 011 14.5v-3A1.5 1.5 0 004.5 12.5z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-royal-purple/20 rounded-lg appearance-none cursor-pointer"
              aria-label="Volume control"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-royal-purple/20 rounded-lg appearance-none cursor-pointer"
            aria-label="Audio progress"
          />
          <div className="flex justify-between text-xs text-charcoal/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Download Link */}
      <div className="text-center">
        <a
          href={src}
          download
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-royal-purple rounded-lg font-medium hover:bg-gold/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H5v6h14v6h4zm-5 2a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-8a1 1 0 00-1-1z"/>
          </svg>
          Download Audio
        </a>
      </div>
    </div>
  );
}
