import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Play, Pause, Volume2 } from 'lucide-react';
import albumArtwork from '@/assets/Album_artwork.png';
import imgNazar from '@/assets/Nazar Engine.png';
import imgPomegranate from '@/assets/Pomegranate Static.png';
import imgOrder from '@/assets/Order eats the sun.png';
import imgTape from '@/assets/Tape Ghost Mirage.png';
import imgBlack from '@/assets/Black Salt.png';
import imgChrome from '@/assets/Chrome Killim.png';
import imgLoom from '@/assets/Loom of Wires.png';
import imgVhs from '@/assets/VHS DESERT PRAYER.png';
import imgMotor from '@/assets/Motor Moon Communion.png';
import imgSeraph from '@/assets/Seraph on the Faultline.png';

interface Track {
  id: string;
  name: string;
  preview_url: string;
  duration_ms: number;
  track_number: number;
  image: string;
  description?: string;
  lyrics?: string;
}

interface TrackCarouselProps {
  onTrackPlay?: (trackIndex: number) => void;
  currentPlayingTrack?: number;
  isPlaying?: boolean;
  onPause?: () => void;
}

const TrackCarousel: React.FC<TrackCarouselProps> = ({ 
  onTrackPlay, 
  currentPlayingTrack = -1, 
  isPlaying = false,
  onPause 
}) => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Pause modal audio when main player starts playing
  useEffect(() => {
    if (isPlaying && modalPlaying) {
      setModalPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, modalPlaying]);

  // Album tracks data
  const base = import.meta.env.BASE_URL || '/';
  const tracks: Track[] = [
    {
      id: '1',
      name: 'Nazar Engine',
      preview_url: `${base}audio/01 - Nazar Engine.mp3`,
      duration_ms: 240000, // Placeholder duration
      track_number: 1,
      image: imgNazar, // To be replaced with actual image
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    },
    {
      id: '2', 
      name: 'Pomegranate Static',
      preview_url: `${base}audio/02 - Pomegranate Static.mp3`,
      duration_ms: 220000,
      track_number: 2,
      image: imgPomegranate,
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    },
    {
      id: '3',
      name: 'Order Eats The Sun',
      preview_url: `${base}audio/03 - Order Eats The Sun.mp3`,
      duration_ms: 260000,
      track_number: 3,
      image: imgOrder,
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    },
    {
      id: '4',
      name: 'Tape Ghost Mirage',
      preview_url: `${base}audio/04 - Tape Ghost Mirage.mp3`,
      duration_ms: 230000,
      track_number: 4,
      image: imgTape,
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    },
    {
      id: '5',
      name: 'Black Salt',
      preview_url: `${base}audio/05 - Black Salt.mp3`,
      duration_ms: 250000,
      track_number: 5,
      image: imgBlack,
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    },
    {
      id: '6',
      name: 'Chrome killim',
      preview_url: `${base}audio/06 - Chrome killim.mp3`,
      duration_ms: 270000,
      track_number: 6,
      image: imgChrome,
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    },
    {
      id: '7',
      name: 'Loom of Wires',
      preview_url: `${base}audio/07 -  Loom of Wires.mp3`,
      duration_ms: 240000,
      track_number: 7,
      image: imgLoom,
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    },
    {
      id: '8',
      name: 'VHS Desert Prayer',
      preview_url: `${base}audio/08 - VHS Desert Prayer.mp3`,
      duration_ms: 280000,
      track_number: 8,
      image: imgVhs,
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    },
    {
      id: '9',
      name: 'Motor Moon Communion',
      preview_url: `${base}audio/09 - Motor Moon Communion.mp3`,
      duration_ms: 290000,
      track_number: 9,
      image: imgMotor,
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    },
    {
      id: '10',
      name: 'Seraph on the Faultline',
      preview_url: `${base}audio/10 - Seraph on the Faultline.mp3`,
      duration_ms: 310000,
      track_number: 10,
      image: imgSeraph,
      description: 'Track description to be filled...',
      lyrics: 'Track lyrics to be filled...'
    }
  ];

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrackClick = (track: Track) => {
    setSelectedTrack(track);
    setModalOpen(true);
    setModalPlaying(false);
    setCurrentTime(0);
    // Pause main audio player
    onPause?.();
  };

  const handleModalPlay = () => {
    if (audioRef.current) {
      if (modalPlaying) {
        audioRef.current.pause();
        setModalPlaying(false);
      } else {
        // Pause main audio player
        onPause?.();
        audioRef.current.play();
        setModalPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTimeDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayTrack = (trackIndex: number) => {
    if (onTrackPlay) {
      onTrackPlay(trackIndex);
    }
  };

  const isCurrentTrackPlaying = (trackIndex: number) => {
    return currentPlayingTrack === trackIndex && isPlaying;
  };

  return (
    <>
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent mb-6">
              TRACKLIST
            </h2>
            <p className="text-gold/80 text-lg max-w-2xl mx-auto">
              Discover the 10 tracks from "No Saints, No Proof"
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {tracks.map((track, index) => (
                  <CarouselItem key={track.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div 
                      className="group cursor-pointer"
                      onClick={() => handleTrackClick(track)}
                    >
                      <div className="relative overflow-hidden rounded-xl border-2 border-gold/20 bg-bronze/10 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_30px_hsl(var(--gold)/0.3)] hover:scale-105">
                        {/* Track Image */}
                        <div className="aspect-square relative overflow-hidden">
                          <img 
                            src={track.image} 
                            alt={`${track.name} artwork`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              // Fallback to album artwork if individual track image fails
                              (e.target as HTMLImageElement).src = albumArtwork;
                            }}
                          />

                          {/* Track number */}
                          <div className="absolute top-3 left-3 bg-bronze/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                            <span className="text-gold font-bold text-sm">{track.track_number}</span>
                          </div>
                        </div>

                        {/* Track Info */}
                        <div className="p-4">
                          <h3 className="font-orbitron font-bold text-gold text-lg mb-2 line-clamp-2 group-hover:text-amber transition-colors">
                            {track.name}
                          </h3>
                          <p className="text-gold/60 text-sm">
                            {formatTime(track.duration_ms)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-gold/30 bg-bronze/20 text-gold hover:bg-gold/20 hover:border-gold/50" />
              <CarouselNext className="border-gold/30 bg-bronze/20 text-gold hover:bg-gold/20 hover:border-gold/50" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-deep border-2 border-gold/30">
          {selectedTrack && (
            <>
              <DialogHeader>
                <DialogTitle className="font-orbitron text-2xl bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">
                  {selectedTrack.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                {/* Image */}
                <div className="space-y-6">
                  <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-gold/30">
                    <img 
                      src={selectedTrack.image} 
                      alt={`${selectedTrack.name} artwork`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = albumArtwork;
                      }}
                    />
                  </div>
                </div>

                {/* Audio Player and Content */}
                <div className="space-y-6">
                  {/* Audio Player */}
                  <div className="bg-bronze/10 rounded-lg p-6 border border-gold/20">
                    <audio 
                      ref={audioRef}
                      src={selectedTrack.preview_url}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={() => setModalPlaying(false)}
                    />
                    
                    {/* Play Button */}
                    <div className="flex items-center justify-center mb-4">
                      <Button
                        variant="default"
                        size="lg"
                        onClick={handleModalPlay}
                        className="rounded-full w-16 h-16 bg-gradient-to-r from-gold to-amber hover:from-gold-light hover:to-gold border border-gold/30 shadow-[0_0_20px_hsl(var(--gold)/0.4)] hover:shadow-[0_0_30px_hsl(var(--gold)/0.6)]"
                      >
                        {modalPlaying ? 
                          <Pause className="w-8 h-8 text-bronze" /> : 
                          <Play className="w-8 h-8 text-bronze" />
                        }
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-2 bg-bronze/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
                      />
                      
                      {/* Time Display */}
                      <div className="flex justify-between text-gold/80 text-sm">
                        <span>{formatTimeDisplay(currentTime)}</span>
                        <span>{formatTimeDisplay(duration)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-orbitron text-xl text-gold mb-3">Description</h3>
                    <p className="text-gold/80 leading-relaxed">
                      {selectedTrack.description}
                    </p>
                  </div>
                  
                  {/* Lyrics */}
                  <div>
                    <h3 className="font-orbitron text-xl text-gold mb-3">Lyrics</h3>
                    <div className="bg-bronze/10 rounded-lg p-4 border border-gold/20 max-h-60 overflow-y-auto">
                      <pre className="text-gold/80 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {selectedTrack.lyrics}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrackCarousel;