import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/Grafenberg.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-neon-orange via-neon-cyan to-neon-magenta transition-all duration-300"
          style={{
            width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
          }}
        />
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass py-4' : 'py-6'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="hover:scale-105 transition-transform duration-300"
          >
            <img 
              src={logo} // Replace this path with your PNG file path
              alt="GRAFENBERG Logo"
              className="h-12 w-auto"
            />
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-neon-cyan transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-neon-cyan transition-colors duration-300 font-medium"
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <Button
            asChild
            variant="secondary"
            size="sm"
          >
            <a
              href="https://open.spotify.com/intl-fr/album/1Rc7HhHY8dFrqlrQePv1TZ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen Now
            </a>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;