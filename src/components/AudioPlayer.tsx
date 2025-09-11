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

  // Album tracks with real track names
  const albumTracks: Track[] = [
    {
      id: '1',
      name: 'Nazar Engine',
      preview_url: '/audio/01-nazar-engine.wav',
      duration_ms: 0, // Will be updated when audio loads
      track_number: 1
    },
    {
      id: '2', 
      name: 'Pomegranate Static',
      preview_url: '/audio/02-pomegranate-static.wav',
      duration_ms: 0,
      track_number: 2
    },
    {
      id: '3',
      name: 'Order Eats The Sun',
      preview_url: '/audio/03-order-eats-the-sun.wav',
      duration_ms: 0,
      track_number: 3
    },
    {
      id: '4',
      name: 'Tape Ghost Mirage',
      preview_url: '/audio/04-tape-ghost-mirage.wav',
      duration_ms: 0,
      track_number: 4
    },
    {
      id: '5',
      name: 'Black Salt',
      preview_url: '/audio/05-black-salt.wav',
      duration_ms: 0,
      track_number: 5
    },
    {
      id: '6',
      name: 'Chrome killim',
      preview_url: '/audio/06-chrome-killim.wav',
      duration_ms: 0,
      track_number: 6
    },
    {
      id: '7',
      name: 'Loom of Wires',
      preview_url: '/audio/07-loom-of-wires.wav',
      duration_ms: 0,
      track_number: 7
    },
    {
      id: '8',
      name: 'VHS Desert Prayer',
      preview_url: '/audio/08-vhs-desert-prayer.wav',
      duration_ms: 0,
      track_number: 8
    },
    {
      id: '9',
      name: 'Motor Moon Communion',
      preview_url: '/audio/09-motor-moon-communion.wav',
      duration_ms: 0,
      track_number: 9
    },
    {
      id: '10',
      name: 'Seraph on the Faultline',
      preview_url: '/audio/10-seraph-on-the-faultline.wav',
      duration_ms: 0,
      track_number: 10
    }
  ];

  useEffect(() => {
    setTracks(albumTracks);
    
    // Auto-play on page load
    const startAutoPlay = () => {
      setIsPlaying(true);
      const audio = audioRef.current;
      if (audio && albumTracks[0]?.preview_url) {
        audio.src = albumTracks[0].preview_url;
        audio.play().catch(console.error);
      }
    };

    // Auto-play on first mouse movement
    const handleFirstMouseMove = () => {
      startAutoPlay();
      document.removeEventListener('mousemove', handleFirstMouseMove);
    };

    // Try immediate autoplay, fallback to mouse movement
    const timeoutId = setTimeout(() => {
      startAutoPlay();
    }, 1000);

    document.addEventListener('mousemove', handleFirstMouseMove);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousemove', handleFirstMouseMove);
    };
  }, []);

  // Remove mouse movement visibility logic - player always visible

  // Audio setup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration) {
        // Update the duration in tracks state when audio loads
        setTracks(prevTracks => 
          prevTracks.map((track, index) => 
            index === currentTrack 
              ? { ...track, duration_ms: audio.duration * 1000 }
              : track
          )
        );
      }
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
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
              Track {(currentTrack + 1).toString().padStart(2, '0')} of {tracks.length}
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
              <span>{formatTime(tracks[currentTrack]?.duration_ms / 1000 || 0)}</span>
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
              Full album tracks • Place WAV files in /public/audio/
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;