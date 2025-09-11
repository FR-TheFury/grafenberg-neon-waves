import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Play, Pause } from 'lucide-react';
import albumArtwork from '@/assets/Album_artwork.png';

interface Track {
  id: string;
  name: string;
  preview_url: string;
  duration_ms: number;
  track_number: number;
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

  // Album tracks data
  const base = import.meta.env.BASE_URL || '/';
  const tracks: Track[] = [
    {
      id: '1',
      name: 'Nazar Engine',
      preview_url: `${base}audio/01 - Nazar Engine.mp3`,
      duration_ms: 240000, // Placeholder duration
      track_number: 1,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
    },
    {
      id: '2', 
      name: 'Pomegranate Static',
      preview_url: `${base}audio/02 - Pomegranate Static.mp3`,
      duration_ms: 220000,
      track_number: 2,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
    },
    {
      id: '3',
      name: 'Order Eats The Sun',
      preview_url: `${base}audio/03 - Order Eats The Sun.mp3`,
      duration_ms: 260000,
      track_number: 3,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
    },
    {
      id: '4',
      name: 'Tape Ghost Mirage',
      preview_url: `${base}audio/04 - Tape Ghost Mirage.mp3`,
      duration_ms: 230000,
      track_number: 4,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
    },
    {
      id: '5',
      name: 'Black Salt',
      preview_url: `${base}audio/05 - Black Salt.mp3`,
      duration_ms: 250000,
      track_number: 5,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
    },
    {
      id: '6',
      name: 'Chrome killim',
      preview_url: `${base}audio/06 - Chrome killim.mp3`,
      duration_ms: 270000,
      track_number: 6,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
    },
    {
      id: '7',
      name: 'Loom of Wires',
      preview_url: `${base}audio/07 -  Loom of Wires.mp3`,
      duration_ms: 240000,
      track_number: 7,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
    },
    {
      id: '8',
      name: 'VHS Desert Prayer',
      preview_url: `${base}audio/08 - VHS Desert Prayer.mp3`,
      duration_ms: 280000,
      track_number: 8,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
    },
    {
      id: '9',
      name: 'Motor Moon Communion',
      preview_url: `${base}audio/09 - Motor Moon Communion.mp3`,
      duration_ms: 290000,
      track_number: 9,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
    },
    {
      id: '10',
      name: 'Seraph on the Faultline',
      preview_url: `${base}audio/10 - Seraph on the Faultline.mp3`,
      duration_ms: 310000,
      track_number: 10,
      description: 'Description à remplir...',
      lyrics: 'Lyrics à remplir...'
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
              Découvrez les 10 titres de "No Saints, No Proof"
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
                            src={albumArtwork} 
                            alt={`${track.name} artwork`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          
                          {/* Play button overlay */}
                          <div className="absolute inset-0 bg-bronze/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button
                              variant="default"
                              size="lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isCurrentTrackPlaying(index)) {
                                  onPause?.();
                                } else {
                                  handlePlayTrack(index);
                                }
                              }}
                              className="rounded-full w-16 h-16 bg-gradient-to-r from-gold to-amber hover:from-gold-light hover:to-gold border border-gold/30 shadow-[0_0_20px_hsl(var(--gold)/0.4)] hover:shadow-[0_0_30px_hsl(var(--gold)/0.6)]"
                            >
                              {isCurrentTrackPlaying(index) ? 
                                <Pause className="w-8 h-8 text-bronze" /> : 
                                <Play className="w-8 h-8 text-bronze" />
                              }
                            </Button>
                          </div>

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
                {/* Image and controls */}
                <div className="space-y-6">
                  <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-gold/30">
                    <img 
                      src={albumArtwork} 
                      alt={`${selectedTrack.name} artwork`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="default"
                        size="lg"
                        onClick={() => {
                          const trackIndex = tracks.findIndex(t => t.id === selectedTrack.id);
                          if (isCurrentTrackPlaying(trackIndex)) {
                            onPause?.();
                          } else {
                            handlePlayTrack(trackIndex);
                          }
                        }}
                        className="rounded-full w-16 h-16 bg-gradient-to-r from-gold to-amber hover:from-gold-light hover:to-gold border border-gold/30 shadow-[0_0_20px_hsl(var(--gold)/0.4)] hover:shadow-[0_0_30px_hsl(var(--gold)/0.6)]"
                      >
                        {isCurrentTrackPlaying(tracks.findIndex(t => t.id === selectedTrack.id)) ? 
                          <Pause className="w-8 h-8 text-bronze" /> : 
                          <Play className="w-8 h-8 text-bronze" />
                        }
                      </Button>
                    </div>
                    <p className="text-gold/80 text-lg font-medium">
                      Durée: {formatTime(selectedTrack.duration_ms)}
                    </p>
                  </div>
                </div>

                {/* Description and lyrics */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-orbitron text-xl text-gold mb-3">Description</h3>
                    <p className="text-gold/80 leading-relaxed">
                      {selectedTrack.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-orbitron text-xl text-gold mb-3">Paroles</h3>
                    <div className="bg-bronze/10 rounded-lg p-4 border border-gold/20">
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