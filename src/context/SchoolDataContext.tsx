import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  galleryItems as defaultGalleryItems, 
  schoolNotices as defaultSchoolNotices, 
  facultyMembers as defaultFacultyMembers, 
  GalleryItem, 
  SchoolNotice, 
  FacultyMember 
} from '../data/schoolData';

import coverImg from '../assets/slider/cover.jpg';
import slider1 from '../assets/slider/1.jpg';
import slider2 from '../assets/slider/2.JPG';
import slider3 from '../assets/slider/3.JPG';
import slider4 from '../assets/slider/4.JPG';
import slider5 from '../assets/slider/5.JPG';
import slider6 from '../assets/slider/6.JPG';
import slider7 from '../assets/slider/7.JPG';

export interface HeroSlide {
  id: string | number;
  image: string;
  caption: string;
  location: string;
  isActive?: boolean;
}

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    image: coverImg,
    caption: 'Little Flower Secondary School — Welcome & Campus Overview',
    location: 'Birgunj-21, Parwanipur, Parsa (Estd. 2005)',
    isActive: true
  },
  {
    id: 2,
    image: slider1,
    caption: 'Little Flower Secondary School — Campus Life & Student Activities',
    location: 'Parwanipur, Parsa',
    isActive: true
  },
  {
    id: 3,
    image: slider2,
    caption: 'Little Flower Secondary School — Annual Event & Campus Showcase',
    location: 'Auditorium & Parade Grounds',
    isActive: true
  },
  {
    id: 4,
    image: slider3,
    caption: 'Little Flower Secondary School — Student Leadership & Assembly',
    location: 'Parwanipur, Parsa',
    isActive: true
  },
  {
    id: 5,
    image: slider4,
    caption: 'Little Flower Secondary School — Sports & Co-Curricular Excellence',
    location: 'Green Playground & Sports Grounds',
    isActive: true
  },
  {
    id: 6,
    image: slider5,
    caption: 'Little Flower Secondary School — Cultural Festivities & Performances',
    location: 'School Auditorium Stage',
    isActive: true
  },
  {
    id: 7,
    image: slider6,
    caption: 'Little Flower Secondary School — Mentorship & Graduation Honor',
    location: 'Parwanipur, Parsa',
    isActive: true
  },
  {
    id: 8,
    image: slider7,
    caption: 'Little Flower Secondary School — School Community & Celebrations',
    location: 'Parwanipur, Parsa',
    isActive: true
  }
];

interface SchoolDataContextType {
  // Data
  heroSlides: HeroSlide[];
  galleryItems: GalleryItem[];
  schoolNotices: SchoolNotice[];
  facultyMembers: FacultyMember[];

  // Hero Slider CRUD
  addSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateSlide: (id: string | number, slide: Partial<HeroSlide>) => void;
  deleteSlide: (id: string | number) => void;
  reorderSlides: (startIndex: number, endIndex: number) => void;

  // Gallery CRUD
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Notices CRUD
  addNotice: (notice: Omit<SchoolNotice, 'id'>) => void;
  updateNotice: (id: string, notice: Partial<SchoolNotice>) => void;
  deleteNotice: (id: string) => void;

  // Faculty CRUD
  addFacultyMember: (member: Omit<FacultyMember, 'id'>) => void;
  updateFacultyMember: (id: string, member: Partial<FacultyMember>) => void;
  deleteFacultyMember: (id: string) => void;

