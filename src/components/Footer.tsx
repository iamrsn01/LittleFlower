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
  Clock
} from 'lucide-react';
import logoImg from '../assets/logo.png';

interface FooterProps {
  onOpenPortal: () => void;
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
    <footer className="bg-slate-900 border-t-4 border-red-500 text-slate-300 text-xs relative">
      
      {/* Top Banner Callout - Fresh Light Red */}
      <div className="bg-gradient-to-r from-red-600 via-rose-500 to-red-600 py-8 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
              onClick={onOpenPortal}
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

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-red-500 via-rose-500 to-amber-400 shadow-md shrink-0">
                <img 
                  src={logoImg} 
                  alt="Little Flower Secondary School Emblem" 
                  className="w-full h-full object-contain rounded-full bg-white"
                />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 leading-tight">
                  LITTLE FLOWER
                  <span className="text-red-400 font-bold text-xs tracking-wider uppercase bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800">
                    SEC. SCHOOL
                  </span>
                </span>
                <p className="text-[11px] text-slate-400 font-semibold">Birgunj-21, Parwanipur, Parsa (Estd. 2005)</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              Little Flower Secondary School provides high-quality foundational to secondary education in Birgunj-21, Parwanipur, Parsa. Dedicated to academic brilliance, character, and student discipline.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                SEE Board Recognized
              </span>
              <span>•</span>
              <span>NEB Affiliated</span>
              <span>•</span>
              <span>Estd. 2005</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-red-400 transition-colors">School Overview</a></li>
              <li><a href="#academics" className="hover:text-red-400 transition-colors">Academic Levels</a></li>
              <li><a href="#facilities" className="hover:text-red-400 transition-colors">Science & IT Labs</a></li>
              <li><a href="#faculty" className="hover:text-red-400 transition-colors">Faculty Directory</a></li>
              <li><a href="#notices" className="hover:text-red-400 transition-colors">Notice Circulars</a></li>
              <li><a href="#transport" className="hover:text-red-400 transition-colors">Bus Transport Routes</a></li>
            </ul>
          </div>

          {/* Col 3: Academic Levels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Levels Offered
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#academics" className="hover:text-red-400 transition-colors">Secondary School (SEE)</a></li>
              <li><a href="#academics" className="hover:text-red-400 transition-colors">Lower Secondary (BLE)</a></li>
              <li><a href="#academics" className="hover:text-red-400 transition-colors">Primary School (1 to 5)</a></li>
              <li><a href="#academics" className="hover:text-red-400 transition-colors">Kindergarten & Nursery</a></li>
              <li><a href="#academics" className="hover:text-red-400 transition-colors">Computer & Science Labs</a></li>
            </ul>
          </div>

          {/* Col 4: Campus Contact & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Location
            </h4>
            
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Birgunj-21, Parwanipur, Parsa, Nepal</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <span>+977 51-580123 / 9845128940</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <span>info@littleflowerparsa.edu.np</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400 shrink-0" />
                <span>Sun – Fri: 07:30 AM – 04:30 PM</span>
              </p>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <form onSubmit={handleNewsletterSubmit} className="space-y-1.5">
                <label className="text-[11px] text-slate-400 font-semibold">Subscribe for School Circulars</label>
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
                    className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold shrink-0"
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

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Little Flower Secondary School, Birgunj-21, Parwanipur, Parsa. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <a href="#admissions" className="hover:text-white">Admission Notice</a>
            <span>•</span>
            <a href="#transport" className="hover:text-white">Bus Routes</a>
            <span>•</span>
            <a href="#academics" className="hover:text-white">Academic Rules</a>
            
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
