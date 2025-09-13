import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import spotifyLogo from '@/assets/Spotify.png';
import appleLogo from '@/assets/Apple.png';
import deezerLogo from '@/assets/Deezer.png';
import bandcampLogo from '@/assets/bandcamp.png';
import amazonLogo from '@/assets/Amazon music.png';

const Contact = () => {
  const streamingPlatforms = [
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/intl-fr/album/1Rc7HhHY8dFrqlrQePv1TZ',
      logo: spotifyLogo,
      color: 'hover-glow-cyan'
    },
    {
      name: 'Apple Music',
      url: 'https://music.apple.com/fr/album/no-saints-no-proof/1838489546',
      logo: appleLogo,
      color: 'hover-glow-orange'
    },
    {
      name: 'Deezer',
      url: 'https://www.deezer.com/en/album/818044871',
      logo: deezerLogo,
      color: 'hover-glow-magenta'
    },
    {
      name: 'Bandcamp',
      url: 'https://grafenbergnoir.bandcamp.com/album/no-saints-no-proof',
      logo: bandcampLogo,
      color: 'hover-glow-violet'
    },
    {
      name: 'Amazon Music',
      url: 'https://music.amazon.fr/albums/B0FQ6RLCMV',
      logo: amazonLogo,
      color: 'hover-glow-cyan'
    }
  ];

  return (
    <section id="contact" className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-surface/20 to-deep/80" />
      
      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-gradient-neon">
            Contact
          </h2>
          <div className="waveform max-w-xs mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reach out to me on streaming platforms for collaborations, bookings, or feedback
          </p>
        </div>

        <div className="bg-bronze/20 backdrop-blur-xl border-2 border-gold/30 rounded-2xl p-12 shadow-[0_0_30px_hsl(var(--gold)/0.3)]">
          <h3 className="font-orbitron font-bold text-2xl md:text-3xl mb-8 bg-gradient-to-r from-gold to-amber bg-clip-text text-transparent">
            Contact me on streaming platforms
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {streamingPlatforms.map((platform) => {
              return (
                <Button
                  key={platform.name}
                  asChild
                  variant="streaming"
                  size="lg"
                  className={`group transition-all duration-300 ${platform.color} justify-between`}
                >
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={platform.logo} 
                      alt={platform.name}
                      className="h-12 w-auto group-hover:scale-110 transition-transform duration-300"
                    />
                    <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </Button>
              );
            })}
          </div>
          
          <div className="pt-8 border-t border-gold/20">
            <p className="text-gold/60">
              Follow and message me directly on your preferred platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;