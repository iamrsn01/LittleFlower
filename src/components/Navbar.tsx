import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  UserCheck, 
  Sparkles, 
  Phone, 
  Mail, 
  ChevronDown, 
  Flame, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  Camera, 
  Bus, 
  Bell, 
  Award, 
  Layers,
  Users,
  Compass,
  MessageSquareQuote
} from 'lucide-react';
import logoImg from '../assets/logoBase64';

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

      const sections = ['hero', 'academics', 'facilities', 'faculty', 'notices', 'gallery', 'transport', 'admissions', 'testimonials'];
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

  const moreDropdownItems = [
    { title: 'Bus Routes & Transport', subtitle: 'School bus transit network in Birgunj & Parsa', href: '#transport', icon: Bus },
    { title: 'Campus Photo Gallery', subtitle: 'Snapshots of campus life & celebrations', href: '#gallery', icon: Camera },
    { title: 'Campus Facilities & Labs', subtitle: 'Science, IT Labs & Sports Ground', href: '#facilities', icon: Building2 },
    { title: 'Testimonials & FAQs', subtitle: 'Parent reviews and common inquiries', href: '#testimonials', icon: MessageSquareQuote },
    { title: '360° Virtual Campus Tour', subtitle: 'Interactive exploration of campus facilities', onClick: onOpenVirtualTour, icon: Compass }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        
        {/* Top Utility Bar - Gradient with Micro Texture */}
        <div className="topbar-texture text-white text-xs py-1.5 shadow-xs hidden md:block border-b border-red-700/40">
          <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between">
            
            {/* Left: Admissions Announcement */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider border border-white/30">
                <Flame className="w-3 h-3 text-amber-300 fill-current" />
                Admissions Open
              </span>
              <span className="text-white/95 font-medium text-[11px]">
                Nursery to Grade 9 (Academic Session 2026/27)
              </span>
            </div>

            {/* Right: Contact & Email Links */}
            <div className="flex items-center gap-5 text-white/90 text-xs font-medium">
              <a href="mailto:lfsparwanipur@gmail.com" className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors" title="Email Little Flower School">
                <Mail className="w-3.5 h-3.5 text-amber-300" />
                <span>lfsparwanipur@gmail.com</span>
              </a>
              <a href="tel:+9779840159560" className="flex items-center gap-1.5 hover:text-white transition-colors" title="Overall Enquiry">
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>+977-9840159560</span>
              </a>
            </div>

          </div>
        </div>

        {/* Main Navbar - Styled with Sophisticated Micro Texture & Frosted Glass */}
        <nav className={`transition-all duration-300 navbar-texture backdrop-blur-md ${
          isScrolled 
            ? 'py-2.5 shadow-md border-b border-slate-300/80' 
            : 'py-3.5 border-b border-slate-200/80 shadow-xs'
        }`}>
          <div className="w-full max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-2 sm:gap-4">
            
            {/* School Logo & Brand Name */}
            <a href="#hero" className="flex items-center gap-2 sm:gap-3 group cursor-pointer min-w-0 shrink">
              {/* Logo with Simple Elegant Slow-Spinning Border */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] animate-spin-gentle pointer-events-none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="simpleRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="url(#simpleRingGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="60 30"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full p-0.5 bg-white flex items-center justify-center z-10 shadow-xs border border-slate-100">
                  <img 
                    src={logoImg} 
                    alt="Little Flower Secondary School Logo" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap sm:flex-nowrap">
                  <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-slate-900 font-display leading-tight truncate">
                    LITTLE FLOWER
                  </span>
                  <span className="text-red-600 font-black text-[9px] sm:text-[11px] uppercase bg-red-50 px-1 sm:px-1.5 py-0.5 rounded border border-red-200 shrink-0">
                    SEC. SCHOOL
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-wide truncate">
                  Birgunj-21, Parwanipur, Parsa (Estd. 2005)
                </p>
              </div>
            </a>

            {/* Structured Navigation Menu: Home -> Academics -> Team -> Notices & Events -> Admissions -> More */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2.5 2xl:gap-3.5">
              
              {/* 1. Home */}
              <a
                href="#hero"
                className={`relative px-3.5 py-2 rounded-none text-xs font-bold transition-all duration-300 flex items-center gap-1.5 overflow-hidden group cursor-pointer ${
                  activeSection === 'hero'
                    ? 'text-red-600 bg-red-50/90 font-extrabold border-b-2 border-red-600 shadow-xs'
                    : 'text-slate-700 hover:text-red-600 hover:bg-red-50/40'
                }`}
              >
                <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">Home</span>
                {activeSection !== 'hero' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                )}
              </a>

              {/* 2. Academics Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('academics')}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href="#academics"
                  className={`relative px-3.5 py-2 rounded-none text-xs font-bold transition-all duration-300 flex items-center gap-1 overflow-hidden cursor-pointer ${
                    activeSection === 'academics'
                      ? 'text-red-600 bg-red-50/90 font-extrabold border-b-2 border-red-600 shadow-xs'
                      : 'text-slate-700 hover:text-red-600 hover:bg-red-50/40'
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">Academics</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === 'academics' ? 'rotate-180 text-red-600' : 'text-slate-400 group-hover:text-red-600 group-hover:translate-y-0.5'}`} />
                  {activeSection !== 'academics' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                  )}
                </a>

                {/* Dropdown Menu */}
                {openDropdown === 'academics' && (
                  <div className="absolute top-full left-0 mt-1.5 w-76 bg-white/95 backdrop-blur-md border-t-2 border-t-red-600 border-x border-b border-slate-200 rounded-none shadow-2xl p-1.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                    {academicDropdownItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="p-2.5 rounded-none hover:bg-red-50/80 hover:border-l-3 hover:border-red-600 flex items-start gap-2.5 transition-all duration-200 group/drop cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-none bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover/drop:bg-red-600 group-hover/drop:text-white group-hover/drop:scale-105 transition-all duration-200 shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover/drop:text-red-600 transition-colors">
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

              {/* 3. Team (Faculty & Leadership) */}
              <a
                href="#faculty"
                className={`relative px-3.5 py-2 rounded-none text-xs font-bold transition-all duration-300 flex items-center gap-1.5 overflow-hidden group cursor-pointer ${
                  activeSection === 'faculty'
                    ? 'text-red-600 bg-red-50/90 font-extrabold border-b-2 border-red-600 shadow-xs'
                    : 'text-slate-700 hover:text-red-600 hover:bg-red-50/40'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-red-600 transition-transform duration-300 group-hover:scale-120 group-hover:-rotate-6" />
                <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">Team</span>
                {activeSection !== 'faculty' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                )}
              </a>

              {/* 4. Notice & Events */}
              <a
                href="#notices"
                className={`relative px-3.5 py-2 rounded-none text-xs font-bold transition-all duration-300 flex items-center gap-1.5 overflow-hidden group cursor-pointer ${
                  activeSection === 'notices'
                    ? 'text-red-600 bg-red-50/90 font-extrabold border-b-2 border-red-600 shadow-xs'
                    : 'text-slate-700 hover:text-red-600 hover:bg-red-50/40'
                }`}
              >
                <Bell className="w-3.5 h-3.5 text-red-600 transition-transform duration-300 group-hover:scale-120 group-hover:rotate-12" />
                <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">Notice &amp; Events</span>
                {activeSection !== 'notices' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                )}
              </a>

              {/* 5. Admissions */}
              <a
                href="#admissions"
                className={`relative px-3.5 py-2 rounded-none text-xs font-bold transition-all duration-300 flex items-center gap-1.5 overflow-hidden group cursor-pointer ${
                  activeSection === 'admissions'
                    ? 'text-red-600 bg-red-50/90 font-extrabold border-b-2 border-red-600 shadow-xs'
                    : 'text-slate-700 hover:text-red-600 hover:bg-red-50/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 transition-transform duration-300 group-hover:scale-120 group-hover:rotate-12" />
                <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">Admissions</span>
                {activeSection !== 'admissions' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                )}
              </a>

              {/* 6. More Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('more')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`relative px-3.5 py-2 rounded-none text-xs font-bold transition-all duration-300 flex items-center gap-1 overflow-hidden cursor-pointer ${
                    ['transport', 'gallery', 'facilities', 'testimonials'].includes(activeSection)
                      ? 'text-red-600 bg-red-50/90 font-extrabold border-b-2 border-red-600 shadow-xs'
                      : 'text-slate-700 hover:text-red-600 hover:bg-red-50/40'
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === 'more' ? 'rotate-180 text-red-600' : 'text-slate-400 group-hover:text-red-600 group-hover:translate-y-0.5'}`} />
                  {!['transport', 'gallery', 'facilities', 'testimonials'].includes(activeSection) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                  )}
                </button>

                {/* More Dropdown Menu */}
                {openDropdown === 'more' && (
                  <div className="absolute top-full right-0 mt-1.5 w-76 bg-white/95 backdrop-blur-md border-t-2 border-t-red-600 border-x border-b border-slate-200 rounded-none shadow-2xl p-1.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                    {moreDropdownItems.map((item, idx) => {
                      const Icon = item.icon;
                      if (item.onClick) {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setOpenDropdown(null);
                              item.onClick?.();
                            }}
                            className="w-full p-2.5 rounded-none hover:bg-red-50/80 hover:border-l-3 hover:border-red-600 flex items-start gap-2.5 transition-all duration-200 group/drop cursor-pointer text-left"
                          >
                            <div className="w-8 h-8 rounded-none bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover/drop:bg-red-600 group-hover/drop:text-white group-hover/drop:scale-105 transition-all duration-200 shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900 group-hover/drop:text-red-600 transition-colors">
                                {item.title}
                              </p>
                              <p className="text-[10px] text-slate-500 leading-tight">
                                {item.subtitle}
                              </p>
                            </div>
                          </button>
                        );
                      }
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className="p-2.5 rounded-none hover:bg-red-50/80 hover:border-l-3 hover:border-red-600 flex items-start gap-2.5 transition-all duration-200 group/drop cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-none bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover/drop:bg-red-600 group-hover/drop:text-white group-hover/drop:scale-105 transition-all duration-200 shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover/drop:text-red-600 transition-colors">
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

            </div>

            {/* Right Action Group - Desktop Only (>= 1024px) */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              
              {/* Quick Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search"
                className="h-[38px] px-3.5 rounded-none text-slate-700 hover:text-red-600 bg-slate-50 hover:bg-red-50/80 border border-slate-300 hover:border-red-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center gap-2 text-xs font-bold shadow-xs group/search"
                title="Search campus info"
              >
                <Search className="w-3.5 h-3.5 text-red-600 group-hover/search:scale-115 transition-transform" />
                <span>Search</span>
              </button>

              {/* Student Portal Button */}
              <button
                onClick={onOpenPortal}
                className="h-[38px] px-3.5 rounded-none text-xs font-bold text-slate-700 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-300 hover:border-red-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs group/portal"
              >
                <UserCheck className="w-3.5 h-3.5 text-red-600 group-hover/portal:scale-115 transition-transform" />
                <span>Portal Login</span>
              </button>

              {/* Apply Online Button */}
              <button
                onClick={onOpenAdmissions}
                className="relative h-[38px] px-4.5 rounded-none text-xs font-black text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5 cursor-pointer overflow-hidden group/apply"
              >
                <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover/apply:translate-x-[400%] transition-transform duration-700 ease-out pointer-events-none" />
                <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover/apply:rotate-12 transition-transform" />
                <span className="relative z-10">Apply Online</span>
              </button>
            </div>

            {/* Mobile / Tablet Controls (< 1024px) - Clean & Fixed within screen bounds */}
            <div className="flex lg:hidden items-center gap-1.5 shrink-0">
              <button
                onClick={onOpenSearch}
                className="h-[36px] w-[36px] flex items-center justify-center p-2 rounded-none bg-slate-50 hover:bg-red-50 border border-slate-300 hover:border-red-500 text-slate-700 cursor-pointer shadow-xs"
                aria-label="Search"
                title="Search campus info"
              >
                <Search className="w-4 h-4 text-red-600" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-[36px] w-[36px] flex items-center justify-center p-2 rounded-none bg-slate-50 hover:bg-red-50 border border-slate-300 hover:border-red-500 text-slate-800 cursor-pointer shadow-xs"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5 text-slate-800" />}
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
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <span>Home</span>
                  </a>
                  <a
                    href="#academics"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <span>Academics</span>
                  </a>
                  <a
                    href="#faculty"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5 text-red-600" />
                    <span>Team</span>
                  </a>
                  <a
                    href="#notices"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <Bell className="w-3.5 h-3.5 text-red-600" />
                    <span>Notice &amp; Events</span>
                  </a>
                  <a
                    href="#admissions"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Admissions</span>
                  </a>
                  <a
                    href="#gallery"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-red-600" />
                    <span>Gallery</span>
                  </a>
                  <a
                    href="#transport"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <Bus className="w-3.5 h-3.5 text-red-600" />
                    <span>Bus Routes</span>
                  </a>
                  <a
                    href="#facilities"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Facilities &amp; Labs</span>
                  </a>
                  <a
                    href="#testimonials"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5"
                  >
                    <MessageSquareQuote className="w-3.5 h-3.5 text-red-600" />
                    <span>FAQs &amp; Reviews</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenVirtualTour();
                    }}
                    className="px-3 py-2 rounded-none text-xs font-bold text-slate-700 hover:bg-red-50 flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-red-600" />
                    <span>Virtual Tour</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full py-2.5 px-4 rounded-none text-xs font-bold bg-red-50 border border-red-200 text-red-600 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-red-600" />
                  <span>Student &amp; Parent Portal</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmissions();
                  }}
                  className="w-full py-2.5 px-4 rounded-none text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center justify-center gap-2 shadow-md shadow-red-500/25 cursor-pointer"
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
