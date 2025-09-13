import { Button } from '@/components/ui/button';
import { ChevronDown, Play } from 'lucide-react';
import backgroundAsset from '@/assets/Background.png';
import spotifyLogo from '@/assets/Spotify.png';
import appleLogo from '@/assets/Apple.png';
import deezerLogo from '@/assets/Deezer.png';
import bandcampLogo from '@/assets/bandcamp.png';
import amazonLogo from '@/assets/Amazon music.png';

const Hero = () => {
  const streamingPlatforms = [
    {
      name: 'Apple Music',
      url: 'https://music.apple.com/fr/album/no-saints-no-proof/1838489546',
      logo: appleLogo,
      color: 'hover-glow-cyan',
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/intl-fr/album/1Rc7HhHY8dFrqlrQePv1TZ',
      logo: spotifyLogo,
      color: 'hover-glow-orange',
    },
    {
      name: 'Deezer',
      url: 'https://www.deezer.com/en/album/818044871',
      logo: deezerLogo,
      color: 'hover-glow-magenta',
    },
    {
      name: 'Bandcamp',
      url: 'https://grafenbergnoir.bandcamp.com/album/no-saints-no-proof',
      logo: bandcampLogo,
      color: 'hover-glow-violet',
    },
    {
      name: 'Amazon Music',
      url: 'https://music.amazon.com',
      logo: amazonLogo,
      color: 'hover-glow-cyan',
    },
  ];

  const scrollToHighlights = () => {
    const element = document.getElementById('highlights');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${backgroundAsset})`,
        }}
      />
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-vignette" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/40 to-transparent" />
      
      {/* Scanlines Effect */}
      <div className="absolute inset-0 scanlines opacity-30" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main Title */}
        <h1 className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl mb-6 text-gradient-neon drop-shadow-2xl animate-slide-up">
          GRAFENBERG
        </h1>
        
        {/* Subtitle */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-orbitron text-2xl md:text-4xl lg:text-5xl mb-2 text-foreground">
            No Saints, No Proof
          </h2>
          <div className="waveform max-w-xs mx-auto mb-4 opacity-80" />
          <p className="text-xl md:text-2xl text-neon-cyan font-light">
            Out Now
          </p>
        </div>

        {/* Main CTA */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button
            asChild
            variant="default"
            size="lg"
            className="text-xl"
          >
            <a
              href="https://open.spotify.com/intl-fr/album/1Rc7HhHY8dFrqlrQePv1TZ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Play className="mr-3 h-6 w-6" />
              Listen Here
            </a>
          </Button>
        </div>

        {/* Platform Badges */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-muted-foreground mb-6 text-lg">Available on all platforms</p>
          <div className="flex flex-wrap justify-center gap-4">
            {streamingPlatforms.map((platform) => {
              return (
                <Button
                  key={platform.name}
                  asChild
                  variant="outline"
                  className={`glass border-white/20 text-foreground hover:text-deep transition-all duration-300 ${platform.color} p-3`}
                >
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <img 
                      src={platform.logo} 
                      alt={platform.name}
                      className="h-10 w-auto"
                    />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToHighlights}
          className="animate-float text-neon-cyan hover:text-neon-orange transition-colors duration-300"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-medium">Discover More</span>
            <ChevronDown className="h-6 w-6" />
            <ChevronDown className="h-6 w-6 -mt-3 opacity-60" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;