import React, { useState, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Clock,
  ArrowRight,
  Upload,
  X,
  Check,
  CheckCircle2,
  Briefcase,
  Send,
  FileText,
  Sparkles,
  Users,
  BookOpen,
  FlaskConical,
  Monitor,
  HeartHandshake,
  Laptop,
  Award,
  Bus,
  Search,
  Flame,
  ArrowUpRight,
  ArrowLeft,
  Calendar,
  Copy,
  Printer,
  MessageCircle,
  Loader2,
  Download,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import coverImg from '../assets/slider/cover.jpg';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useSchoolData, VacancyPosition } from '../context/SchoolDataContext';

interface VacancyPageProps {
  onNavigateHome: () => void;
  onNavigatePortal: (role?: 'admin' | 'teacher' | 'student' | 'teachers' | 'students') => void;
  onOpenAdmissions: () => void;
  onOpenSearch: () => void;
  onOpenVirtualTour: () => void;
}

export const VacancyPage: React.FC<VacancyPageProps> = ({
  onNavigateHome,
  onNavigatePortal,
  onOpenAdmissions,
  onOpenSearch,
  onOpenVirtualTour
}) => {
  const { vacancies, submitJobApplication } = useSchoolData();
  const activeVacancies = vacancies.filter(v => v.isActive !== false);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<VacancyPosition | null>(null);
  const [isApplyingModalOpen, setIsApplyingModalOpen] = useState<boolean>(false);
  const [isWhyWorkModalOpen, setIsWhyWorkModalOpen] = useState<boolean>(false);
  const [appliedPositionTitle, setAppliedPositionTitle] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApp, setSubmittedApp] = useState<{
    ref: string;
    fullName: string;
    position: string;
    phone: string;
    email: string;
    qualification: string;
    experience: string;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    message: '',
    resumeName: '',
    resumeDataUrl: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const categories = ['All', 'Computer & AI', 'Languages', 'Science & STEM', 'Mathematics', 'Pre-Primary', 'Administration'];

  const filteredPositions = activeVacancies.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.qualification.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const handleOpenJobDetails = (job: VacancyPosition) => {
    setSelectedJob(job);
  };

  const handleOpenApplyModal = (positionName: string) => {
    setAppliedPositionTitle(positionName);
    setSelectedJob(null);
    setIsApplyingModalOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Maximum file size is 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          resumeName: file.name,
          resumeDataUrl: typeof reader.result === 'string' ? reader.result : ''
        }));
        showToast(`Selected CV: ${file.name}`);
      };
      reader.onerror = () => {
        setFormData(prev => ({ ...prev, resumeName: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      showToast('Please fill all required fields (Name, Phone, Email).');
      return;
    }

    setIsSubmitting(true);
    try {
      const position = appliedPositionTitle || 'Faculty Position';
      const ref = await submitJobApplication({
        positionTitle: position,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        qualification: formData.qualification.trim() || 'Not specified',
        experience: formData.experience.trim() || 'Not specified',
        message: formData.message.trim(),
        resumeName: formData.resumeName || undefined,
        resumeDataUrl: formData.resumeDataUrl || undefined
      });

      setSubmittedApp({
        ref,
        fullName: formData.fullName.trim(),
        position,
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        qualification: formData.qualification.trim(),
        experience: formData.experience.trim()
      });

      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.55 } });
      } catch { }

      setIsApplyingModalOpen(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        qualification: '',
        experience: '',
        message: '',
        resumeName: '',
        resumeDataUrl: ''
      });
      showToast('Application successfully registered!');
    } catch (err) {
      console.error(err);
      showToast('Could not submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = (refText: string) => {
    navigator.clipboard.writeText(refText);
    setCopiedRef(true);
    showToast('Reference Number copied to clipboard!');
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'computer':
        return <Monitor className="w-6 h-6 text-red-600" />;
      case 'english':
        return <BookOpen className="w-6 h-6 text-red-600" />;
      case 'science':
        return <FlaskConical className="w-6 h-6 text-red-600" />;
      case 'math':
        return <GraduationCap className="w-6 h-6 text-red-600" />;
      case 'ecd':
        return <Users className="w-6 h-6 text-red-600" />;
      case 'admin':
        return <Briefcase className="w-6 h-6 text-red-600" />;
      default:
        return <Briefcase className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-red-600 selection:text-white">

      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-red-500/40 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Website Navbar */}
      <Navbar
        onOpenPortal={onNavigatePortal}
        onOpenAdmissions={onOpenAdmissions}
        onOpenSearch={onOpenSearch}
        onOpenVirtualTour={onOpenVirtualTour}
        onOpenVacancy={() => { }}
        onNavigateHome={onNavigateHome}
      />

      {/* 3. HERO SHOWCASE SECTION (Executive Editorial Split Showcase) */}
      <section className="relative bg-gradient-to-b from-rose-50/50 via-white to-slate-50/70 py-12 sm:py-16 lg:py-20 px-4 sm:px-8 overflow-hidden border-b border-slate-200/80">

        {/* Subtle decorative ambient glow circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-rose-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Heading, Value Proposition & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 shadow-xs text-red-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>We Are Hiring • Academic Session 2026/27</span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.12]">
              Teach, Lead &amp; Inspire at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-600">
                Little Flower
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join Birgunj's premier secondary institution. We provide educators with state-of-the-art laboratories, supportive mentorship, academic freedom, and an inspiring student body.
            </p>

            {/* 3 Quick Institutional Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-left">
              <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Pre-K to Gr. 10</p>
                  <p className="text-[10px] text-slate-500">NEB &amp; SEE Recognized</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">100% SEE Honors</p>
                  <p className="text-[10px] text-slate-500">Distinction Legacy</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Staff Transit</p>
                  <p className="text-[10px] text-slate-500">Parsa Route Coverage</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#openings"
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-red-600/25 cursor-pointer transition-all hover:scale-103"
              >
                <span>Browse {activeVacancies.length} Open Roles</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsWhyWorkModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-white hover:bg-red-50/50 text-slate-800 hover:text-red-600 border border-slate-200 text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all hover:scale-103"
              >
                <Briefcase className="w-4 h-4 text-red-600" />
                <span>Why Work With Us?</span>
              </button>
            </div>

          </div>

          {/* Right Column: Campus Photographic Hero Card */}
          <div className="lg:col-span-5 relative">
            {/* Decorative background accent ring */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-red-600/20 via-amber-400/20 to-rose-600/20 rounded-3xl blur-lg -z-10" />

            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 group">
              {/* Campus Building Image */}
              <img
                src={coverImg}
                alt="Little Flower Secondary School Campus"
                className="w-full h-72 sm:h-96 object-cover group-hover:scale-104 transition-transform duration-700"
              />

              {/* Bottom Gradient Shade for Overlay Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Pinned Top-Left Badge */}
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3 h-3 text-red-400" />
                <span>Birgunj-21, Parwanipur</span>
              </div>

              {/* Pinned Top-Right Badge */}
              <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                <Flame className="w-3 h-3 fill-current" />
                <span>{activeVacancies.length} Openings</span>
              </div>

              {/* Bottom Info Card */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-white shadow-lg flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-black text-slate-900 font-display">
                    Little Flower Secondary School
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Birgunj's Trusted Center of Learning &amp; Mentorship
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 4. MAIN BODY CONTAINER */}
      <main id="openings" className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-12 w-full flex-grow space-y-8">

        {/* Section Header with "Why Work With Us?" Action on the Right (Matching Reference Image) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="border-l-4 border-red-600 pl-3.5">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Current Openings
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              We are looking for passionate and qualified individuals.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Search Input */}
            <div className="relative w-52 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search position or subject..."
                className="w-full pl-8.5 pr-7 py-2 rounded-xl text-xs bg-white border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-slate-800 placeholder-slate-400 outline-none transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Why Work With Us Button */}
            <button
              onClick={() => setIsWhyWorkModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm shadow-red-600/20 cursor-pointer transition-all hover:scale-102 shrink-0"
            >
              <Briefcase className="w-3.5 h-3.5 text-white" />
              <span>Why Work With Us?</span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? activeVacancies.length
              : activeVacancies.filter(p => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${isSelected
                    ? 'bg-red-600 text-white shadow-sm shadow-red-600/25 border border-red-600'
                    : 'bg-white text-slate-700 hover:text-red-600 hover:bg-red-50/50 border border-slate-200'
                  }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${isSelected ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 5. JOB OPENING CARDS (Horizontal Layout matching reference image) */}
        <div className="space-y-4">
          {filteredPositions.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No matching positions found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any job matching "{searchQuery}". Try searching with another keyword or submit a general CV below.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredPositions.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200 hover:border-red-400 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                {/* Left Group: Icon + Title + Description */}
                <div className="flex items-start gap-4 max-w-xl">
                  {/* Clean red-50 rounded square icon container */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-red-100/70 transition-all duration-200">
                    {renderIcon(job.iconType)}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">
                        {job.title}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200/80">
                        {job.type}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {job.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {job.description}
                    </p>
                  </div>
                </div>

                {/* Middle & Right Group: Meta Specs + Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-5 shrink-0 md:pl-6 md:border-l md:border-slate-100">

                  {/* 3 Meta specs with icons */}
                  <div className="space-y-1.5 text-xs text-slate-600 min-w-[210px]">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="truncate font-medium">{job.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium">{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium">{job.location}</span>
                    </div>
                  </div>

                  {/* Two Actions: Details & Apply */}
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <button
                      onClick={() => handleOpenJobDetails(job)}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/50 text-slate-700 hover:text-red-600 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                      title="View job description & qualifications"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenApplyModal(job.title)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-red-600/25 cursor-pointer transition-all hover:scale-102"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}

          {/* 6. "Don't see the right role?" Card (Matching Reference in Red Theme) */}
          <div className="bg-gradient-to-r from-red-50/70 via-rose-50/40 to-white border border-red-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-red-200 shadow-xs flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  Don't see the right role?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  We are always looking for talented and motivated individuals. Send us your CV and we will keep you in mind for future opportunities.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleOpenApplyModal('General Application')}
              className="px-5 py-2.5 rounded-xl border-2 border-red-600 hover:bg-red-600 text-red-700 hover:text-white bg-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all shrink-0 self-start sm:self-center"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Send Your CV</span>
            </button>

          </div>
        </div>

        {/* 7. GENERAL REQUIREMENTS SECTION (Matching Reference) */}
        <div className="space-y-5 pt-4">
          <div className="border-l-4 border-red-600 pl-3.5">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              General Requirements
            </h3>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* 4 Checkmarks list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 flex-1 w-full">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Strong communication and interpersonal skills</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Proficiency in subject knowledge</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Commitment to student-centered education</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Willingness to learn and work in a team</span>
              </div>
            </div>

            {/* Stylized Magnifying Glass Search Graphic */}
            <div className="w-40 h-24 flex items-center justify-center shrink-0">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-red-600 flex items-center justify-center bg-red-50">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md">
                  <Search className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* 8. CALL TO ACTION BANNER (Vibrant Little Flower Red Gradient) */}
      <section className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white py-6 px-4 sm:px-8 mt-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/30 shadow-xs">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black tracking-tight">
                Be a part of our mission
              </h4>
              <p className="text-xs text-rose-100 font-medium">
                Together, let's nurture young minds and build a better tomorrow.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleOpenApplyModal('General Faculty Application')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-red-700 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-102"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateHome}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-bold transition-all cursor-pointer"
            >
              Contact School
            </button>
          </div>

        </div>
      </section>

      {/* Main Website Footer */}
      <Footer
        onOpenPortal={onNavigatePortal}
        onOpenAdmissions={onOpenAdmissions}
        onNavigateHome={onNavigateHome}
        onOpenVacancy={() => {
          const el = document.getElementById('openings');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* MODAL 1: JOB DETAILS MODAL */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                    {selectedJob.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                    {selectedJob.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">{selectedJob.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedJob.location || 'Birgunj, Parsa'}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Highlighted Key Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-red-600" />
                    Minimum Qualification
                  </span>
                  <p className="font-bold text-slate-800 text-xs">{selectedJob.qualification || 'Relevant Educational Qualification'}</p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Experience Required
                  </span>
                  <p className="font-bold text-slate-800 text-xs">{selectedJob.experience || 'Freshers / Experienced Welcome'}</p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    Campus Location
                  </span>
                  <p className="font-bold text-slate-800 text-xs">{selectedJob.location || 'Birgunj, Parsa'}</p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Application Deadline
                  </span>
                  <p className="font-bold text-slate-800 text-xs">{selectedJob.deadline || 'Rolling Basis'}</p>
                </div>
              </div>

              {/* Position Overview */}
              <div>
                <h5 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                  Position Overview:
                </h5>
                <p className="text-slate-600 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100/80">{selectedJob.description}</p>
              </div>

              {/* Key Responsibilities */}
              {(() => {
                const resps = Array.isArray(selectedJob.responsibilities)
                  ? selectedJob.responsibilities.filter(Boolean)
                  : typeof selectedJob.responsibilities === 'string'
                    ? [selectedJob.responsibilities].filter(Boolean)
                    : [];
                if (resps.length === 0) return null;
                return (
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      Key Responsibilities:
                    </h5>
                    <ul className="space-y-1.5 text-slate-600">
                      {resps.map((r, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              {/* Candidate Requirements & Eligibility */}
              {(() => {
                const reqs = Array.isArray(selectedJob.requirements)
                  ? selectedJob.requirements.filter(Boolean)
                  : typeof selectedJob.requirements === 'string'
                    ? [selectedJob.requirements].filter(Boolean)
                    : [];
                if (reqs.length === 0) return null;
                return (
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      Candidate Requirements &amp; Eligibility:
                    </h5>
                    <ul className="space-y-1.5 text-slate-600">
                      {reqs.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenApplyModal(selectedJob.title)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/20 cursor-pointer flex items-center gap-1.5 transition-all hover:scale-102"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: APPLICATION / SEND YOUR CV FORM */}
      {isApplyingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                  Employment Application
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  Apply for {appliedPositionTitle}
                </h3>
              </div>
              <button
                onClick={() => setIsApplyingModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Rameshwor Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9800000000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Highest Degree</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. B.Sc. / B.Ed."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 2 Years"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Attach CV / Resume (PDF or DOC)</label>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <FileText className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="text-xs text-slate-600 truncate flex-1 font-mono">
                    {formData.resumeName || 'No file selected'}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold cursor-pointer shrink-0"
                  >
                    Browse
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Cover Note / Remarks (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a brief statement about your teaching background, subject mastery, or availability..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-600 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsApplyingModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer shadow-sm shadow-red-600/20 flex items-center gap-1.5 disabled:opacity-60 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Registering Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: WHY WORK WITH US? */}
      {isWhyWorkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                  Faculty Benefits &amp; Culture
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Why Work at Little Flower?
                </h3>
              </div>
              <button
                onClick={() => setIsWhyWorkModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Award className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900">Legacy of Academic Excellence</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Consistently achieving 100% SEE Board pass rates with distinction honors in Parsa.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Laptop className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900">Modern Labs &amp; Technology</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Equipped Physics, Chemistry, Biology and high-speed 45-terminal computer laboratories.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Bus className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900">Staff Transit &amp; Welfare</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Convenient school bus pickup network across Birgunj and Parsa routes for staff members.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <HeartHandshake className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900">Supportive Mentorship Culture</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Competitive compensation, provident fund, regular teacher seminars, and tuition concessions.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsWhyWorkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 cursor-pointer shadow-sm shadow-red-600/20"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: SUBMISSION CONFIRMATION */}
      {submittedApp && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSubmittedApp(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Application Successfully Logged
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">Thank You, {submittedApp.fullName}!</h3>
              <p className="text-xs text-slate-500">Your application for <strong>{submittedApp.position}</strong> has been registered in the Little Flower recruitment desk.</p>
            </div>

            {/* Reference ID Card with Copy Action */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tracking Reference ID</span>
                <button
                  type="button"
                  onClick={() => handleCopyRef(submittedApp.ref)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white border border-slate-200 hover:border-red-300 text-slate-700 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  {copiedRef ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-500" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-base font-black text-red-600 font-mono tracking-wide">{submittedApp.ref}</p>
              <div className="pt-2 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">Contact Phone</span>
                  <span className="font-semibold">{submittedApp.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Contact Email</span>
                  <span className="font-semibold truncate block">{submittedApp.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions: WhatsApp Help Desk & Print Slip */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`https://wa.me/9779800000000?text=${encodeURIComponent(
                  `Hello Little Flower School Administration, I have submitted an online application for the "${submittedApp.position}" vacancy. My Reference Tracking ID is ${submittedApp.ref}. Thank you! - ${submittedApp.fullName}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all cursor-pointer hover:scale-102"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Slip</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Shortlisted candidates will be notified via phone and email within 3 to 7 working days for an on-campus teaching demo.
            </p>

            <button
              onClick={() => setSubmittedApp(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer transition-colors shadow-md"
            >
              Back to Career Openings
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
