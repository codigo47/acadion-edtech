'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export interface AudioBlockProps {
  url: string;
  title?: string;
  dark?: boolean;
}

export default function AudioBlock({
  url,
  title = 'Audio',
  dark = false,
}: AudioBlockProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setVolume(vol);
      setIsMuted(vol === 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div
        className={`p-4 rounded-lg ${
          dark ? 'bg-gray-800' : 'bg-gray-100'
        }`}
      >
        <audio ref={audioRef} src={url} preload="metadata" />

        {title && (
          <p className={`text-sm font-medium mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </p>
        )}

        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>

          {/* Progress */}
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #9F80DA ${(currentTime / duration) * 100}%, ${dark ? '#374151' : '#D1D5DB'} ${(currentTime / duration) * 100}%)`,
              }}
            />
            <div className="flex justify-between mt-1">
              <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {formatTime(currentTime)}
              </span>
              <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className={dark ? 'text-gray-400' : 'text-gray-500'}>
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #9F80DA ${volume * 100}%, ${dark ? '#374151' : '#D1D5DB'} ${volume * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
