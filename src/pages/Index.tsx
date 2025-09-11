import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AlbumHighlights from '@/components/AlbumHighlights';
import Artist from '@/components/Artist';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import AudioPlayer from '@/components/AudioPlayer';
import CursorTrail from '@/components/CursorTrail';

const Index = () => {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section > div');
    sections.forEach((section) => {
      section.classList.add('opacity-0', 'translate-y-8');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-deep overflow-x-hidden">
      <CursorTrail />
      <ScrollProgress />
      <Navbar />
      <AudioPlayer />
      <main>
        <Hero />
        <AlbumHighlights />
        <Artist />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;