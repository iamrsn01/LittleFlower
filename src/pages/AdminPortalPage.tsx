import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  ArrowLeft, 
  LogOut, 
  Building2, 
  Users, 
  Bell, 
  Send, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Sparkles,
  TrendingUp,
  Download,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Upload,
  ArrowUp,
  ArrowDown,
  Camera,
  Layers,
  FileText,
  Search,
  Filter,
  Eye,
  RefreshCw,
  Sliders,
  Settings,
  X,
  ExternalLink,
  Lock,
  Calendar,
  Check,
  Award,
  Mail,
  Phone
} from 'lucide-react';
import { useSchoolData, HeroSlide } from '../context/SchoolDataContext';
import { SchoolNotice, GalleryItem, FacultyMember } from '../data/schoolData';
import logoImg from '../assets/logoBase64';
import coverImg from '../assets/slider/cover.jpg';

interface AdminPortalPageProps {
  onNavigateHome: () => void;
  onNavigateTeacher: () => void;
  onNavigateStudent: () => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({
  onNavigateHome,
  onNavigateTeacher,
  onNavigateStudent
}) => {
  const {
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
  } = useSchoolData();

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('lfs_admin_authenticated') === 'true';
  });
  const [adminId, setAdminId] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'slider' | 'gallery' | 'notices' | 'faculty' | 'settings'>('overview');
  
  // Toast notifications
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Secure Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsernames = ['admin', 'admin-lfs-01', 'admin@lfsbirgunj.edu.np', 'principal'];
    const currentStoredPassword = localStorage.getItem('lfs_admin_security_pass') || 'Rosan4eva';

    const normalizedUser = adminId.trim().toLowerCase();
    const inputPin = adminPin.trim();

    if (!validUsernames.includes(normalizedUser) || inputPin !== currentStoredPassword) {
      showToast('Access Denied: Invalid administrator username or security PIN.', 'error');
      return;
    }

    setIsLoggedIn(true);
    if (rememberMe) {
      localStorage.setItem('lfs_admin_authenticated', 'true');
      localStorage.setItem('lfs_admin_username', adminId.trim());
    }
    showToast('Administrator authenticated successfully!');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('lfs_admin_authenticated');
    setAdminId('');
    setAdminPin('');
    showToast('Administrator signed out securely', 'info');
  };

  // Admin Password Management State
  const [currentSecurityPass, setCurrentSecurityPass] = useState('');
  const [newSecurityPass, setNewSecurityPass] = useState('');
  const [confirmSecurityPass, setConfirmSecurityPass] = useState('');

  const handleChangeAdminPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('lfs_admin_security_pass') || 'Rosan4eva';
    if (currentSecurityPass !== storedPass) {
      showToast('Current password does not match records.', 'error');
      return;
    }
    if (newSecurityPass.length < 5) {
      showToast('New password must be at least 5 characters.', 'error');
      return;
    }
    if (newSecurityPass !== confirmSecurityPass) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    localStorage.setItem('lfs_admin_security_pass', newSecurityPass);
    setCurrentSecurityPass('');
    setNewSecurityPass('');
    setConfirmSecurityPass('');
    showToast('Administrator security password updated successfully!');
  };

  // Helper: File to Base64
  const handleFileUpload = (file: File, callback: (base64: string) => void) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      showToast('Image file size exceeds 8MB limit', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        callback(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // =========================================================================
  // 1. SLIDER MANAGEMENT STATE & HANDLERS
  // =========================================================================
  const [isAddingSlide, setIsAddingSlide] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [newSlideData, setNewSlideData] = useState({
    image: '',
    caption: '',
    location: 'Birgunj-21, Parwanipur, Parsa (Estd. 2005)',
    isActive: true
  });
  const slideFileInputRef = useRef<HTMLInputElement>(null);
  const editSlideFileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideData.image.trim() || !newSlideData.caption.trim()) {
      showToast('Please provide an image and a caption', 'error');
      return;
    }
    addSlide({
      image: newSlideData.image,
      caption: newSlideData.caption,
      location: newSlideData.location || 'Parwanipur, Parsa',
      isActive: newSlideData.isActive
    });
    setNewSlideData({
      image: '',
      caption: '',
      location: 'Birgunj-21, Parwanipur, Parsa (Estd. 2005)',
      isActive: true
    });
    setIsAddingSlide(false);
    showToast('New hero slider slide published live!');
  };

  const handleSaveEditSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    updateSlide(editingSlide.id, {
      caption: editingSlide.caption,
      location: editingSlide.location,
      image: editingSlide.image,
      isActive: editingSlide.isActive
    });
    setEditingSlide(null);
    showToast('Slider slide updated successfully!');
  };

  // =========================================================================
  // 2. GALLERY MANAGEMENT STATE & HANDLERS
  // =========================================================================
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [newGalleryData, setNewGalleryData] = useState<{
    title: string;
    category: 'STEM & Labs' | 'Sports' | 'Arts & Culture' | 'Campus' | 'Events';
    imageUrl: string;
    description: string;
    tag: string;
    featured: boolean;
    aspect: 'square' | 'portrait' | 'landscape' | 'wide';
  }>({
    title: '',
    category: 'Campus',
    imageUrl: '',
    description: '',
    tag: 'Campus View',
    featured: false,
    aspect: 'landscape'
  });
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const editGalleryFileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryData.title.trim() || !newGalleryData.imageUrl.trim()) {
      showToast('Please enter an image and title for the gallery', 'error');
      return;
    }
    addGalleryItem({
      title: newGalleryData.title,
      category: newGalleryData.category,
      imageUrl: newGalleryData.imageUrl,
      description: newGalleryData.description || newGalleryData.title,
      tag: newGalleryData.tag || newGalleryData.category,
      featured: newGalleryData.featured,
      aspect: newGalleryData.aspect,
      year: '2026'
    });
    setNewGalleryData({
      title: '',
      category: 'Campus',
      imageUrl: '',
      description: '',
      tag: 'Campus View',
      featured: false,
      aspect: 'landscape'
    });
    setIsAddingGallery(false);
    showToast('Photo added to school gallery!');
  };

  const handleSaveEditGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGalleryItem) return;
    updateGalleryItem(editingGalleryItem.id, editingGalleryItem);
    setEditingGalleryItem(null);
    showToast('Gallery item updated successfully!');
  };

  // =========================================================================
  // 3. NOTICES MANAGEMENT STATE & HANDLERS
  // =========================================================================
  const [isAddingNotice, setIsAddingNotice] = useState(false);
  const [editingNotice, setEditingNotice] = useState<SchoolNotice | null>(null);
  const [noticeSearch, setNoticeSearch] = useState('');
  const [newNoticeData, setNewNoticeData] = useState<{
    title: string;
    category: 'Academic' | 'Examination' | 'Sports' | 'Holiday' | 'General';
    date: string;
    isUrgent: boolean;
    summary: string;
    details: string;
  }>({
    title: '',
    category: 'General',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    isUrgent: false,
    summary: '',
    details: ''
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeData.title.trim()) {
      showToast('Notice title cannot be empty', 'error');
      return;
    }
    addNotice({
      title: newNoticeData.title,
      category: newNoticeData.category,
      date: newNoticeData.date || 'Today',
      isUrgent: newNoticeData.isUrgent,
      summary: newNoticeData.summary || newNoticeData.title,
      details: newNoticeData.details || newNoticeData.title,
      fileSize: 'Online Notice',
      downloadUrl: '#'
    });
    setNewNoticeData({
      title: '',
      category: 'General',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      isUrgent: false,
      summary: '',
      details: ''
    });
    setIsAddingNotice(false);
    showToast('Official Circular broadcasted across all portals!');
  };

  const handleSaveEditNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;
    updateNotice(editingNotice.id, editingNotice);
    setEditingNotice(null);
    showToast('Official Circular updated!');
  };

  // =========================================================================
  // 4. FACULTY MANAGEMENT STATE & HANDLERS
  // =========================================================================
  const [facultyDeptFilter, setFacultyDeptFilter] = useState('All');
  const [facultySearch, setFacultySearch] = useState('');
  const [isAddingFaculty, setIsAddingFaculty] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [newFacultyData, setNewFacultyData] = useState<{
    name: string;
    role: string;
    department: 'Science & STEM' | 'Mathematics' | 'Computer & AI' | 'Languages & Literature' | 'Social Sciences' | 'Arts & Physical Ed';
    qualification: string;
    experience: string;
    email: string;
    bio: string;
    avatarUrl: string;
    achievementsStr: string;
  }>({
    name: '',
    role: '',
    department: 'Science & STEM',
    qualification: '',
    experience: '',
    email: '',
    bio: '',
    avatarUrl: '',
    achievementsStr: ''
  });
  const facultyFileInputRef = useRef<HTMLInputElement>(null);
  const editFacultyFileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacultyData.name.trim() || !newFacultyData.role.trim()) {
      showToast('Please enter faculty name and designation', 'error');
      return;
    }
    const achievements = newFacultyData.achievementsStr
      ? newFacultyData.achievementsStr.split(',').map(s => s.trim()).filter(Boolean)
      : ['Dedicated Little Flower Educator'];

    addFacultyMember({
      name: newFacultyData.name,
      role: newFacultyData.role,
      department: newFacultyData.department,
      qualification: newFacultyData.qualification || 'Experienced Faculty',
      experience: newFacultyData.experience || 'Experienced',
      email: newFacultyData.email || 'faculty@lfsbirgunj.edu.np',
      bio: newFacultyData.bio || `${newFacultyData.name} is a valued mentor at Little Flower Secondary School.`,
      avatarUrl: newFacultyData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      achievements
    });

    setNewFacultyData({
      name: '',
      role: '',
      department: 'Science & STEM',
      qualification: '',
      experience: '',
      email: '',
      bio: '',
      avatarUrl: '',
      achievementsStr: ''
    });
    setIsAddingFaculty(false);
    showToast('New faculty mentor added to directory!');
  };

  const handleSaveEditFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;
    updateFacultyMember(editingFaculty.id, editingFaculty);
    setEditingFaculty(null);
    showToast('Faculty profile updated successfully!');
  };

  // Backup & Restore
  const handleExportBackup = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `little-flower-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Backup exported and downloaded as JSON!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJSON(content);
      if (success) {
        showToast('Backup restored successfully!');
      } else {
        showToast('Invalid backup JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all data to school defaults? Any custom slides, photos, or circulars will be replaced with initial school records.')) {
      resetToDefaults();
      showToast('All school data restored to official defaults!');
    }
  };

  // =========================================================================
  // VIEW 1: AUTHENTICATION SCREEN (IF NOT LOGGED IN)
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-red-500 selection:text-white">
        
        {/* Floating Notification Toast */}
        {toastMsg && (
          <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border text-xs font-bold transition-all ${
            toastMsg.type === 'error'
              ? 'bg-rose-950/90 border-rose-500 text-rose-200'
              : 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg.text}</span>
          </div>
        )}

        {/* LEFT HALF (50%): Full-Bleed Campus Photography with Gradient & Identity */}
        <div className="relative w-full lg:w-1/2 min-h-[380px] lg:min-h-screen p-8 sm:p-12 xl:p-16 flex flex-col justify-between overflow-hidden group">
          <img 
            src={coverImg} 
            alt="Little Flower Secondary School Academic Campus" 
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-red-950/70" />

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left group/logo cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-lg shrink-0 group-hover/logo:scale-105 transition-transform">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-black tracking-wide text-white block leading-tight">
                  Little Flower Sec. School
                </span>
                <span className="text-xs text-rose-200 font-medium">Birgunj-21, Parwanipur, Parsa</span>
              </div>
            </button>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Admin Console</span>
            </span>
          </div>

          {/* Bottom Highlights & Metrics */}
          <div className="relative z-10 space-y-6 pt-12 text-white">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/20 text-white font-bold text-[11px] uppercase tracking-wider">
                Estd. 2005 • Central CMS &amp; Administration
              </span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Institutional Control &amp; Content Desk
              </h2>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                Publish hero slider updates, manage photo gallery albums, broadcast official board examination notices, and maintain faculty mentor directories live.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-lg font-black text-white">{heroSlides.length} Slides</p>
                <p className="text-[11px] text-slate-300">Hero Slider</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-lg font-black text-white">{galleryItems.length} Photos</p>
                <p className="text-[11px] text-slate-300">Gallery Albums</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-lg font-black text-white">{schoolNotices.length} Notices</p>
                <p className="text-[11px] text-slate-300">Active Circulars</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-lg font-black text-white">{facultyMembers.length} Faculty</p>
                <p className="text-[11px] text-slate-300">Staff Directory</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT HALF (50%): Centered Login Panel */}
        <div className="w-full lg:w-1/2 min-h-screen p-6 sm:p-12 xl:p-16 flex flex-col justify-between bg-slate-900 overflow-y-auto">
          {/* Top Quick Actions Bar */}
          <div className="flex items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Other Portals:</span>
              <button
                onClick={onNavigateTeacher}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Teacher</span>
              </button>
              <button
                onClick={onNavigateStudent}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-rose-400" />
                <span>Student</span>
              </button>
            </div>

            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← View Website</span>
            </button>
          </div>

          {/* Centered Login Box */}
          <div className="my-auto max-w-md w-full mx-auto py-8 space-y-6">
            <div className="space-y-1 text-left">
              <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center shadow-lg mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">Institutional Admin Login</h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Sign in with school administrative credentials to manage slider images, gallery media, notices, and staff.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Admin Username / Security ID</label>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="ADMIN-LFS-01"
                  required
                  className="w-full px-4 py-3 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Security PIN / Password</label>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-red-600 focus:ring-red-500"
                  />
                  <span>Remember session on this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In to Admin Dashboard</span>
              </button>
            </form>
          </div>

          {/* Bottom Footer Helpdesk */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <span>Helpdesk: +977-9840159560 • admin@lfsbirgunj.edu.np</span>
            <span>Little Flower Secondary School • Parsa</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: LOGGED-IN ADMIN DASHBOARD VIEW
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & School Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
              title="Return to Main Website"
            >
              <div className="w-10 h-10 rounded-xl bg-white p-1 shadow shrink-0 group-hover:scale-105 transition-transform">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black tracking-wide text-white">
                    Little Flower Secondary School
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                    CMS Admin
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Birgunj-21, Parwanipur, Parsa • Central Administration</p>
              </div>
            </button>
          </div>

          {/* Quick Action Links & Switchers */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
              title="Preview Live Site"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">View Public Website</span>
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Floating Notification Toast */}
      {toastMsg && (
        <div className={`fixed top-16 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border text-xs font-bold transition-all ${
          toastMsg.type === 'error'
            ? 'bg-rose-950/95 border-rose-500 text-rose-200'
            : 'bg-emerald-950/95 border-emerald-500 text-emerald-200'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          
          {/* Top Admin Summary Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 border border-red-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white">Central Administration Command</h2>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    LIVE SYNC ACTIVE
                  </span>
                </div>
                <p className="text-xs text-rose-200">
                  Logged in as <strong className="text-white">{adminId}</strong> • Content changes reflect across website immediately.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportBackup}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                title="Download JSON Backup"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export Backup</span>
              </button>
              <button
                onClick={handleResetDefaults}
                className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-rose-200 text-xs font-bold flex items-center gap-1.5 border border-red-800/40 transition-colors cursor-pointer"
                title="Reset to Original School Data"
              >
                <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex border-b border-slate-700/80 gap-2 overflow-x-auto pb-1">
            {[
              { key: 'overview', label: 'Overview', icon: Building2, count: null },
              { key: 'slider', label: 'Hero Slider', icon: ImageIcon, count: heroSlides.length },
              { key: 'gallery', label: 'Photo Gallery', icon: Camera, count: galleryItems.length },
              { key: 'notices', label: 'Notices & Circulars', icon: Bell, count: schoolNotices.length },
              { key: 'faculty', label: 'Faculty & Staff', icon: Users, count: facultyMembers.length },
              { key: 'settings', label: 'Settings & Backup', icon: Settings, count: null }
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                  {t.count !== null && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-white text-red-600' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  onClick={() => setActiveTab('slider')}
                  className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Hero Slider</span>
                    <ImageIcon className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-3xl font-black text-white">{heroSlides.length}</p>
                  <span className="text-[10px] text-emerald-400 font-bold">Active Campus Slides</span>
                </div>

                <div 
                  onClick={() => setActiveTab('gallery')}
                  className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Gallery Photos</span>
                    <Camera className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-3xl font-black text-white">{galleryItems.length}</p>
                  <span className="text-[10px] text-amber-400 font-bold">Across 5 Categories</span>
                </div>

                <div 
                  onClick={() => setActiveTab('notices')}
                  className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Notice Board</span>
                    <Bell className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-3xl font-black text-white">{schoolNotices.length}</p>
                  <span className="text-[10px] text-rose-400 font-bold">Broadcasted Circulars</span>
                </div>

                <div 
                  onClick={() => setActiveTab('faculty')}
                  className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Staff &amp; Faculty</span>
                    <Users className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-3xl font-black text-white">{facultyMembers.length}</p>
                  <span className="text-[10px] text-blue-400 font-bold">Registered Teachers &amp; HODs</span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Quick Content Actions</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => { setActiveTab('slider'); setIsAddingSlide(true); }}
                    className="p-4 rounded-xl bg-slate-900/80 hover:bg-red-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-red-400 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Add Slider Slide</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-red-100">Upload hero banner</p>
                  </button>

                  <button
                    onClick={() => { setActiveTab('gallery'); setIsAddingGallery(true); }}
                    className="p-4 rounded-xl bg-slate-900/80 hover:bg-amber-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-amber-400 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Add Gallery Photo</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-amber-100">Upload campus media</p>
                  </button>

                  <button
                    onClick={() => { setActiveTab('notices'); setIsAddingNotice(true); }}
                    className="p-4 rounded-xl bg-slate-900/80 hover:bg-rose-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-rose-400 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Broadcast Notice</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-rose-100">Publish urgent notice</p>
                  </button>

                  <button
                    onClick={() => { setActiveTab('faculty'); setIsAddingFaculty(true); }}
                    className="p-4 rounded-xl bg-slate-900/80 hover:bg-blue-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-blue-400 group-hover:text-white mb-2" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Add Faculty Staff</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-blue-100">New teacher profile</p>
                  </button>
                </div>
              </div>

              {/* Two Column Section: Recent Notices & Live Slides */}
              <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Active Notices Preview */}
                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-rose-400" />
                      <span>Latest Circulars</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('notices')}
                      className="text-xs text-red-400 hover:underline cursor-pointer font-bold"
                    >
                      Manage All ({schoolNotices.length}) →
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {schoolNotices.slice(0, 4).map((not) => (
                      <div key={not.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-300">
                              {not.category}
                            </span>
                            {not.isUrgent && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-red-600 text-white">
                                URGENT
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400 font-mono">{not.date}</span>
                          </div>
                          <p className="text-xs font-bold text-white truncate">{not.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero Slides Preview */}
                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-red-400" />
                      <span>Active Hero Slides</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('slider')}
                      className="text-xs text-red-400 hover:underline cursor-pointer font-bold"
                    >
                      Manage All ({heroSlides.length}) →
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {heroSlides.slice(0, 4).map((sl, idx) => (
                      <div key={sl.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-3">
                        <img src={sl.image} alt={sl.caption} className="w-14 h-10 rounded-lg object-cover border border-slate-700 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-red-400">Slide #{idx + 1}</span>
                            <span className="text-[10px] text-slate-400 truncate">{sl.location}</span>
                          </div>
                          <p className="text-xs font-bold text-white truncate">{sl.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: HERO SLIDER MANAGER */}
          {/* ========================================================================= */}
          {activeTab === 'slider' && (
            <div className="space-y-6">
              
              {/* Header with Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white">Hero Banner Slider Manager</h3>
                  <p className="text-xs text-slate-400">Add, edit, reorder, or remove images displayed in the main top homepage carousel.</p>
                </div>
                <button
                  onClick={() => setIsAddingSlide(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Slide</span>
                </button>
              </div>

              {/* Add New Slide Form / Drawer */}
              {isAddingSlide && (
                <form onSubmit={handleCreateSlide} className="p-6 rounded-2xl bg-slate-800 border-2 border-red-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Upload className="w-4 h-4 text-red-400" />
                      <span>Add New Homepage Hero Slide</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingSlide(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Left: Image input & local upload */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Image Source (File Upload or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newSlideData.image}
                            onChange={(e) => setNewSlideData({ ...newSlideData, image: e.target.value })}
                            placeholder="Paste image URL (https://...) or upload below"
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                          />
                          <button
                            type="button"
                            onClick={() => slideFileInputRef.current?.click()}
                            className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                          </button>
                          <input
                            type="file"
                            ref={slideFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (base64) => setNewSlideData({ ...newSlideData, image: base64 }));
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* Live Image Preview */}
                      <div className="w-full h-44 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center">
                        {newSlideData.image ? (
                          <img src={newSlideData.image} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center text-slate-500 space-y-1">
                            <ImageIcon className="w-8 h-8 mx-auto stroke-1" />
                            <p className="text-xs">Slide image preview will appear here</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Caption & details */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Headline / Caption</label>
                        <input
                          type="text"
                          value={newSlideData.caption}
                          onChange={(e) => setNewSlideData({ ...newSlideData, caption: e.target.value })}
                          placeholder="e.g. Modern Science Laboratories & Practical Research"
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Location Subtitle</label>
                        <input
                          type="text"
                          value={newSlideData.location}
                          onChange={(e) => setNewSlideData({ ...newSlideData, location: e.target.value })}
                          placeholder="e.g. Parwanipur, Parsa (Estd. 2005)"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div className="pt-4 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingSlide(false)}
                          className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-600 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Publish Slide Live</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Slider Slides List */}
              <div className="space-y-3">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Reorder Up/Down */}
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => index > 0 && reorderSlides(index, index - 1)}
                          disabled={index === 0}
                          className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => index < heroSlides.length - 1 && reorderSlides(index, index + 1)}
                          disabled={index === heroSlides.length - 1}
                          className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Thumbnail */}
                      <img
                        src={slide.image}
                        alt={slide.caption}
                        className="w-24 h-16 sm:w-32 sm:h-20 rounded-xl object-cover border border-slate-700 shrink-0 bg-slate-950"
                      />

                      {/* Information */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600/20 text-red-400 border border-red-500/30">
                            Slide #{index + 1}
                          </span>
                          <span className="text-xs text-slate-400">{slide.location}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white leading-snug">{slide.caption}</h4>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => setEditingSlide(slide)}
                        className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (heroSlides.length <= 1) {
                            showToast('Cannot delete the only slide in the hero carousel', 'error');
                            return;
                          }
                          deleteSlide(slide.id);
                          showToast('Slide deleted');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-bold flex items-center gap-1 border border-rose-800/40 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Slide Modal */}
              {editingSlide && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditSlide} className="max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-amber-400" />
                        <span>Edit Hero Slide</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingSlide(null)}
                        className="text-slate-400 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Headline / Caption</label>
                        <input
                          type="text"
                          value={editingSlide.caption}
                          onChange={(e) => setEditingSlide({ ...editingSlide, caption: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-red-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Location Subtitle</label>
                        <input
                          type="text"
                          value={editingSlide.location}
                          onChange={(e) => setEditingSlide({ ...editingSlide, location: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Image URL or Replace</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingSlide.image}
                            onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                          <button
                            type="button"
                            onClick={() => editSlideFileInputRef.current?.click()}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Replace
                          </button>
                          <input
                            type="file"
                            ref={editSlideFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (base64) => setEditingSlide({ ...editingSlide, image: base64 }));
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-full h-32 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden">
                        <img src={editingSlide.image} alt="Slide Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingSlide(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: PHOTO GALLERY MANAGER */}
          {/* ========================================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              
              {/* Top Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white">Campus Photo Gallery Manager</h3>
                  <p className="text-xs text-slate-400">Upload new campus pictures, assign categories, or remove outdated photographs.</p>
                </div>
                <button
                  onClick={() => setIsAddingGallery(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Photo</span>
                </button>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['All', 'Campus', 'STEM & Labs', 'Sports', 'Arts & Culture', 'Events'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      galleryCategoryFilter === cat
                        ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                        : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Add Photo Form / Drawer */}
              {isAddingGallery && (
                <form onSubmit={handleCreateGalleryItem} className="p-6 rounded-2xl bg-slate-800 border-2 border-amber-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-400" />
                      <span>Upload Photo to School Gallery</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingGallery(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Left: Image input & local upload */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Image Source (File Upload or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newGalleryData.imageUrl}
                            onChange={(e) => setNewGalleryData({ ...newGalleryData, imageUrl: e.target.value })}
                            placeholder="Paste photo URL (https://...) or upload below"
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                          />
                          <button
                            type="button"
                            onClick={() => galleryFileInputRef.current?.click()}
                            className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                          </button>
                          <input
                            type="file"
                            ref={galleryFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (base64) => setNewGalleryData({ ...newGalleryData, imageUrl: base64 }));
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* Live Image Preview */}
                      <div className="w-full h-44 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center">
                        {newGalleryData.imageUrl ? (
                          <img src={newGalleryData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center text-slate-500 space-y-1">
                            <Camera className="w-8 h-8 mx-auto stroke-1" />
                            <p className="text-xs">Photo preview will appear here</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Metadata */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Photo Title / Caption</label>
                        <input
                          type="text"
                          value={newGalleryData.title}
                          onChange={(e) => setNewGalleryData({ ...newGalleryData, title: e.target.value })}
                          placeholder="e.g. Annual Inter-School Science Olympiad"
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
                          <select
                            value={newGalleryData.category}
                            onChange={(e) => setNewGalleryData({ ...newGalleryData, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                          >
                            <option value="Campus">Campus</option>
                            <option value="STEM & Labs">STEM &amp; Labs</option>
                            <option value="Sports">Sports</option>
                            <option value="Arts & Culture">Arts &amp; Culture</option>
                            <option value="Events">Events</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Badge Tag</label>
                          <input
                            type="text"
                            value={newGalleryData.tag}
                            onChange={(e) => setNewGalleryData({ ...newGalleryData, tag: e.target.value })}
                            placeholder="e.g. Science Lab"
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Brief Description</label>
                        <textarea
                          rows={2}
                          value={newGalleryData.description}
                          onChange={(e) => setNewGalleryData({ ...newGalleryData, description: e.target.value })}
                          placeholder="Short description of the event or activity..."
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingGallery(false)}
                          className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-600 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Publish to Gallery</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryItems
                  .filter(item => galleryCategoryFilter === 'All' || item.category === galleryCategoryFilter)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-slate-800/80 border border-slate-700 overflow-hidden shadow-md flex flex-col group hover:border-slate-500 transition-all"
                    >
                      <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-950/80 text-amber-300 border border-white/10 backdrop-blur-md">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{item.description}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-mono">{item.tag || item.category}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingGalleryItem(item)}
                              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-400 cursor-pointer"
                              title="Edit Photo"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                deleteGalleryItem(item.id);
                                showToast('Photo removed from gallery');
                              }}
                              className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 cursor-pointer"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Edit Gallery Item Modal */}
              {editingGalleryItem && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditGalleryItem} className="max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-amber-400" />
                        <span>Edit Gallery Item</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingGalleryItem(null)}
                        className="text-slate-400 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Title</label>
                        <input
                          type="text"
                          value={editingGalleryItem.title}
                          onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
                          <select
                            value={editingGalleryItem.category}
                            onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                          >
                            <option value="Campus">Campus</option>
                            <option value="STEM & Labs">STEM &amp; Labs</option>
                            <option value="Sports">Sports</option>
                            <option value="Arts & Culture">Arts &amp; Culture</option>
                            <option value="Events">Events</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Tag</label>
                          <input
                            type="text"
                            value={editingGalleryItem.tag || ''}
                            onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, tag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Image URL / Replace</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingGalleryItem.imageUrl}
                            onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, imageUrl: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                          <button
                            type="button"
                            onClick={() => editGalleryFileInputRef.current?.click()}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Replace
                          </button>
                          <input
                            type="file"
                            ref={editGalleryFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (base64) => setEditingGalleryItem({ ...editingGalleryItem, imageUrl: base64 }));
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingGalleryItem.description}
                          onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingGalleryItem(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: NOTICES & CIRCULARS MANAGER */}
          {/* ========================================================================= */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              
              {/* Header with Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white">Notice Board &amp; Circulars Manager</h3>
                  <p className="text-xs text-slate-400">Broadcast official school notices, examination routines, and holidays across all student and parent portals.</p>
                </div>
                <button
                  onClick={() => setIsAddingNotice(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Broadcast Notice</span>
                </button>
              </div>

              {/* Add Notice Form */}
              {isAddingNotice && (
                <form onSubmit={handleCreateNotice} className="p-6 rounded-2xl bg-slate-800 border-2 border-red-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-red-400" />
                      <span>Broadcast Official Circular</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingNotice(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Notice Headline / Title</label>
                      <input
                        type="text"
                        value={newNoticeData.title}
                        onChange={(e) => setNewNoticeData({ ...newNoticeData, title: e.target.value })}
                        placeholder="e.g. First Terminal Examination Schedule & Admit Card Issuance"
                        required
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
                        <select
                          value={newNoticeData.category}
                          onChange={(e) => setNewNoticeData({ ...newNoticeData, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                        >
                          <option value="General">General Notice</option>
                          <option value="Academic">Academic</option>
                          <option value="Examination">Examination</option>
                          <option value="Sports">Sports</option>
                          <option value="Holiday">Holiday</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Publish Date</label>
                        <input
                          type="text"
                          value={newNoticeData.date}
                          onChange={(e) => setNewNoticeData({ ...newNoticeData, date: e.target.value })}
                          placeholder="e.g. 04 Sep 2026"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>

                      <div className="flex items-center pt-6">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={newNoticeData.isUrgent}
                            onChange={(e) => setNewNoticeData({ ...newNoticeData, isUrgent: e.target.checked })}
                            className="rounded border-slate-700 text-red-600 focus:ring-red-500"
                          />
                          <span className="text-xs font-bold text-red-400">Mark as URGENT Announcement</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Brief Summary</label>
                      <input
                        type="text"
                        value={newNoticeData.summary}
                        onChange={(e) => setNewNoticeData({ ...newNoticeData, summary: e.target.value })}
                        placeholder="Short 1-2 sentence overview visible on the notice card"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Detailed Circular Text</label>
                      <textarea
                        rows={3}
                        value={newNoticeData.details}
                        onChange={(e) => setNewNoticeData({ ...newNoticeData, details: e.target.value })}
                        placeholder="Comprehensive circular details, instructions for students & guardians..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAddingNotice(false)}
                        className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-600 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <Send className="w-4 h-4" />
                        <span>Broadcast Circular</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Notices Table */}
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-700 text-[11px] uppercase font-bold">
                    <tr>
                      <th className="p-4">Notice Details</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-center">Urgency</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 text-slate-300">
                    {schoolNotices.map((not) => (
                      <tr key={not.id} className="hover:bg-slate-700/30">
                        <td className="p-4 font-bold text-white max-w-md">
                          <div className="space-y-0.5">
                            <p className="font-bold text-white text-xs">{not.title}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1 font-normal">{not.summary}</p>
                          </div>
                        </td>
                        <td className="p-4 font-medium text-slate-300">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 border border-slate-700">
                            {not.category}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">{not.date}</td>
                        <td className="p-4 text-center">
                          {not.isUrgent ? (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-600/20 text-red-400 border border-red-500/30">
                              URGENT
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-700 text-slate-400">
                              Normal
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingNotice(not)}
                              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-400 cursor-pointer"
                              title="Edit Circular"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                deleteNotice(not.id);
                                showToast('Notice removed');
                              }}
                              className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 cursor-pointer"
                              title="Delete Notice"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit Notice Modal */}
              {editingNotice && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditNotice} className="max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-amber-400" />
                        <span>Edit Official Circular</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingNotice(null)}
                        className="text-slate-400 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Title</label>
                        <input
                          type="text"
                          value={editingNotice.title}
                          onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
                          <select
                            value={editingNotice.category}
                            onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                          >
                            <option value="General">General</option>
                            <option value="Academic">Academic</option>
                            <option value="Examination">Examination</option>
                            <option value="Sports">Sports</option>
                            <option value="Holiday">Holiday</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Date</label>
                          <input
                            type="text"
                            value={editingNotice.date}
                            onChange={(e) => setEditingNotice({ ...editingNotice, date: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={editingNotice.isUrgent || false}
                            onChange={(e) => setEditingNotice({ ...editingNotice, isUrgent: e.target.checked })}
                            className="rounded border-slate-700 text-red-600 focus:ring-red-500"
                          />
                          <span className="text-xs font-bold text-red-400">Mark as URGENT Notice</span>
                        </label>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Summary</label>
                        <input
                          type="text"
                          value={editingNotice.summary}
                          onChange={(e) => setEditingNotice({ ...editingNotice, summary: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Details</label>
                        <textarea
                          rows={3}
                          value={editingNotice.details}
                          onChange={(e) => setEditingNotice({ ...editingNotice, details: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingNotice(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: FACULTY & STAFF DIRECTORY MANAGER */}
          {/* ========================================================================= */}
          {activeTab === 'faculty' && (
            <div className="space-y-6">
              
              {/* Header with Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white">Staff &amp; Faculty Directory Manager</h3>
                  <p className="text-xs text-slate-400">Manage institutional educators, Head of Departments (HODs), credentials, and subject assignments.</p>
                </div>
                <button
                  onClick={() => setIsAddingFaculty(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Faculty Member</span>
                </button>
              </div>

              {/* Department Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['All', 'Science & STEM', 'Mathematics', 'Computer & AI', 'Languages & Literature', 'Arts & Physical Ed'].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setFacultyDeptFilter(dept)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      facultyDeptFilter === dept
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Add Faculty Form / Drawer */}
              {isAddingFaculty && (
                <form onSubmit={handleCreateFaculty} className="p-6 rounded-2xl bg-slate-800 border-2 border-blue-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span>Register New Faculty Mentor</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingFaculty(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Full Name</label>
                        <input
                          type="text"
                          value={newFacultyData.name}
                          onChange={(e) => setNewFacultyData({ ...newFacultyData, name: e.target.value })}
                          placeholder="e.g. Dr. Rajesh Kumar Sharma"
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Designation / Role</label>
                        <input
                          type="text"
                          value={newFacultyData.role}
                          onChange={(e) => setNewFacultyData({ ...newFacultyData, role: e.target.value })}
                          placeholder="e.g. Head of Department — Physics"
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Department</label>
                          <select
                            value={newFacultyData.department}
                            onChange={(e) => setNewFacultyData({ ...newFacultyData, department: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                          >
                            <option value="Science & STEM">Science &amp; STEM</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Computer & AI">Computer &amp; AI</option>
                            <option value="Languages & Literature">Languages &amp; Literature</option>
                            <option value="Social Sciences">Social Sciences</option>
                            <option value="Arts & Physical Ed">Arts &amp; Physical Ed</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Experience</label>
                          <input
                            type="text"
                            value={newFacultyData.experience}
                            onChange={(e) => setNewFacultyData({ ...newFacultyData, experience: e.target.value })}
                            placeholder="e.g. 14+ Years Experience"
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Academic Qualification</label>
                        <input
                          type="text"
                          value={newFacultyData.qualification}
                          onChange={(e) => setNewFacultyData({ ...newFacultyData, qualification: e.target.value })}
                          placeholder="e.g. M.Sc. Physics (Tribhuvan University), B.Ed."
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Official Email Address</label>
                        <input
                          type="email"
                          value={newFacultyData.email}
                          onChange={(e) => setNewFacultyData({ ...newFacultyData, email: e.target.value })}
                          placeholder="e.g. rajesh.physics@lfsbirgunj.edu.np"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Photo Avatar (File Upload or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newFacultyData.avatarUrl}
                            onChange={(e) => setNewFacultyData({ ...newFacultyData, avatarUrl: e.target.value })}
                            placeholder="Paste photo URL or upload"
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                          <button
                            type="button"
                            onClick={() => facultyFileInputRef.current?.click()}
                            className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                          </button>
                          <input
                            type="file"
                            ref={facultyFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (base64) => setNewFacultyData({ ...newFacultyData, avatarUrl: base64 }));
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Short Biography &amp; Pedagogy</label>
                        <textarea
                          rows={2}
                          value={newFacultyData.bio}
                          onChange={(e) => setNewFacultyData({ ...newFacultyData, bio: e.target.value })}
                          placeholder="Brief description of teaching methodology and mentorship..."
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Key Achievements (comma-separated)</label>
                        <input
                          type="text"
                          value={newFacultyData.achievementsStr}
                          onChange={(e) => setNewFacultyData({ ...newFacultyData, achievementsStr: e.target.value })}
                          placeholder="e.g. Best Teacher Parsa 2024, 100% SEE A+ Result"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingFaculty(false)}
                          className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-600 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Register Faculty</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Faculty Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {facultyMembers
                  .filter(f => facultyDeptFilter === 'All' || f.department === facultyDeptFilter)
                  .map((fac) => (
                    <div
                      key={fac.id}
                      className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between gap-3 shadow-md hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <img
                          src={fac.avatarUrl}
                          alt={fac.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-slate-600 shrink-0 bg-slate-950"
                        />
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-white truncate">{fac.name}</h4>
                          <p className="text-[11px] text-red-400 font-semibold truncate">{fac.role}</p>
                          <p className="text-[10px] text-slate-300">{fac.department}</p>
                          <p className="text-[10px] text-slate-500 font-mono truncate">{fac.email}</p>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 border-t border-slate-700/60 pt-2 space-y-1">
                        <p className="line-clamp-2 italic text-slate-300">"{fac.bio}"</p>
                        <p className="text-[10px] text-slate-500 font-medium">🎓 {fac.qualification}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-emerald-400">{fac.experience}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingFaculty(fac)}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-400 cursor-pointer"
                            title="Edit Faculty"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              deleteFacultyMember(fac.id);
                              showToast('Faculty member removed');
                            }}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 cursor-pointer"
                            title="Delete Faculty"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Edit Faculty Modal */}
              {editingFaculty && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditFaculty} className="max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-amber-400" />
                        <span>Edit Faculty Member</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingFaculty(null)}
                        className="text-slate-400 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Name</label>
                        <input
                          type="text"
                          value={editingFaculty.name}
                          onChange={(e) => setEditingFaculty({ ...editingFaculty, name: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Designation / Role</label>
                          <input
                            type="text"
                            value={editingFaculty.role}
                            onChange={(e) => setEditingFaculty({ ...editingFaculty, role: e.target.value })}
                            required
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Department</label>
                          <select
                            value={editingFaculty.department}
                            onChange={(e) => setEditingFaculty({ ...editingFaculty, department: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold"
                          >
                            <option value="Science & STEM">Science &amp; STEM</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Computer & AI">Computer &amp; AI</option>
                            <option value="Languages & Literature">Languages &amp; Literature</option>
                            <option value="Social Sciences">Social Sciences</option>
                            <option value="Arts & Physical Ed">Arts &amp; Physical Ed</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Qualification</label>
                          <input
                            type="text"
                            value={editingFaculty.qualification}
                            onChange={(e) => setEditingFaculty({ ...editingFaculty, qualification: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-300 block mb-1">Experience</label>
                          <input
                            type="text"
                            value={editingFaculty.experience}
                            onChange={(e) => setEditingFaculty({ ...editingFaculty, experience: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Email</label>
                        <input
                          type="email"
                          value={editingFaculty.email}
                          onChange={(e) => setEditingFaculty({ ...editingFaculty, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Photo Avatar</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingFaculty.avatarUrl}
                            onChange={(e) => setEditingFaculty({ ...editingFaculty, avatarUrl: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                          />
                          <button
                            type="button"
                            onClick={() => editFacultyFileInputRef.current?.click()}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Replace
                          </button>
                          <input
                            type="file"
                            ref={editFacultyFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (base64) => setEditingFaculty({ ...editingFaculty, avatarUrl: base64 }));
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Bio</label>
                        <textarea
                          rows={2}
                          value={editingFaculty.bio}
                          onChange={(e) => setEditingFaculty({ ...editingFaculty, bio: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingFaculty(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: SETTINGS & BACKUP */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              
              <div>
                <h3 className="text-base font-black text-white">System Settings &amp; Data Backup</h3>
                <p className="text-xs text-slate-400">Export JSON backups, restore from backups, or reset content back to school initial records.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Backup & Export */}
                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Export Complete Content Backup</h4>
                      <p className="text-[11px] text-slate-400">Download all slides, gallery images, circulars, and teachers in a single JSON file.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs space-y-1">
                    <p className="text-slate-300"><strong>Slider Slides:</strong> {heroSlides.length} items</p>
                    <p className="text-slate-300"><strong>Gallery Photos:</strong> {galleryItems.length} items</p>
                    <p className="text-slate-300"><strong>Official Notices:</strong> {schoolNotices.length} circulars</p>
                    <p className="text-slate-300"><strong>Faculty Records:</strong> {facultyMembers.length} teachers</p>
                  </div>

                  <button
                    onClick={handleExportBackup}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Import & Restore */}
                <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Restore from Backup</h4>
                      <p className="text-[11px] text-slate-400">Upload a previously exported Little Flower school backup JSON file.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-dashed border-slate-700 text-center space-y-2">
                    <FileText className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">Select .json backup file from your computer</p>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleImportBackup}
                      className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Security & Password Management */}
              <form onSubmit={handleChangeAdminPassword} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Administrator Security Credentials</h4>
                    <p className="text-[11px] text-slate-400">Update your private administrator password. Demo logins have been permanently removed.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currentSecurityPass}
                      onChange={(e) => setCurrentSecurityPass(e.target.value)}
                      placeholder="Current password"
                      required
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">New Password (min 5 chars)</label>
                    <input
                      type="password"
                      value={newSecurityPass}
                      onChange={(e) => setNewSecurityPass(e.target.value)}
                      placeholder="New password"
                      required
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmSecurityPass}
                      onChange={(e) => setConfirmSecurityPass(e.target.value)}
                      placeholder="Confirm password"
                      required
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                  >
                    Update Admin Password
                  </button>
                </div>
              </form>

              {/* Danger Zone: Reset to Defaults */}
              <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-800/50 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-rose-200">Institutional Factory Reset</h4>
                    <p className="text-[11px] text-rose-300/80">
                      Revert all website content back to default Little Flower Secondary School data.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-400 max-w-lg">
                    This will clear any custom changes stored in your browser and reinstate the original 8 slider photos, gallery categories, default notices, and faculty members.
                  </p>
                  <button
                    onClick={handleResetDefaults}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md cursor-pointer shrink-0"
                  >
                    Reset to Default Data
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

    </div>
  );
};
