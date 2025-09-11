import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  preview_url: string | null;
  duration_ms: number;
  track_number: number;
}

const AudioPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [tracks, setTracks] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  // Album tracks - ready for local files (just replace the file paths)
  const albumTracks: Track[] = [
    {
      id: '1',
      name: 'No Saints, No Proof',
      preview_url: '/audio/01-no-saints-no-proof.mp3', // Local file path
      duration_ms: 210000,
      track_number: 1
    },
    {
      id: '2', 
      name: 'Digital Dreams',
      preview_url: '/audio/02-digital-dreams.mp3', // Local file path
      duration_ms: 195000,
      track_number: 2
    },
    {
      id: '3',
      name: 'Neon Nights',
      preview_url: '/audio/03-neon-nights.mp3', // Local file path
      duration_ms: 230000,
      track_number: 3
    },
    {
      id: '4',
      name: 'Cyber Soul',
      preview_url: '/audio/04-cyber-soul.mp3', // Local file path
      duration_ms: 180000,
      track_number: 4
    },
    {
      id: '5',
      name: 'Electric Pulse',
      preview_url: '/audio/05-electric-pulse.mp3', // Local file path
      duration_ms: 245000,
      track_number: 5
    },
    {
      id: '6',
      name: 'Synthetic Love',
      preview_url: '/audio/06-synthetic-love.mp3', // Local file path
      duration_ms: 201000,
      track_number: 6
    },
    {
      id: '7',
      name: 'Chrome Hearts',
      preview_url: '/audio/07-chrome-hearts.mp3', // Local file path
      duration_ms: 188000,
      track_number: 7
    },
    {
      id: '8',
      name: 'Midnight Drive',
      preview_url: '/audio/08-midnight-drive.mp3', // Local file path
      duration_ms: 267000,
      track_number: 8
    },
    {
      id: '9',
      name: 'Quantum Dreams',
      preview_url: '/audio/09-quantum-dreams.mp3', // Local file path
      duration_ms: 223000,
      track_number: 9
    },
    {
      id: '10',
      name: 'Future Memories',
      preview_url: '/audio/10-future-memories.mp3', // Local file path
      duration_ms: 278000,
      track_number: 10
    }
  ];

  useEffect(() => {
    setTracks(albumTracks);
  }, []);

  // Remove mouse movement visibility logic - player always visible

  // Audio setup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / 30) * 100); // 30 seconds max for previews
      }
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      clearInterval(progressIntervalRef.current);
    } else {
      const currentTrackData = tracks[currentTrack];
      if (currentTrackData?.preview_url) {
        audio.src = currentTrackData.preview_url;
        audio.play().catch(console.error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setProgress(0);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  

  return (
    <>
      <audio ref={audioRef} />
      <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        isExpanded ? 'translate-x-0' : 'translate-x-72'
      }`}>
        
        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-bronze/20 backdrop-blur-xl border-2 border-gold/30 rounded-l-xl p-3 text-gold hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--gold)/0.4)] ${
            isExpanded ? '' : 'rounded-r-xl'
          }`}
        >
          {isExpanded ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {/* Player */}
        <div className="bg-bronze/20 backdrop-blur-xl border-2 border-gold/30 rounded-2xl p-6 w-80 shadow-[0_0_30px_hsl(var(--gold)/0.3)]">
          {/* Track Info */}
          <div className="mb-4">
            <h3 className="font-orbitron font-bold text-lg bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent mb-1">
              GRAFENBERG
            </h3>
            <p className="text-gold font-medium truncate">
              {tracks[currentTrack]?.name || 'No Saints, No Proof'}
            </p>
            <p className="text-gold/60 text-sm">
              Track {currentTrack + 1} of {tracks.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs text-gold/60 mb-2">
              <span>0:00</span>
              <div className="flex-1 h-1 bg-bronze/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gold to-amber transition-all duration-300 shadow-[0_0_8px_hsl(var(--gold)/0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{formatTime(tracks[currentTrack]?.duration_ms / 1000 || 210)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTrack}
              className="text-gold hover:text-amber hover:bg-gold/10"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button
              variant="default"
              size="lg"
              onClick={togglePlay}
              className="rounded-full w-12 h-12 bg-gradient-to-r from-gold to-amber hover:from-gold-light hover:to-gold border border-gold/30 shadow-[0_0_20px_hsl(var(--gold)/0.4)] hover:shadow-[0_0_30px_hsl(var(--gold)/0.6)]"
            >
              {isPlaying ? <Pause className="w-6 h-6 text-bronze" /> : <Play className="w-6 h-6 text-bronze" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTrack}
              className="text-gold hover:text-amber hover:bg-gold/10"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-gold/60" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-bronze/40 rounded-full appearance-none gold-slider"
            />
          </div>

          {/* Track List */}
          <div className="mt-4 max-h-32 overflow-y-auto">
            {tracks.map((track, index) => (
              <button
                key={track.id}
                onClick={() => {
                  setCurrentTrack(index);
                  setIsPlaying(false);
                  setProgress(0);
                }}
                className={`w-full text-left p-2 rounded-lg transition-all duration-300 mb-1 ${
                  index === currentTrack 
                    ? 'bg-gold/20 text-gold border border-gold/30 shadow-[0_0_10px_hsl(var(--gold)/0.3)]' 
                    : 'text-gold/80 hover:bg-gold/10 hover:border hover:border-gold/20'
                }`}
              >
                <div className="text-sm font-medium truncate">{track.name}</div>
                <div className="text-xs text-gold/40">
                  {formatTime(track.duration_ms / 1000)}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gold/20">
            <p className="text-xs text-gold/40 text-center">
              Full album tracks • Place MP3 files in /public/audio/
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;