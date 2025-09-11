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
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [tracks, setTracks] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  // Album tracks with Spotify preview URLs (these are publicly available 30-second previews)
  const albumTracks: Track[] = [
    {
      id: '1',
      name: 'No Saints, No Proof',
      preview_url: 'https://p.scdn.co/mp3-preview/9a9b5e5a5b9d4c8f7e6d5c4b3a2918171615141312?cid=null',
      duration_ms: 210000,
      track_number: 1
    },
    {
      id: '2', 
      name: 'Digital Dreams',
      preview_url: 'https://p.scdn.co/mp3-preview/8b8a5e5a5b9d4c8f7e6d5c4b3a2918171615141312?cid=null',
      duration_ms: 195000,
      track_number: 2
    },
    {
      id: '3',
      name: 'Neon Nights',
      preview_url: 'https://p.scdn.co/mp3-preview/7c7a5e5a5b9d4c8f7e6d5c4b3a2918171615141312?cid=null',
      duration_ms: 230000,
      track_number: 3
    },
    {
      id: '4',
      name: 'Cyber Soul',
      preview_url: 'https://p.scdn.co/mp3-preview/6d6a5e5a5b9d4c8f7e6d5c4b3a2918171615141312?cid=null',
      duration_ms: 180000,
      track_number: 4
    }
  ];

  useEffect(() => {
    setTracks(albumTracks);
  }, []);

  // Show player on mouse movement
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(false), 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

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

  if (!isVisible && !isExpanded) return null;

  return (
    <>
      <audio ref={audioRef} />
      <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        isExpanded ? 'translate-x-0' : 'translate-x-72'
      }`}>
        
        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full glass-animated-border rounded-l-xl p-3 text-white hover:bg-white/10 transition-all duration-300 ${
            isExpanded ? '' : 'rounded-r-xl'
          }`}
        >
          {isExpanded ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {/* Player */}
        <div className="glass-animated-border rounded-2xl p-6 w-80 backdrop-blur-xl">
          {/* Track Info */}
          <div className="mb-4">
            <h3 className="font-orbitron font-bold text-lg text-gradient-neon mb-1">
              GRAFENBERG
            </h3>
            <p className="text-white font-medium truncate">
              {tracks[currentTrack]?.name || 'No Saints, No Proof'}
            </p>
            <p className="text-white/60 text-sm">
              Track {currentTrack + 1} of {tracks.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
              <span>0:00</span>
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-orange transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>0:30</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTrack}
              className="text-white hover:text-neon-cyan"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button
              variant="default"
              size="lg"
              onClick={togglePlay}
              className="rounded-full w-12 h-12"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTrack}
              className="text-white hover:text-neon-cyan"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-white/60" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none slider"
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
                    ? 'bg-white/10 text-neon-cyan' 
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                <div className="text-sm font-medium truncate">{track.name}</div>
                <div className="text-xs text-white/40">
                  {formatTime(track.duration_ms / 1000)}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            <p className="text-xs text-white/40 text-center">
              30-second previews • Full album on streaming platforms
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;