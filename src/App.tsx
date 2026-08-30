import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AcademicsSection } from './components/AcademicsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { FacultySection } from './components/FacultySection';
import { NoticesAndEvents } from './components/NoticesAndEvents';
import { TransportSection } from './components/TransportSection';
import { GallerySection } from './components/GallerySection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { StudentPortal } from './components/StudentPortal';
import { VirtualTourModal } from './components/VirtualTourModal';
import { QuickSearchModal } from './components/QuickSearchModal';

export function App() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Keyboard shortcut for search (Ctrl + K or Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenAdmissions = () => {
    const el = document.getElementById('admissions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSearchSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-red-500 selection:text-white flex flex-col font-sans">
      
      {/* Sticky Header Navbar */}
      <Navbar
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenAdmissions={handleOpenAdmissions}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* Hero Section with Unobstructed Slider & Light Red Introduction */}
        <Hero
          onOpenAdmissions={handleOpenAdmissions}
          onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* Academics & Curriculum Explorer */}
        <AcademicsSection
          onOpenAdmissions={handleOpenAdmissions}
        />

        {/* Campus Facilities & Infrastructure */}
        <FacilitiesSection />

        {/* Faculty & Academic Leadership */}
        <FacultySection />

        {/* Official Notices & Upcoming Events Calendar */}
        <NoticesAndEvents />

        {/* Life at Little Flower Photo Gallery & Lightbox */}
        <GallerySection
          onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
        />

        {/* School Bus Transit Network */}
        <TransportSection />

        {/* 3-Step Online Admissions Form & Scholarship Estimator */}
        <AdmissionsSection />

        {/* Community Testimonials & FAQ Accordion */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenAdmissions={handleOpenAdmissions}
      />

      {/* Interactive Modals */}
      <StudentPortal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />

      <VirtualTourModal
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
        onOpenAdmissions={handleOpenAdmissions}
      />

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAction={handleSelectSearchSection}
      />

      {/* Floating WhatsApp Quick Connect Button */}
      <a
        href="https://wa.me/9779840159560?text=Hello%20Little%20Flower%20Secondary%20School,%20I%20have%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group cursor-pointer border-2 border-white"
        title="Chat on WhatsApp (+9779840159560)"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold font-sans">
          WhatsApp Us
        </span>
      </a>

    </div>
  );
}

export default App;
