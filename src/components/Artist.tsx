import React from 'react';
import { Button } from '@/components/ui/button';
import { Music2, Zap, Headphones, Star } from 'lucide-react';

const Artist = () => {
  const highlights = [
    {
      icon: Music2,
      title: 'Electronic Producer',
      description: 'Creating immersive synthwave soundscapes'
    },
    {
      icon: Zap,
      title: 'Sound Designer',
      description: 'Crafting unique digital atmospheres'
    },
    {
      icon: Headphones,
      title: 'Mixing Engineer',
      description: 'Precision audio engineering and mastering'
    },
    {
      icon: Star,
      title: 'Creative Vision',
      description: 'Blending retro aesthetics with modern production'
    }
  ];

  return (
    <section id="artist" className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-surface/10 to-deep" />
      
      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-gradient-neon">
            The Artist
          </h2>
          <div className="waveform max-w-xs mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the creative mind behind the synthwave experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Artist Info */}
          <div className="space-y-8">
            <div className="bg-bronze/20 backdrop-blur-xl border-2 border-gold/30 rounded-2xl p-8 shadow-[0_0_30px_hsl(var(--gold)/0.3)]">
              <h3 className="font-orbitron font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">
                Ludovic Debay
              </h3>
              <p className="text-lg text-gold/80 mb-6 font-medium">
                Alias <span className="text-gold">GRAFENBERG</span>
              </p>
              
              <div className="space-y-4 text-gold/70 leading-relaxed">
                <p>
                  Electronic music producer and sound designer specializing in synthwave and retrowave genres. 
                  With a passion for creating immersive sonic landscapes that blend nostalgic 80s aesthetics 
                  with contemporary production techniques.
                </p>
                <p>
                  Drawing inspiration from cyberpunk culture, neon-lit cityscapes, and vintage synthesizers, 
                  Grafenberg crafts each track to transport listeners into a world of digital dreams and 
                  electric emotions.
                </p>
                <p>
                  The latest album "No Saints, No Proof" represents a journey through synthetic soundscapes, 
                  exploring themes of technology, nostalgia, and the human experience in a digital age.
                </p>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div
                  key={index}
                  className="bg-bronze/15 backdrop-blur-xl border border-gold/20 rounded-xl p-6 hover:border-gold/40 hover:bg-bronze/25 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--gold)/0.2)] group"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gold/20 rounded-lg border border-gold/30 group-hover:bg-gold/30 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <h4 className="font-orbitron font-bold text-lg text-gold mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gold/60 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-bronze/20 backdrop-blur-xl border-2 border-gold/30 rounded-2xl p-8 shadow-[0_0_30px_hsl(var(--gold)/0.3)] inline-block">
            <p className="text-gold/70 mb-6 text-lg">
              Connect and follow the journey
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="streaming"
                size="lg"
                className="bg-gradient-to-r from-gold to-amber hover:from-gold-light hover:to-gold border border-gold/30 text-bronze hover:shadow-[0_0_20px_hsl(var(--gold)/0.4)]"
                asChild
              >
                <a href="#contact">
                  <Music2 className="w-5 h-5" />
                  <span>Follow on Platforms</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artist;