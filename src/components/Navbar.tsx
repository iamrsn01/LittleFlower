import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  UserCheck, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown,
  Flame,
  BookOpen,
  GraduationCap,
  Building2,
  Camera,
  Bus,
  Bell,
  Award,
  Layers
} from 'lucide-react';
import logoImg from '../assets/logo.png';

interface NavbarProps {
  onOpenPortal: () => void;
  onOpenAdmissions: () => void;
  onOpenSearch: () => void;
  onOpenVirtualTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPortal,
  onOpenAdmissions,
  onOpenSearch,
  onOpenVirtualTour
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'academics', 'facilities', 'faculty', 'notices', 'gallery', 'transport', 'admissions'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const academicDropdownItems = [
    { title: 'Secondary School (SEE)', subtitle: 'Grades 9 & 10 (NEB Curriculum)', href: '#academics', icon: GraduationCap },
    { title: 'Lower Secondary (BLE)', subtitle: 'Grades 6 to 8 Core Curriculum', href: '#academics', icon: BookOpen },
    { title: 'Primary School Level', subtitle: 'Grades 1 to 5 Foundational Discovery', href: '#academics', icon: Layers },
    { title: 'Kindergarten & Pre-Primary', subtitle: 'Nursery, LKG & UKG Montessori', href: '#academics', icon: Sparkles }
  ];

