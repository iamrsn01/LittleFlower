import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUp,
  Flame, 
  Clock, 
  Navigation, 
  Compass,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import logoImg from '../assets/logoBase64';

interface FooterProps {
  onOpenPortal: (role?: 'admin' | 'teacher' | 'student' | 'teachers' | 'students') => void;
  onOpenAdmissions: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, onOpenAdmissions }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 3500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t-4 border-red-500 text-slate-300 text-xs relative w-full">
      
      {/* Top Banner Callout - Matching Navbar full max-w-[1536px] width */}
      <div className="bg-gradient-to-r from-red-600 via-rose-500 to-red-600 py-8 text-white w-full border-b border-red-700/40">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[11px] border border-white/30 mb-1">
              <Flame className="w-3 h-3 text-amber-300 fill-current" />
              Estd. 2005 • Birgunj-21, Parwanipur, Parsa
            </div>
            <h4 className="text-base sm:text-lg font-black text-white">Enroll at Little Flower Secondary School Today</h4>
            <p className="text-rose-100 text-xs font-medium">Admissions open for Nursery to Grade 9 for Academic Session 2026/27 in Parwanipur, Parsa.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenPortal('student')}
              className="px-4 py-2.5 rounded-xl font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-colors cursor-pointer"
            >
              Student Portal
            </button>
            <button
              onClick={onOpenAdmissions}
              className="px-5 py-2.5 rounded-xl font-black bg-white hover:bg-slate-100 text-red-600 transition-all shadow-lg cursor-pointer"
            >
              Apply Online
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Body: Full Max-Width matching Navbar */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* ================= 1/3 LEFT: CAMPUS LOCATION & INTERACTIVE MAP ================= */}
          <div className="lg:col-span-4 space-y-3.5 flex flex-col justify-between bg-slate-800/60 border border-slate-700/80 rounded-none p-5 shadow-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none bg-red-950 text-red-400 font-extrabold text-[10px] border border-red-800">
                  <MapPin className="w-3 h-3 text-red-400" />
                  Campus Location Map
                </span>
                <span className="text-[10px] font-mono text-slate-400">27.0837° N, 84.9138° E</span>
              </div>
              <h4 className="text-sm font-bold text-white leading-tight">Little Flower Secondary School</h4>
              <p className="text-[11px] text-slate-400">Birgunj-21, Parwanipur Bazaar, Parsa, Nepal</p>
            </div>

            {/* Embedded Live Map with Sharp Corners */}
            <div className="w-full h-56 sm:h-64 rounded-none overflow-hidden border border-slate-700 relative bg-slate-950 shadow-inner">
              <iframe
                title="Little Flower Secondary School GPS Map Location"
                src="https://maps.google.com/maps?q=27.08374962336575,84.91380846699818&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />
            </div>

            {/* Directions Action with Sharp Corners */}
            <a
              href="https://maps.google.com/?q=27.08374962336575,84.91380846699818"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-none text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get GPS Route Directions</span>
            </a>
          </div>

          {/* ================= 2/3 RIGHT: TOP (BRAND + SOCIALS & DEPT HELPLINES) -> BOTTOM (QUICK NAVIGATION) ================= */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
            
            {/* TOP ROW: Two Columns (Left: Brand & Socials, Right: Department Helplines & Newsletter) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Top-Left: School Brand, Description & Social Channels */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-full p-0.5 bg-gradient-to-tr from-red-500 via-rose-500 to-amber-400 shadow-md shrink-0">
                    <img 
                      src={logoImg} 
                      alt="Little Flower Secondary School Emblem" 
                      className="w-full h-full object-contain rounded-full bg-white"
                    />
                  </div>
                  <div>
                    <span className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 leading-tight">
                      LITTLE FLOWER
                      <span className="text-red-400 font-bold text-[10px] tracking-wider uppercase bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800">
                        SEC. SCHOOL
                      </span>
                    </span>
                    <p className="text-[11px] text-slate-400 font-semibold">Birgunj-21, Parwanipur, Parsa (Estd. 2005)</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Committed to delivering quality foundational to secondary education in Parwanipur, Parsa. Dedicated to academic brilliance, moral character, and student discipline.
                </p>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 font-semibold">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SEE Board Recognized
                  </span>
                  <span>•</span>
                  <span>NEB Affiliated</span>
                  <span>•</span>
                  <span>Estd. 2005</span>
                </div>

                {/* Social Channels */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <p className="text-[11px] uppercase font-bold text-slate-300 tracking-wider">Social Channels</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://www.facebook.com/lflowerppr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-[#1877F2] hover:bg-[#0d65d9] text-white transition-all flex items-center gap-1.5 text-xs font-bold shadow-md shadow-[#1877F2]/20 hover:scale-105"
                      title="Facebook Page"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>

                    <a
                      href="https://www.instagram.com/lfs.parwanipur"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white transition-all flex items-center gap-1.5 text-xs font-bold shadow-md shadow-pink-600/20 hover:scale-105"
                      title="Instagram Profile"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram</span>
                    </a>

                    <a
                      href="https://wa.me/9779840159560"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all flex items-center gap-1.5 text-xs font-bold shadow-md shadow-[#25D366]/20 hover:scale-105"
                      title="WhatsApp"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Top-Right: Department Helplines & Newsletter */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Department Helplines
                </h4>
                
                <div className="space-y-1.5 text-xs text-slate-300 font-medium">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span><strong>Enquiry:</strong> <a href="tel:+9779840159560" className="hover:text-red-400 font-bold">+977-9840159560</a></span>
                  </p>
                  <p className="flex items-center gap-2 pl-5 text-[11px] text-slate-400">
                    <span><strong>Optional / Alt:</strong> <a href="tel:+9779865328644" className="hover:text-red-400">+977-9865328644</a></span>
                  </p>
                  <p className="flex items-center gap-2 pl-5 text-[11px] text-slate-400">
                    <span><strong>IT & Exam:</strong> <a href="tel:+9779801104032" className="hover:text-red-400">+977-9801104032</a></span>
                  </p>
                  <p className="flex items-center gap-2 pl-5 text-[11px] text-slate-400">
                    <span><strong>Transport:</strong> <a href="tel:+977981521991" className="hover:text-red-400">+977 981521991</a></span>
                  </p>
                  <p className="flex items-center gap-2 pt-1 border-t border-slate-800 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <a href="mailto:lfsparwanipur@gmail.com" className="hover:text-red-400 font-semibold truncate">lfsparwanipur@gmail.com</a>
                  </p>
                  <p className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Sun – Fri: 07:30 AM – 04:30 PM</span>
                  </p>
                </div>

                {/* Newsletter */}
                <div className="pt-2 border-t border-slate-800">
                  <form onSubmit={handleNewsletterSubmit} className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Subscribe for Circulars</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Parent email..."
                        required
                        className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                      />
                      <button
                        type="submit"
                        className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold shrink-0 cursor-pointer"
                        title="Subscribe"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>

                  {subscribed && (
                    <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Subscribed to school updates!
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* ================= BOTTOM ROW: QUICK NAVIGATION ================= */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-red-400" />
                  <span>Campus Directory &amp; Dedicated Portals</span>
                </h4>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">Direct Links</span>
              </div>

              {/* Multi-column structured links */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2.5 text-xs">
                <a href="#hero" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-red-500">›</span> School Overview
                </a>
                <a href="#academics" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-red-500">›</span> Academic Levels (SEE)
                </a>
                <a href="#facilities" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-red-500">›</span> Science &amp; IT Labs
                </a>
                <a href="#faculty" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-red-500">›</span> Faculty Directory
                </a>
                <a href="#notices" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-red-500">›</span> Notice Circulars
                </a>
                <a href="#transport" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-red-500">›</span> Bus Transport Routes
                </a>
                <button 
                  onClick={() => onOpenPortal('admin')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-red-500">›</span> Admin Portal
                </button>
                <button 
                  onClick={() => onOpenPortal('teacher')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-red-500">›</span> Teacher Portal
                </button>
                <button 
                  onClick={() => onOpenPortal('student')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-red-500">›</span> Student Portal
                </button>
                <a href="#admissions" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="text-red-500">›</span> Online Admissions
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Developed By with Back to Top */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Little Flower Secondary School, Birgunj-21, Parwanipur, Parsa. All Rights Reserved.</p>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">
              Developed &amp; Managed by <span className="text-red-400 font-bold">IT Dept. @Little Flower</span>
            </span>
            
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors ml-2 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