  // Global Management
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'lfs_admin_content_store_v1';

const SchoolDataContext = createContext<SchoolDataContextType | undefined>(undefined);

export const SchoolDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_slides');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading slides from storage:', e);
    }
    return defaultHeroSlides;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_gallery');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading gallery from storage:', e);
    }
    return defaultGalleryItems;
  });

  const [schoolNotices, setSchoolNotices] = useState<SchoolNotice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_notices');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading notices from storage:', e);
    }
    return defaultSchoolNotices;
  });

  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_faculty');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading faculty from storage:', e);
    }
    return defaultFacultyMembers;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_slides', JSON.stringify(heroSlides));
    } catch (e) {
      console.warn('Could not save slides to localStorage:', e);
    }
  }, [heroSlides]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_gallery', JSON.stringify(galleryItems));
    } catch (e) {
      console.warn('Could not save gallery to localStorage:', e);
    }
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_notices', JSON.stringify(schoolNotices));
    } catch (e) {
      console.warn('Could not save notices to localStorage:', e);
    }
  }, [schoolNotices]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_faculty', JSON.stringify(facultyMembers));
    } catch (e) {
      console.warn('Could not save faculty to localStorage:', e);
    }
  }, [facultyMembers]);

  // ==========================================
  // HERO SLIDER METHODS
  // ==========================================
  const addSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slide,
      id: Date.now(),
      isActive: slide.isActive ?? true
    };
    setHeroSlides(prev => [newSlide, ...prev]);
  };

  const updateSlide = (id: string | number, slide: Partial<HeroSlide>) => {
    setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, ...slide } : s));
  };

  const deleteSlide = (id: string | number) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  const reorderSlides = (startIndex: number, endIndex: number) => {
    setHeroSlides(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  // ==========================================
  // GALLERY METHODS
  // ==========================================
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `g-${Date.now()}`
    };
    setGalleryItems(prev => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, item: Partial<GalleryItem>) => {
    setGalleryItems(prev => prev.map(g => g.id === id ? { ...g, ...item } : g));
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  // ==========================================
  // NOTICES METHODS
  // ==========================================
  const addNotice = (notice: Omit<SchoolNotice, 'id'>) => {
    const newNotice: SchoolNotice = {
      ...notice,
      id: `not-${Date.now()}`
    };
    setSchoolNotices(prev => [newNotice, ...prev]);
  };

  const updateNotice = (id: string, notice: Partial<SchoolNotice>) => {
    setSchoolNotices(prev => prev.map(n => n.id === id ? { ...n, ...notice } : n));
  };

  const deleteNotice = (id: string) => {
    setSchoolNotices(prev => prev.filter(n => n.id !== id));
  };

  // ==========================================
  // FACULTY METHODS
  // ==========================================
  const addFacultyMember = (member: Omit<FacultyMember, 'id'>) => {
    const newMember: FacultyMember = {
      ...member,
      id: `fac-${Date.now()}`
    };
    setFacultyMembers(prev => [...prev, newMember]);
  };

  const updateFacultyMember = (id: string, member: Partial<FacultyMember>) => {
    setFacultyMembers(prev => prev.map(f => f.id === id ? { ...f, ...member } : f));
  };

  const deleteFacultyMember = (id: string) => {
    setFacultyMembers(prev => prev.filter(f => f.id !== id));
  };

  // ==========================================
  // GLOBAL RESET & EXPORT/IMPORT
  // ==========================================
  const resetToDefaults = () => {
    setHeroSlides(defaultHeroSlides);
    setGalleryItems(defaultGalleryItems);
    setSchoolNotices(defaultSchoolNotices);
    setFacultyMembers(defaultFacultyMembers);
    try {
      localStorage.removeItem(STORAGE_KEY + '_slides');
      localStorage.removeItem(STORAGE_KEY + '_gallery');
      localStorage.removeItem(STORAGE_KEY + '_notices');
      localStorage.removeItem(STORAGE_KEY + '_faculty');
    } catch (e) {
      console.warn('Error clearing storage:', e);
    }
  };

  const exportDataJSON = () => {
    const backup = {
      version: '1.0',
      school: 'Little Flower Secondary School',
      exportedAt: new Date().toISOString(),
      heroSlides,
      galleryItems,
      schoolNotices,
      facultyMembers
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.heroSlides && Array.isArray(data.heroSlides)) setHeroSlides(data.heroSlides);
      if (data.galleryItems && Array.isArray(data.galleryItems)) setGalleryItems(data.galleryItems);
      if (data.schoolNotices && Array.isArray(data.schoolNotices)) setSchoolNotices(data.schoolNotices);
      if (data.facultyMembers && Array.isArray(data.facultyMembers)) setFacultyMembers(data.facultyMembers);
      return true;
    } catch (e) {
      console.error('Failed to parse imported JSON:', e);
      return false;
    }
  };

  return (
    <SchoolDataContext.Provider
      value={{
        heroSlides,
        galleryItems,
        schoolNotices,
        facultyMembers,
        addSlide,
        updateSlide,
        deleteSlide,
        reorderSlides,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addNotice,
        updateNotice,
        deleteNotice,
        addFacultyMember,
        updateFacultyMember,
        deleteFacultyMember,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </SchoolDataContext.Provider>
  );
};

export const useSchoolData = () => {
  const context = useContext(SchoolDataContext);
  if (!context) {
    throw new Error('useSchoolData must be used within a SchoolDataProvider');
  }
  return context;
};
