import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

import { supabase, getSupabaseConfig, saveSupabaseConfig } from '../lib/supabaseClient';

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

  // Cloud Status
  isSupabaseConnected: boolean;
  supabaseUrl: string;
  connectSupabase: (url: string, key: string) => Promise<boolean>;
  disconnectSupabase: () => void;
  syncAllToSupabase: () => Promise<boolean>;

  // Hero Slider CRUD
  addSlide: (slide: Omit<HeroSlide, 'id'>) => Promise<void>;
  updateSlide: (id: string | number, slide: Partial<HeroSlide>) => Promise<void>;
  deleteSlide: (id: string | number) => Promise<void>;
  reorderSlides: (startIndex: number, endIndex: number) => HeroSlide[];
  saveSlideOrder: (customSlides?: HeroSlide[]) => Promise<boolean>;

  // Gallery CRUD
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  // Notices CRUD
  addNotice: (notice: Omit<SchoolNotice, 'id'>) => Promise<void>;
  updateNotice: (id: string, notice: Partial<SchoolNotice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;

  // Faculty CRUD
  addFacultyMember: (member: Omit<FacultyMember, 'id'>) => Promise<void>;
  updateFacultyMember: (id: string, member: Partial<FacultyMember>) => Promise<void>;
  deleteFacultyMember: (id: string) => Promise<void>;

  // Global Management
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'lfs_admin_content_store_v1';

const SchoolDataContext = createContext<SchoolDataContextType | undefined>(undefined);

export const SchoolDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(supabaseConfig.isConfigured);

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

  // Fetch Cloud Data from Supabase if active
  const fetchCloudData = useCallback(async () => {
    if (!supabase) return;
    try {
      // 1. Hero Slides
      const { data: slides, error: slidesErr } = await supabase
        .from('hero_slides')
        .select('*')
        .order('created_at', { ascending: false });

      if (!slidesErr && slides && slides.length > 0) {
        setHeroSlides(slides.map(s => ({
          id: s.id,
          image: s.image,
          caption: s.caption,
          location: s.location,
          isActive: s.is_active
        })));
      }

      // 2. Gallery
      const { data: gallery, error: galleryErr } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (!galleryErr && gallery && gallery.length > 0) {
        setGalleryItems(gallery.map(g => ({
          id: g.id,
          title: g.title,
          category: g.category,
          imageUrl: g.image_url,
          description: g.description,
          featured: g.featured,
          aspect: g.aspect,
          tag: g.tag,
          year: g.year
        })));
      }

      // 3. Notices
      const { data: notices, error: noticesErr } = await supabase
        .from('school_notices')
        .select('*')
        .order('created_at', { ascending: false });

      if (!noticesErr && notices && notices.length > 0) {
        setSchoolNotices(notices.map(n => ({
          id: n.id,
          title: n.title,
          category: n.category,
          date: n.date,
          isUrgent: n.is_urgent,
          summary: n.summary,
          details: n.details,
          fileSize: n.file_size,
          downloadUrl: n.download_url
        })));
      }

      // 4. Faculty
      const { data: faculty, error: facultyErr } = await supabase
        .from('faculty_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (!facultyErr && faculty && faculty.length > 0) {
        setFacultyMembers(faculty.map(f => ({
          id: f.id,
          name: f.name,
          role: f.role,
          department: f.department,
          qualification: f.qualification,
          experience: f.experience,
          email: f.email,
          bio: f.bio,
          avatarUrl: f.avatar_url,
          achievements: Array.isArray(f.achievements) ? f.achievements : []
        })));
      }
      setIsSupabaseConnected(true);
    } catch (e) {
      console.warn('Supabase fetch failed, using local storage:', e);
    }
  }, []);

  useEffect(() => {
    if (supabaseConfig.isConfigured) {
      fetchCloudData();
    }
  }, [supabaseConfig.isConfigured, fetchCloudData]);

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

  // Connect or disconnect Supabase dynamically from UI
  const connectSupabase = async (url: string, key: string): Promise<boolean> => {
    try {
      saveSupabaseConfig(url, key);
      const newConfig = getSupabaseConfig();
      setSupabaseConfig(newConfig);
      if (newConfig.isConfigured) {
        setIsSupabaseConnected(true);
        setTimeout(() => window.location.reload(), 300);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to configure Supabase:', e);
      return false;
    }
  };

  const disconnectSupabase = () => {
    saveSupabaseConfig('', '');
    setSupabaseConfig(getSupabaseConfig());
    setIsSupabaseConnected(false);
    setTimeout(() => window.location.reload(), 300);
  };

  const syncAllToSupabase = async (): Promise<boolean> => {
    if (!supabase) return false;
    try {
      // 1. Upload slides
      for (const s of heroSlides) {
        await supabase.from('hero_slides').upsert({
          id: String(s.id),
          image: s.image,
          caption: s.caption,
          location: s.location,
          is_active: s.isActive ?? true
        });
      }
      // 2. Upload gallery
      for (const g of galleryItems) {
        await supabase.from('gallery_items').upsert({
          id: g.id,
          title: g.title,
          category: g.category,
          image_url: g.imageUrl,
          description: g.description,
          featured: g.featured ?? false,
          aspect: g.aspect ?? 'landscape',
          tag: g.tag ?? '',
          year: g.year ?? '2026'
        });
      }
      // 3. Upload notices
      for (const n of schoolNotices) {
        await supabase.from('school_notices').upsert({
          id: n.id,
          title: n.title,
          category: n.category,
          date: n.date,
          is_urgent: n.isUrgent ?? false,
          summary: n.summary,
          details: n.details,
          file_size: n.fileSize ?? 'Online Notice',
          download_url: n.downloadUrl ?? '#'
        });
      }
      // 4. Upload faculty
      for (const f of facultyMembers) {
        await supabase.from('faculty_members').upsert({
          id: f.id,
          name: f.name,
          role: f.role,
          department: f.department,
          qualification: f.qualification,
          experience: f.experience,
          email: f.email,
          bio: f.bio,
          avatar_url: f.avatarUrl,
          achievements: f.achievements
        });
      }
      return true;
    } catch (e) {
      console.error('Error syncing all to Supabase:', e);
      return false;
    }
  };

  // ==========================================
  // HERO SLIDER METHODS
  // ==========================================
  const addSlide = async (slide: Omit<HeroSlide, 'id'>) => {
    const id = String(Date.now());
    const newSlide: HeroSlide = {
      ...slide,
      id,
      isActive: slide.isActive ?? true
    };
    setHeroSlides(prev => [newSlide, ...prev]);

    if (supabase) {
      try {
        await supabase.from('hero_slides').insert({
          id,
          image: slide.image,
          caption: slide.caption,
          location: slide.location,
          is_active: slide.isActive ?? true
        });
      } catch (e) {
        console.warn('Supabase slide insert fallback to local:', e);
      }
    }
  };

  const updateSlide = async (id: string | number, slide: Partial<HeroSlide>) => {
    setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, ...slide } : s));

    if (supabase) {
      try {
        await supabase.from('hero_slides').update({
          ...(slide.image && { image: slide.image }),
          ...(slide.caption && { caption: slide.caption }),
          ...(slide.location && { location: slide.location }),
          ...(slide.isActive !== undefined && { is_active: slide.isActive })
        }).eq('id', String(id));
      } catch (e) {
        console.warn('Supabase slide update fallback:', e);
      }
    }
  };

  const deleteSlide = async (id: string | number) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));

    if (supabase) {
      try {
        await supabase.from('hero_slides').delete().eq('id', String(id));
      } catch (e) {
        console.warn('Supabase slide delete fallback:', e);
      }
    }
  };

  const reorderSlides = (startIndex: number, endIndex: number): HeroSlide[] => {
    let updated: HeroSlide[] = [];
    setHeroSlides(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      updated = result;
      return result;
    });
    return updated;
  };

  const saveSlideOrder = async (customSlides?: HeroSlide[]): Promise<boolean> => {
    const listToSave = customSlides || heroSlides;
    try {
      localStorage.setItem(STORAGE_KEY + '_slides', JSON.stringify(listToSave));
      if (supabase) {
        const now = Date.now();
        for (let i = 0; i < listToSave.length; i++) {
          const timestamp = new Date(now - i * 1000).toISOString();
          await supabase
            .from('hero_slides')
            .update({ created_at: timestamp })
            .eq('id', String(listToSave[i].id));
        }
      }
      return true;
    } catch (err) {
      console.error('Error saving slide order to Supabase:', err);
      return false;
    }
  };

  // ==========================================
  // GALLERY METHODS
  // ==========================================
  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    const id = `g-${Date.now()}`;
    const newItem: GalleryItem = {
      ...item,
      id
    };
    setGalleryItems(prev => [newItem, ...prev]);

    if (supabase) {
      try {
        await supabase.from('gallery_items').insert({
          id,
          title: item.title,
          category: item.category,
          image_url: item.imageUrl,
          description: item.description,
          featured: item.featured ?? false,
          aspect: item.aspect ?? 'landscape',
          tag: item.tag ?? '',
          year: item.year ?? '2026'
        });
      } catch (e) {
        console.warn('Supabase gallery insert fallback:', e);
      }
    }
  };

  const updateGalleryItem = async (id: string, item: Partial<GalleryItem>) => {
    setGalleryItems(prev => prev.map(g => g.id === id ? { ...g, ...item } : g));

    if (supabase) {
      try {
        await supabase.from('gallery_items').update({
          ...(item.title && { title: item.title }),
          ...(item.category && { category: item.category }),
          ...(item.imageUrl && { image_url: item.imageUrl }),
          ...(item.description && { description: item.description }),
          ...(item.featured !== undefined && { featured: item.featured }),
          ...(item.aspect && { aspect: item.aspect }),
          ...(item.tag && { tag: item.tag })
        }).eq('id', id);
      } catch (e) {
        console.warn('Supabase gallery update fallback:', e);
      }
    }
  };

  const deleteGalleryItem = async (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));

    if (supabase) {
      try {
        await supabase.from('gallery_items').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase gallery delete fallback:', e);
      }
    }
  };

  // ==========================================
  // NOTICES METHODS
  // ==========================================
  const addNotice = async (notice: Omit<SchoolNotice, 'id'>) => {
    const id = `not-${Date.now()}`;
    const newNotice: SchoolNotice = {
      ...notice,
      id
    };
    setSchoolNotices(prev => [newNotice, ...prev]);

    if (supabase) {
      try {
        await supabase.from('school_notices').insert({
          id,
          title: notice.title,
          category: notice.category,
          date: notice.date,
          is_urgent: notice.isUrgent ?? false,
          summary: notice.summary,
          details: notice.details,
          file_size: notice.fileSize ?? 'Online Notice',
          download_url: notice.downloadUrl ?? '#'
        });
      } catch (e) {
        console.warn('Supabase notice insert fallback:', e);
      }
    }
  };

  const updateNotice = async (id: string, notice: Partial<SchoolNotice>) => {
    setSchoolNotices(prev => prev.map(n => n.id === id ? { ...n, ...notice } : n));

    if (supabase) {
      try {
        await supabase.from('school_notices').update({
          ...(notice.title && { title: notice.title }),
          ...(notice.category && { category: notice.category }),
          ...(notice.date && { date: notice.date }),
          ...(notice.isUrgent !== undefined && { is_urgent: notice.isUrgent }),
          ...(notice.summary && { summary: notice.summary }),
          ...(notice.details && { details: notice.details })
        }).eq('id', id);
      } catch (e) {
        console.warn('Supabase notice update fallback:', e);
      }
    }
  };

  const deleteNotice = async (id: string) => {
    setSchoolNotices(prev => prev.filter(n => n.id !== id));

    if (supabase) {
      try {
        await supabase.from('school_notices').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase notice delete fallback:', e);
      }
    }
  };

  // ==========================================
  // FACULTY METHODS
  // ==========================================
  const addFacultyMember = async (member: Omit<FacultyMember, 'id'>) => {
    const id = `fac-${Date.now()}`;
    const newMember: FacultyMember = {
      ...member,
      id
    };
    setFacultyMembers(prev => [...prev, newMember]);

    if (supabase) {
      try {
        await supabase.from('faculty_members').insert({
          id,
          name: member.name,
          role: member.role,
          department: member.department,
          qualification: member.qualification,
          experience: member.experience,
          email: member.email,
          bio: member.bio,
          avatar_url: member.avatarUrl,
          achievements: member.achievements
        });
      } catch (e) {
        console.warn('Supabase faculty insert fallback:', e);
      }
    }
  };

  const updateFacultyMember = async (id: string, member: Partial<FacultyMember>) => {
    setFacultyMembers(prev => prev.map(f => f.id === id ? { ...f, ...member } : f));

    if (supabase) {
      try {
        await supabase.from('faculty_members').update({
          ...(member.name && { name: member.name }),
          ...(member.role && { role: member.role }),
          ...(member.department && { department: member.department }),
          ...(member.qualification && { qualification: member.qualification }),
          ...(member.experience && { experience: member.experience }),
          ...(member.email && { email: member.email }),
          ...(member.bio && { bio: member.bio }),
          ...(member.avatarUrl && { avatar_url: member.avatarUrl }),
          ...(member.achievements && { achievements: member.achievements })
        }).eq('id', id);
      } catch (e) {
        console.warn('Supabase faculty update fallback:', e);
      }
    }
  };

  const deleteFacultyMember = async (id: string) => {
    setFacultyMembers(prev => prev.filter(f => f.id !== id));

    if (supabase) {
      try {
        await supabase.from('faculty_members').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase faculty delete fallback:', e);
      }
    }
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
        isSupabaseConnected,
        supabaseUrl: supabaseConfig.url,
        connectSupabase,
        disconnectSupabase,
        syncAllToSupabase,
        addSlide,
        updateSlide,
        deleteSlide,
        reorderSlides,
        saveSlideOrder,
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