  const campusDropdownItems = [
    { title: 'Science & ICT Laboratories', subtitle: 'Equipped Physics, Chemistry & Computer Labs', href: '#facilities', icon: Building2 },
    { title: 'Faculty & Educators', subtitle: 'Meet our experienced academic faculty', href: '#faculty', icon: Award },
    { title: 'Campus Photo Gallery', subtitle: 'Snapshots of campus life & assemblies', href: '#gallery', icon: Camera },
    { title: 'School Bus Transit Routes', subtitle: 'Covering Parwanipur, Birgunj & Parsa', href: '#transport', icon: Bus }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        
        {/* Top Utility Bar - Fresh Light Red */}
        <div className="bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white text-xs py-1.5 px-4 shadow-xs hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Left: Estd Badge & Tagline */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[11px] border border-white/30">
                <Flame className="w-3 h-3 text-amber-300 fill-current" />
                Estd. 2005
              </span>
              <span className="text-white/95 font-medium text-[11px]">
                Admissions Open for Nursery to Grade 9 (Session 2026/27)
              </span>
            </div>

            {/* Right: Contact & Quick Tour Link */}
            <div className="flex items-center gap-5 text-white/90 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                Birgunj-21, Parwanipur, Parsa
              </span>
              <a href="tel:+97751580123" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                +977 51-580123
              </a>
              <button 
                onClick={onOpenVirtualTour}
                className="text-amber-200 hover:text-white font-bold cursor-pointer underline underline-offset-2 flex items-center gap-1"
              >
                <span>360° Tour</span>
              </button>
            </div>

          </div>
        </div>

        {/* Main Navbar - Light White Header with Light Red Accents */}
        <nav className={`transition-all duration-300 bg-white ${
          isScrolled 
            ? 'py-2.5 shadow-md border-b border-slate-200' 
            : 'py-3.5 border-b border-slate-100 shadow-xs'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            
            {/* School Logo & Brand Name */}
            <a href="#hero" className="flex items-center gap-3 group cursor-pointer shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-red-500 via-rose-500 to-amber-400 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                <img 
                  src={logoImg} 
                  alt="Little Flower Secondary School Logo" 
                  className="w-full h-full object-contain rounded-full bg-white"
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-display leading-tight">
                    LITTLE FLOWER
                  </span>
                  <span className="text-red-600 font-black text-[11px] uppercase bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                    SEC. SCHOOL
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold tracking-wide">
                  Birgunj-21, Parwanipur, Parsa (Estd. 2005)
                </p>
              </div>
            </a>

            {/* Structured Navigation Menu */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              
              {/* Home */}
              <a
                href="#hero"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSection === 'hero'
                    ? 'text-red-600 bg-red-50 border border-red-200 font-extrabold'
                    : 'text-slate-700 hover:text-red-600 hover:bg-red-50/50'
                }`}
              >
                Home
              </a>

              {/* Academics Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('academics')}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href="#academics"
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    activeSection === 'academics'
                      ? 'text-red-600 bg-red-50 border border-red-200 font-extrabold'
                      : 'text-slate-700 hover:text-red-600 hover:bg-red-50/50'
                  }`}
                >
                  <span>Academics</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'academics' ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
                </a>

                {/* Dropdown Menu */}
                {openDropdown === 'academics' && (
                  <div className="absolute top-full left-0 mt-1.5 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                    {academicDropdownItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="p-2.5 rounded-xl hover:bg-red-50/50 flex items-start gap-2.5 transition-colors group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-slate-500 leading-tight">
                              {item.subtitle}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Campus Life Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('campus')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    ['facilities', 'faculty', 'gallery', 'transport'].includes(activeSection)
                      ? 'text-red-600 bg-red-50 border border-red-200 font-extrabold'
                      : 'text-slate-700 hover:text-red-600 hover:bg-red-50/50'
                  }`}
                >
                  <span>Campus Life</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'campus' ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === 'campus' && (
                  <div className="absolute top-full left-0 mt-1.5 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                    {campusDropdownItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="p-2.5 rounded-xl hover:bg-red-50/50 flex items-start gap-2.5 transition-colors group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-slate-500 leading-tight">
                              {item.subtitle}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Notices */}
              <a
                href="#notices"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSection === 'notices'
                    ? 'text-red-600 bg-red-50 border border-red-200 font-extrabold'
                    : 'text-slate-700 hover:text-red-600 hover:bg-red-50/50'
                }`}
              >
                <Bell className="w-3.5 h-3.5 text-red-600" />
                <span>Notices & Events</span>
              </a>

              {/* Admissions */}
              <a
                href="#admissions"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSection === 'admissions'
                    ? 'text-red-600 bg-red-50 border border-red-200 font-extrabold'
                    : 'text-slate-700 hover:text-red-600 hover:bg-red-50/50'
                }`}
              >
                Admissions
              </a>

            </div>

            {/* Right Action Group */}
            <div className="hidden sm:flex items-center gap-2.5">
              
              {/* Quick Search */}
              <button
                onClick={onOpenSearch}
                aria-label="Quick Search"
                className="p-2 rounded-xl text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 transition-all cursor-pointer flex items-center gap-1.5 text-xs shadow-xs"
                title="Search campus info (Ctrl + K)"
              >
                <Search className="w-4 h-4 text-red-600" />
                <span className="hidden xl:inline text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono font-bold">⌘K</span>
              </button>

              {/* Student Portal Button */}
              <button
                onClick={onOpenPortal}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-300 hover:border-red-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5 text-red-600" />
                <span>Portal Login</span>
              </button>

              {/* Apply Online Button - Fresh Light Red */}
              <button
                onClick={onOpenAdmissions}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-500/20 hover:shadow-red-500/35 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Apply Online</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden px-4 pt-3 pb-6 bg-white border-b border-slate-200 shadow-xl mt-2 space-y-4 animate-in slide-in-from-top-2 duration-150">
              
              {/* Category: Main Navigation */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 px-2 tracking-wider">Navigation</span>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <a
                    href="#hero"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-red-50"
                  >
                    Home
                  </a>
                  <a
                    href="#academics"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-red-50"
                  >
                    Academics (Nursery-SEE)
                  </a>
                  <a
                    href="#facilities"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-red-50"
                  >
                    Facilities & Labs
                  </a>
                  <a
                    href="#faculty"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-red-50"
                  >
                    Faculty Directory
                  </a>
                  <a
                    href="#notices"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-red-50"
                  >
                    Notices & Events
                  </a>
                  <a
                    href="#transport"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-red-50"
                  >
                    Bus Routes
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-red-50 border border-red-200 text-red-600 flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-red-600" />
                  <span>Student & Parent Portal</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmissions();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center justify-center gap-2 shadow-md shadow-red-500/25"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Apply for Admission (2026/27)</span>
                </button>
              </div>

            </div>
          )}
        </nav>
      </header>
    </>
  );
};
