'use client';

import { useEffect, useRef, useState } from 'react';
import { getMusicUrl } from '@/lib/storage';
import type { Day } from '@/types/day';

interface MusicPlayerProps {
  day: Day;
}

const DRIVER_SRC = '/decor/music1.png';
const CD_SRC = '/decor/music2.png';
const TOP_SRC = '/decor/music3.png';

export default function MusicPlayer({ day }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const musicUrl = day.music_path ? getMusicUrl(day.music_path) : null;

  // ✅ FIXED: Removed `day.music_title` because it doesn't exist in the Day interface
  const musicName =
    day.music_name ||
    day.song_title ||
    day.title ||
    'Our Song';
    
  const musicArtist = day.music_artist || day.song_artist || '';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [musicUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Music playback failed:', error);
      }
    }
  };

  if (!musicUrl) {
    return (
      <p className="text-center text-stone-400 mt-4 italic">
        No music available.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[280px] select-none sm:max-w-[320px]">
      {/* ── Music Title ── */}
      <div className="mb-6 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-rose-300" />
          <svg className="h-4 w-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-rose-300" />
        </div>

        <h4
          className="text-lg font-semibold text-stone-800"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          {musicName}
        </h4>

        {musicArtist && (
          <p className="mt-0.5 text-sm italic text-stone-500">{musicArtist}</p>
        )}
      </div>

      {/* ── CD Player ── */}
      <div className="relative ">
        {/* 1. Base plate (always static) */}
        <img src={DRIVER_SRC} alt="Music Player Base" draggable={false} className="w-full h-auto" />

        {/* 2. Spinning CD — ADJUST THESE VALUES */}
        <button
          type="button"
          onClick={togglePlay}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="absolute  left-1/2 z-10 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300/70 transition-transform hover:scale-101"
          style={{
            top: '53%',        // ⬆️ Adjust this (try 35% to 45%)
            width: '73%',      // ⬅️ Adjust width (try 50% to 60%)
            transform: 'translate(-50%, -50%)', // Keep this for centering
          }}
        >
          <img
            src={CD_SRC}
            alt="CD"
            draggable={false}
            className={`w-full h-auto drop-shadow-xl ${isPlaying ? 'animate-spin' : ''}`}
            style={{ animationDuration: '4s' }}
          />
        </button>

        {/* 3. Top piece — ADJUST THESE VALUES */}
        <img
          src={TOP_SRC}
          alt="Player Center"
          draggable={false}
          className="pointer-events-none absolute left-1/2 z-20 rotate-10 translate-x-13"
          style={{
            top: '42%',        // ⬆️ Should match the CD's top value
            width: '13%',      // ⬅️ Adjust width (try 15% to 22%)
            transform: 'translate(-50%, -50%)', // Keep this for centering
          }}
        />
      </div>

      <audio ref={audioRef} src={musicUrl} loop preload="auto" />

      <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-stone-400">
        {isPlaying ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-rose-400" />
            Now Playing
            <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-rose-400" />
          </span>
        ) : (
          'Tap to play'
        )}
      </p>
    </div>
  );
}