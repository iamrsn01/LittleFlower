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

        {/* School Bus Transit Network */}
        <TransportSection />

        {/* Life at Little Flower Photo Gallery & Lightbox */}
        <GallerySection
          onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
        />

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

    </div>
  );
}

export default App;
