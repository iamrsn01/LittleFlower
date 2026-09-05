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
  Phone,
  Save,
  GripVertical,
  Loader2,
  Briefcase,
  FlaskConical
} from 'lucide-react';
import { useSchoolData, HeroSlide, VacancyPosition } from '../context/SchoolDataContext';
import { SchoolNotice, GalleryItem, FacultyMember, Facility } from '../data/schoolData';
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
    facilities,
    vacancies,
    jobApplications,
    updateApplicationStatus,
    deleteJobApplication,
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
    addFacility,
    updateFacility,
    deleteFacility,
    addVacancy,
    updateVacancy,
    deleteVacancy,
    toggleVacancyActive,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    isSupabaseConnected,
    supabaseUrl,
    connectSupabase,
    disconnectSupabase,
    syncAllToSupabase
  } = useSchoolData();

  // Supabase Connection Form State
  const [sbInputUrl, setSbInputUrl] = useState(supabaseUrl || '');
  const [sbInputKey, setSbInputKey] = useState('');
  const [isSyncingSupabase, setIsSyncingSupabase] = useState(false);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('lfs_admin_authenticated') === 'true';
  });
  const [adminId, setAdminId] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'slider' | 'facilities' | 'vacancies' | 'gallery' | 'notices' | 'faculty' | 'settings'>('overview');
  
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

  // Supabase Cloud Connection Handlers
  const handleConnectSupabase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sbInputUrl.trim() || !sbInputKey.trim()) {
      showToast('Please enter both Supabase Project URL and Anon Key', 'error');
      return;
    }
    const success = await connectSupabase(sbInputUrl.trim(), sbInputKey.trim());
    if (success) {
      showToast('Connecting to Supabase Cloud Database...');
    } else {
      showToast('Failed to connect. Ensure URL starts with https://', 'error');
    }
  };

  const handlePushAllToSupabase = async () => {
    setIsSyncingSupabase(true);
    const success = await syncAllToSupabase();
    setIsSyncingSupabase(false);
    if (success) {
      showToast('All current school content pushed to Supabase Cloud!');
    } else {
      showToast('Sync failed. Ensure tables are created in Supabase SQL editor.', 'error');
    }
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

  // Drag-and-Drop & Priority Reorder State
  const [draggedSlideIdx, setDraggedSlideIdx] = useState<number | null>(null);
  const [dragOverSlideIdx, setDragOverSlideIdx] = useState<number | null>(null);
  const [slideOrderStatus, setSlideOrderStatus] = useState<'idle' | 'unsaved' | 'saving' | 'saved'>('idle');
  const slideOrderDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleReorder = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= heroSlides.length || toIdx >= heroSlides.length) return;
    const updated = reorderSlides(fromIdx, toIdx);
    setSlideOrderStatus('unsaved');

    // Auto-save after 2 seconds of inactivity so changes are never lost
    if (slideOrderDebounceRef.current) clearTimeout(slideOrderDebounceRef.current);
    slideOrderDebounceRef.current = setTimeout(async () => {
      setSlideOrderStatus('saving');
      const ok = await saveSlideOrder(updated);
      setSlideOrderStatus(ok ? 'saved' : 'idle');
      if (ok) {
        showToast('Slide priority automatically saved & synced to cloud!');
      }
    }, 2000);
  };

  const handleManualSaveSlideOrder = async () => {
    if (slideOrderDebounceRef.current) clearTimeout(slideOrderDebounceRef.current);
    setSlideOrderStatus('saving');
    const ok = await saveSlideOrder();
    if (ok) {
      setSlideOrderStatus('saved');
      showToast('✓ Slide priority order saved & synced to Supabase cloud!');
      setTimeout(() => setSlideOrderStatus('idle'), 3500);
    } else {
      setSlideOrderStatus('unsaved');
      showToast('Could not sync to cloud. Saved locally.', 'error');
    }
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
    email: string;
    avatarUrl: string;
  }>({
    name: '',
    role: '',
    department: 'Science & STEM',
    email: '',
    avatarUrl: ''
  });
  const facultyFileInputRef = useRef<HTMLInputElement>(null);
  const editFacultyFileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacultyData.name.trim() || !newFacultyData.role.trim()) {
      showToast('Please enter faculty name and designation', 'error');
      return;
    }

    addFacultyMember({
      name: newFacultyData.name.trim(),
      role: newFacultyData.role.trim(),
      department: newFacultyData.department,
      email: newFacultyData.email.trim() || `${newFacultyData.name.toLowerCase().replace(/\s+/g, '.')}@lfsbirgunj.edu.np`,
      avatarUrl: newFacultyData.avatarUrl.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      qualification: '',
      experience: '',
      bio: '',
      achievements: []
    });

    setNewFacultyData({
      name: '',
      role: '',
      department: 'Science & STEM',
      email: '',
      avatarUrl: ''
    });
    setIsAddingFaculty(false);
    showToast('New team member added to directory!');
  };

  const handleSaveEditFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;
    updateFacultyMember(editingFaculty.id, editingFaculty);
    setEditingFaculty(null);
    showToast('Faculty profile updated successfully!');
  };

  // =========================================================================
  // 5. FACILITIES MANAGEMENT STATE & HANDLERS
  // =========================================================================
  const [facilitiesCategoryFilter, setFacilitiesCategoryFilter] = useState<string>('All');
  const [facilitiesSearch, setFacilitiesSearch] = useState('');
  const [isAddingFacility, setIsAddingFacility] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [newFacilityData, setNewFacilityData] = useState<{
    name: string;
    category: 'Laboratories' | 'Sports & Fitness' | 'Academics' | 'Arts & Culture' | 'Campus Life' | 'Services & Health';
    description: string;
    imageUrl: string;
    highlights: string;
    capacity: string;
    block: string;
    floor: string;
    equipment: string;
    safetyFeatures: string;
  }>({
    name: '',
    category: 'Laboratories',
    description: '',
    imageUrl: '',
    highlights: '',
    capacity: '40 Students',
    block: 'Block B: STEM Innovation Centre',
    floor: 'Ground Floor',
    equipment: '',
    safetyFeatures: ''
  });
  const facilityFileInputRef = useRef<HTMLInputElement>(null);
  const editFacilityFileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacilityData.name.trim() || !newFacilityData.description.trim()) {
      showToast('Facility name and description cannot be empty', 'error');
      return;
    }
    addFacility({
      name: newFacilityData.name,
      category: newFacilityData.category,
      description: newFacilityData.description,
      imageUrl: newFacilityData.imageUrl || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
      highlights: newFacilityData.highlights ? newFacilityData.highlights.split(',').map(s => s.trim()).filter(Boolean) : ['Modern equipment', 'Interactive demonstrations'],
      capacity: newFacilityData.capacity || '40 Students',
      block: newFacilityData.block || 'Academic Block',
      floor: newFacilityData.floor || 'Ground Floor',
      equipment: newFacilityData.equipment ? newFacilityData.equipment.split(',').map(s => s.trim()).filter(Boolean) : [],
      safetyFeatures: newFacilityData.safetyFeatures ? newFacilityData.safetyFeatures.split(',').map(s => s.trim()).filter(Boolean) : []
    });
    setNewFacilityData({
      name: '',
      category: 'Laboratories',
      description: '',
      imageUrl: '',
      highlights: '',
      capacity: '40 Students',
      block: 'Block B: STEM Innovation Centre',
      floor: 'Ground Floor',
      equipment: '',
      safetyFeatures: ''
    });
    setIsAddingFacility(false);
    showToast('Campus facility added successfully!');
  };

  const handleSaveEditFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFacility) return;
    updateFacility(editingFacility.id, editingFacility);
    setEditingFacility(null);
    showToast('Campus facility updated successfully!');
  };

  // =========================================================================
  // 6. VACANCIES MANAGEMENT STATE & HANDLERS
  // =========================================================================
  const [vacancyCategoryFilter, setVacancyCategoryFilter] = useState('All');
  const [vacancyStatusFilter, setVacancyStatusFilter] = useState<'All' | 'Active' | 'Paused'>('All');
  const [vacancySearch, setVacancySearch] = useState('');
  const [vacancySubTab, setVacancySubTab] = useState<'openings' | 'applications'>('openings');
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<'All' | 'Pending' | 'Reviewing' | 'Shortlisted' | 'Rejected'>('All');
  const [appPositionFilter, setAppPositionFilter] = useState('All');
  const [isAddingVacancy, setIsAddingVacancy] = useState(false);

  const handleExportApplicationsCSV = () => {
    if (jobApplications.length === 0) {
      showToast('No applications to export', 'error');
      return;
    }
    const headers = ['Reference ID', 'Position', 'Applicant Name', 'Email', 'Phone', 'Qualification', 'Experience', 'Status', 'Date Applied'];
    const rows = jobApplications.map(a => [
      a.refNumber,
      `"${a.positionTitle.replace(/"/g, '""')}"`,
      `"${a.fullName.replace(/"/g, '""')}"`,
      a.email,
      a.phone,
      `"${a.qualification.replace(/"/g, '""')}"`,
      `"${a.experience.replace(/"/g, '""')}"`,
      a.status,
      new Date(a.appliedAt).toLocaleDateString()
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `LFS_Job_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Applications exported to CSV!');
  };
  const [editingVacancy, setEditingVacancy] = useState<{
    id: string;
    title: string;
    category: string;
    iconType: 'computer' | 'english' | 'science' | 'math' | 'ecd' | 'admin';
    type: string;
    description: string;
    qualification: string;
    experience: string;
    location: string;
    responsibilitiesText: string;
    requirementsText: string;
    isActive: boolean;
    deadline: string;
  } | null>(null);

  const [newVacancyData, setNewVacancyData] = useState<{
    title: string;
    category: string;
    iconType: 'computer' | 'english' | 'science' | 'math' | 'ecd' | 'admin';
    type: string;
    description: string;
    qualification: string;
    experience: string;
    location: string;
    responsibilities: string;
    requirements: string;
    isActive: boolean;
    deadline: string;
  }>({
    title: '',
    category: 'Computer & AI',
    iconType: 'computer',
    type: 'Full Time',
    description: '',
    qualification: '',
    experience: '',
    location: 'Birgunj, Parsa',
    responsibilities: '',
    requirements: '',
    isActive: true,
    deadline: 'Rolling Basis'
  });

  const handleStartEditVacancy = (vac: VacancyPosition) => {
    setEditingVacancy({
      id: vac.id,
      title: vac.title,
      category: vac.category,
      iconType: vac.iconType,
      type: vac.type,
      description: vac.description,
      qualification: vac.qualification,
      experience: vac.experience,
      location: vac.location,
      responsibilitiesText: Array.isArray(vac.responsibilities)
        ? vac.responsibilities.join('\n')
        : (vac.responsibilities || ''),
      requirementsText: Array.isArray(vac.requirements)
        ? vac.requirements.join('\n')
        : (vac.requirements || ''),
      isActive: vac.isActive !== false,
      deadline: vac.deadline || 'Rolling Basis'
    });
  };

  const handleCreateVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVacancyData.title.trim() || !newVacancyData.description.trim()) {
      showToast('Position title and description are required', 'error');
      return;
    }
    addVacancy({
      title: newVacancyData.title.trim(),
      category: newVacancyData.category,
      iconType: newVacancyData.iconType,
      type: newVacancyData.type.trim() || 'Full Time',
      description: newVacancyData.description.trim(),
      qualification: newVacancyData.qualification.trim() || "Bachelor's Degree in relevant discipline",
      experience: newVacancyData.experience.trim() || '1+ Years Teaching Experience',
      location: newVacancyData.location.trim() || 'Birgunj, Parsa',
      responsibilities: newVacancyData.responsibilities
        ? newVacancyData.responsibilities.split('\n').map(s => s.trim()).filter(Boolean)
        : [],
      requirements: newVacancyData.requirements
        ? newVacancyData.requirements.split('\n').map(s => s.trim()).filter(Boolean)
        : (newVacancyData.qualification.trim() ? [newVacancyData.qualification.trim()] : []),
      isActive: newVacancyData.isActive,
      deadline: newVacancyData.deadline?.trim() || 'Rolling Basis'
    });
    setNewVacancyData({
      title: '',
      category: 'Computer & AI',
      iconType: 'computer',
      type: 'Full Time',
      description: '',
      qualification: '',
      experience: '',
      location: 'Birgunj, Parsa',
      responsibilities: '',
      requirements: '',
      isActive: true,
      deadline: 'Rolling Basis'
    });
    setIsAddingVacancy(false);
    showToast('New job vacancy published to careers portal!');
  };

  const handleSaveEditVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVacancy) return;
    updateVacancy(editingVacancy.id, {
      title: editingVacancy.title.trim(),
      category: editingVacancy.category,
      iconType: editingVacancy.iconType,
      type: editingVacancy.type.trim(),
      description: editingVacancy.description.trim(),
      qualification: editingVacancy.qualification.trim(),
      experience: editingVacancy.experience.trim(),
      location: editingVacancy.location.trim(),
      responsibilities: editingVacancy.responsibilitiesText
        ? editingVacancy.responsibilitiesText.split('\n').map(s => s.trim()).filter(Boolean)
        : [],
      requirements: editingVacancy.requirementsText
        ? editingVacancy.requirementsText.split('\n').map(s => s.trim()).filter(Boolean)
        : (editingVacancy.qualification.trim() ? [editingVacancy.qualification.trim()] : []),
      isActive: editingVacancy.isActive,
      deadline: editingVacancy.deadline?.trim() || 'Rolling Basis'
    });
    setEditingVacancy(null);
    showToast('Job vacancy updated successfully!');
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
                type="button"
                onClick={handlePushAllToSupabase}
                disabled={isSyncingSupabase}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 border border-emerald-500 transition-all cursor-pointer disabled:opacity-50"
                title="Push all local changes to Supabase Cloud"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isSyncingSupabase ? 'Syncing...' : 'Sync to Cloud'}</span>
              </button>
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
              { key: 'facilities', label: 'Facilities & Labs', icon: FlaskConical, count: facilities.length },
              { key: 'vacancies', label: 'Careers & Vacancy', icon: Briefcase, count: vacancies.length },
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div 
                  onClick={() => setActiveTab('slider')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Slider</span>
                    <ImageIcon className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-2xl font-black text-white">{heroSlides.length}</p>
                  <span className="text-[10px] text-emerald-400 font-bold block truncate">Active Slides</span>
                </div>

                <div 
                  onClick={() => setActiveTab('facilities')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Facilities</span>
                    <FlaskConical className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-2xl font-black text-white">{facilities.length}</p>
                  <span className="text-[10px] text-cyan-400 font-bold block truncate">Labs &amp; Campus</span>
                </div>

                <div 
                  onClick={() => setActiveTab('vacancies')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Vacancies</span>
                    <Briefcase className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-2xl font-black text-white">{vacancies.length}</p>
                  <span className="text-[10px] text-purple-400 font-bold block truncate">
                    {vacancies.filter(v => v.isActive !== false).length} Active Hiring
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('gallery')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Gallery</span>
                    <Camera className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-2xl font-black text-white">{galleryItems.length}</p>
                  <span className="text-[10px] text-amber-400 font-bold block truncate">Photos</span>
                </div>

                <div 
                  onClick={() => setActiveTab('notices')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Notices</span>
                    <Bell className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-2xl font-black text-white">{schoolNotices.length}</p>
                  <span className="text-[10px] text-rose-400 font-bold block truncate">Circulars</span>
                </div>

                <div 
                  onClick={() => setActiveTab('faculty')}
                  className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 space-y-1 shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Faculty</span>
                    <Users className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-2xl font-black text-white">{facultyMembers.length}</p>
                  <span className="text-[10px] text-blue-400 font-bold block truncate">Staff Team</span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Quick Content Actions</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <button
                    onClick={() => { setActiveTab('slider'); setIsAddingSlide(true); }}
                    className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-red-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-red-400 group-hover:text-white mb-1.5" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Slider Slide</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-red-100">Hero banner</p>
                  </button>

                  <button
                    onClick={() => { setActiveTab('facilities'); setIsAddingFacility(true); }}
                    className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-cyan-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-cyan-400 group-hover:text-white mb-1.5" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Add Facility</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-cyan-100">Lab or campus area</p>
                  </button>

                  <button
                    onClick={() => { setActiveTab('vacancies'); setIsAddingVacancy(true); }}
                    className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-purple-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-purple-400 group-hover:text-white mb-1.5" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Post Vacancy</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-purple-100">Career opening</p>
                  </button>

                  <button
                    onClick={() => { setActiveTab('gallery'); setIsAddingGallery(true); }}
                    className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-amber-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-amber-400 group-hover:text-white mb-1.5" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Gallery Photo</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-amber-100">Campus media</p>
                  </button>

                  <button
                    onClick={() => { setActiveTab('notices'); setIsAddingNotice(true); }}
                    className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-rose-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-rose-400 group-hover:text-white mb-1.5" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Notice</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-rose-100">Circular release</p>
                  </button>

                  <button
                    onClick={() => { setActiveTab('faculty'); setIsAddingFaculty(true); }}
                    className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-blue-600 hover:text-white border border-slate-700 transition-all text-left group cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-blue-400 group-hover:text-white mb-1.5" />
                    <p className="text-xs font-bold text-white group-hover:text-white">Faculty Staff</p>
                    <p className="text-[10px] text-slate-400 group-hover:text-blue-100">Teacher profile</p>
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
              
              {/* Header with Save Order and Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white">Hero Banner Slider Manager</h3>
                  <p className="text-xs text-slate-400">Add, edit, reorder priority, or remove images displayed in the main top homepage carousel.</p>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  {/* Save Slide Order Button */}
                  <button
                    onClick={handleManualSaveSlideOrder}
                    disabled={slideOrderStatus === 'saving'}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                      slideOrderStatus === 'unsaved'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 animate-pulse'
                        : slideOrderStatus === 'saving'
                        ? 'bg-slate-700 text-slate-300 cursor-wait'
                        : slideOrderStatus === 'saved'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                    title="Save current priority order of slider images"
                  >
                    {slideOrderStatus === 'saving' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                        <span>Saving Priority...</span>
                      </>
                    ) : slideOrderStatus === 'saved' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Order Saved!</span>
                      </>
                    ) : slideOrderStatus === 'unsaved' ? (
                      <>
                        <Save className="w-4 h-4 text-white" />
                        <span>Save New Order (Unsaved)</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 text-emerald-400" />
                        <span>Save Slide Order</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsAddingSlide(true)}
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Slide</span>
                  </button>
                </div>
              </div>

              {/* Priority & Reorder Guidance Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                    <GripVertical className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="font-bold text-white block">Priority & Reorder Control</span>
                    <span className="text-slate-400 text-[11px]">
                      Drag slides by the grip handle (⋮⋮) or click <strong>↑</strong> and <strong>↓</strong> to change priority. <strong>Slide #1</strong> displays first on the homepage.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {slideOrderStatus === 'unsaved' && (
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      Unsaved Order Changes
                    </span>
                  )}
                  <button
                    onClick={handleManualSaveSlideOrder}
                    disabled={slideOrderStatus === 'saving'}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer disabled:opacity-50"
                  >
                    {slideOrderStatus === 'saving' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    <span>{slideOrderStatus === 'saving' ? 'Saving...' : 'Save Order Now'}</span>
                  </button>
                </div>
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

              {/* Slider Slides List with Drag & Drop */}
              <div className="space-y-3">
                {heroSlides.map((slide, index) => {
                  const isDragging = draggedSlideIdx === index;
                  const isDragOver = dragOverSlideIdx === index;
                  return (
                    <div
                      key={slide.id}
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', String(index));
                        setDraggedSlideIdx(index);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (dragOverSlideIdx !== index) {
                          setDragOverSlideIdx(index);
                        }
                      }}
                      onDragLeave={() => {
                        if (dragOverSlideIdx === index) {
                          setDragOverSlideIdx(null);
                        }
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedSlideIdx !== null && draggedSlideIdx !== index) {
                          handleReorder(draggedSlideIdx, index);
                        }
                        setDraggedSlideIdx(null);
                        setDragOverSlideIdx(null);
                      }}
                      onDragEnd={() => {
                        setDraggedSlideIdx(null);
                        setDragOverSlideIdx(null);
                      }}
                      className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md ${
                        isDragging
                          ? 'opacity-40 border-dashed border-red-500 bg-slate-900 scale-[0.99]'
                          : isDragOver
                          ? 'border-emerald-500 bg-slate-800/95 ring-2 ring-emerald-500/50 scale-[1.01]'
                          : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        {/* Drag Handle & Up/Down Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div 
                            className="p-1.5 sm:p-2 rounded-xl bg-slate-900/90 text-slate-400 hover:text-white cursor-grab active:cursor-grabbing border border-slate-700/60"
                            title="Drag up or down to reorder priority"
                          >
                            <GripVertical className="w-4 h-4" />
                          </div>

                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleReorder(index, index - 1)}
                              disabled={index === 0}
                              className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
                              title="Move Up (Increase Priority)"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleReorder(index, index + 1)}
                              disabled={index === heroSlides.length - 1}
                              className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
                              title="Move Down (Decrease Priority)"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Thumbnail */}
                        <img
                          src={slide.image}
                          alt={slide.caption}
                          className="w-20 h-14 sm:w-28 sm:h-18 rounded-xl object-cover border border-slate-700 shrink-0 bg-slate-950"
                        />

                        {/* Information */}
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                              index === 0
                                ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40'
                                : 'bg-red-600/20 text-red-400 border-red-500/30'
                            }`}>
                              {index === 0 ? '★ Slide #1 (Top Priority)' : `Priority #${index + 1}`}
                            </span>
                            <span className="text-xs text-slate-400 truncate">{slide.location}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white leading-snug truncate sm:whitespace-normal">{slide.caption}</h4>
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
                  );
                })}
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
          {/* TAB 3: FACILITIES & LABS MANAGER */}
          {/* ========================================================================= */}
          {activeTab === 'facilities' && (
            <div className="space-y-6">
              
              {/* Header with Search and Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-cyan-400" />
                    <span>Campus Facilities &amp; Infrastructure Manager</span>
                  </h3>
                  <p className="text-xs text-slate-400">Manage science laboratories, computer ICT suites, library, sports grounds, and academic infrastructure.</p>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <button
                    onClick={() => setIsAddingFacility(true)}
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-600/30 cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Facility</span>
                  </button>
                </div>
              </div>

              {/* Filters Bar: Search & Category Chips */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={facilitiesSearch}
                      onChange={(e) => setFacilitiesSearch(e.target.value)}
                      placeholder="Search facility by name, block, or equipment..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {['All', 'Laboratories', 'Academics', 'Sports & Fitness', 'Arts & Culture', 'Campus Life', 'Services & Health'].map((cat) => {
                    const count = cat === 'All'
                      ? facilities.length
                      : facilities.filter(f => f.category === cat).length;
                    const isActive = facilitiesCategoryFilter === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setFacilitiesCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? 'bg-cyan-600 text-white shadow-sm'
                            : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700/60'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          isActive ? 'bg-cyan-800 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Facility Modal */}
              {isAddingFacility && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                  <form onSubmit={handleCreateFacility} className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl my-8">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Plus className="w-4 h-4 text-cyan-400" />
                        <span>Add New Campus Facility</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingFacility(false)}
                        className="text-slate-400 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Facility Name *</label>
                        <input
                          type="text"
                          value={newFacilityData.name}
                          onChange={(e) => setNewFacilityData({ ...newFacilityData, name: e.target.value })}
                          placeholder="e.g. Advanced Optics & Physics Research Lab"
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Category *</label>
                        <select
                          value={newFacilityData.category}
                          onChange={(e) => setNewFacilityData({ ...newFacilityData, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 font-bold"
                        >
                          <option value="Laboratories">Laboratories</option>
                          <option value="Academics">Academics</option>
                          <option value="Sports & Fitness">Sports &amp; Fitness</option>
                          <option value="Arts & Culture">Arts &amp; Culture</option>
                          <option value="Campus Life">Campus Life</option>
                          <option value="Services & Health">Services &amp; Health</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Student Capacity</label>
                        <input
                          type="text"
                          value={newFacilityData.capacity}
                          onChange={(e) => setNewFacilityData({ ...newFacilityData, capacity: e.target.value })}
                          placeholder="e.g. 45 Students"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Campus Block</label>
                        <input
                          type="text"
                          value={newFacilityData.block}
                          onChange={(e) => setNewFacilityData({ ...newFacilityData, block: e.target.value })}
                          placeholder="e.g. Block B: STEM Innovation Centre"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Floor / Level</label>
                        <input
                          type="text"
                          value={newFacilityData.floor}
                          onChange={(e) => setNewFacilityData({ ...newFacilityData, floor: e.target.value })}
                          placeholder="e.g. 2nd Floor (West Wing)"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Photo Image URL or File</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newFacilityData.imageUrl}
                            onChange={(e) => setNewFacilityData({ ...newFacilityData, imageUrl: e.target.value })}
                            placeholder="https://images.unsplash.com/... or upload"
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => facilityFileInputRef.current?.click()}
                            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                          >
                            Upload File
                          </button>
                          <input
                            type="file"
                            ref={facilityFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (base64) => setNewFacilityData({ ...newFacilityData, imageUrl: base64 }));
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Detailed Description *</label>
                        <textarea
                          rows={3}
                          value={newFacilityData.description}
                          onChange={(e) => setNewFacilityData({ ...newFacilityData, description: e.target.value })}
                          placeholder="Describe the facility equipment, pedagogical usage, and benefits for students..."
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Key Highlights (Comma separated)</label>
                        <input
                          type="text"
                          value={newFacilityData.highlights}
                          onChange={(e) => setNewFacilityData({ ...newFacilityData, highlights: e.target.value })}
                          placeholder="e.g. High-speed LAN, 40+ Workstations, Interactive Projector"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Equipment List (Comma separated)</label>
                        <input
                          type="text"
                          value={newFacilityData.equipment}
                          onChange={(e) => setNewFacilityData({ ...newFacilityData, equipment: e.target.value })}
                          placeholder="e.g. Binocular Microscopes, Optics Benches, Chemical Fume Extraction"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Safety Features (Comma separated)</label>
                        <input
                          type="text"
                          value={newFacilityData.safetyFeatures}
                          onChange={(e) => setNewFacilityData({ ...newFacilityData, safetyFeatures: e.target.value })}
                          placeholder="e.g. Eye-wash stations, Class-B Fire Extinguisher, First Aid Kit"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsAddingFacility(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        Add Facility
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Edit Facility Modal */}
              {editingFacility && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                  <form onSubmit={handleSaveEditFacility} className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl my-8">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-cyan-400" />
                        <span>Edit Facility: {editingFacility.name}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingFacility(null)}
                        className="text-slate-400 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Facility Name *</label>
                        <input
                          type="text"
                          value={editingFacility.name}
                          onChange={(e) => setEditingFacility({ ...editingFacility, name: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Category *</label>
                        <select
                          value={editingFacility.category}
                          onChange={(e) => setEditingFacility({ ...editingFacility, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 font-bold"
                        >
                          <option value="Laboratories">Laboratories</option>
                          <option value="Academics">Academics</option>
                          <option value="Sports & Fitness">Sports &amp; Fitness</option>
                          <option value="Arts & Culture">Arts &amp; Culture</option>
                          <option value="Campus Life">Campus Life</option>
                          <option value="Services & Health">Services &amp; Health</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Student Capacity</label>
                        <input
                          type="text"
                          value={editingFacility.capacity}
                          onChange={(e) => setEditingFacility({ ...editingFacility, capacity: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Campus Block</label>
                        <input
                          type="text"
                          value={editingFacility.block || ''}
                          onChange={(e) => setEditingFacility({ ...editingFacility, block: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Floor / Level</label>
                        <input
                          type="text"
                          value={editingFacility.floor || ''}
                          onChange={(e) => setEditingFacility({ ...editingFacility, floor: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Image URL or File</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingFacility.imageUrl}
                            onChange={(e) => setEditingFacility({ ...editingFacility, imageUrl: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500 font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => editFacilityFileInputRef.current?.click()}
                            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
                          >
                            Upload
                          </button>
                          <input
                            type="file"
                            ref={editFacilityFileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (base64) => setEditingFacility({ ...editingFacility, imageUrl: base64 }));
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Detailed Description *</label>
                        <textarea
                          rows={3}
                          value={editingFacility.description}
                          onChange={(e) => setEditingFacility({ ...editingFacility, description: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Highlights (Comma separated)</label>
                        <input
                          type="text"
                          value={(editingFacility.highlights || []).join(', ')}
                          onChange={(e) => setEditingFacility({
                            ...editingFacility,
                            highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Equipment (Comma separated)</label>
                        <input
                          type="text"
                          value={(editingFacility.equipment || []).join(', ')}
                          onChange={(e) => setEditingFacility({
                            ...editingFacility,
                            equipment: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Safety Features (Comma separated)</label>
                        <input
                          type="text"
                          value={(editingFacility.safetyFeatures || []).join(', ')}
                          onChange={(e) => setEditingFacility({
                            ...editingFacility,
                            safetyFeatures: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingFacility(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Facilities List Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {facilities
                  .filter(f => {
                    const matchesCat = facilitiesCategoryFilter === 'All' || f.category === facilitiesCategoryFilter;
                    const q = facilitiesSearch.toLowerCase().trim();
                    const matchesQ = !q || 
                      f.name.toLowerCase().includes(q) ||
                      f.description.toLowerCase().includes(q) ||
                      (f.block && f.block.toLowerCase().includes(q)) ||
                      (f.equipment && f.equipment.some(e => e.toLowerCase().includes(q)));
                    return matchesCat && matchesQ;
                  })
                  .map((fac) => (
                    <div key={fac.id} className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex flex-col justify-between gap-3 shadow-md hover:border-slate-600 transition-all">
                      <div className="flex gap-3">
                        <img
                          src={fac.imageUrl}
                          alt={fac.name}
                          className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-600/20 text-cyan-300 border border-cyan-500/30">
                              {fac.category}
                            </span>
                            {fac.capacity && (
                              <span className="text-[10px] text-slate-400 font-medium">{fac.capacity}</span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-white leading-snug">{fac.name}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2">{fac.description}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {fac.block || 'Main Campus'} {fac.floor ? `• ${fac.floor}` : ''}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingFacility(fac)}
                            className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete facility "${fac.name}"?`)) {
                                deleteFacility(fac.id);
                                showToast('Facility removed');
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-bold flex items-center gap-1 border border-rose-800/40 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: CAREERS & VACANCIES MANAGER */}
          {/* ========================================================================= */}
          {activeTab === 'vacancies' && (
            <div className="space-y-6">
              
              {/* Header with Post Vacancy Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    <span>Careers &amp; Vacancy Portal Manager</span>
                  </h3>
                  <p className="text-xs text-slate-400">Post open teaching or administration positions, edit qualifications, and toggle hiring status.</p>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handlePushAllToSupabase}
                    disabled={isSyncingSupabase}
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-900/30 cursor-pointer transition-all disabled:opacity-50"
                    title="Push current vacancies and school data to Supabase Cloud"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isSyncingSupabase ? 'Syncing...' : 'Sync to Cloud'}</span>
                  </button>
                  <button
                    onClick={() => setIsAddingVacancy(true)}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post New Vacancy</span>
                  </button>
                </div>
              </div>

              {/* Subtabs Toggle: Openings vs Received Applications */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => setVacancySubTab('openings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    vacancySubTab === 'openings'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Job Openings</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/60 text-slate-200 font-mono">
                    {vacancies.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setVacancySubTab('applications')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    vacancySubTab === 'applications'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Candidate Applications</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    jobApplications.filter(a => a.status === 'Pending').length > 0
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-950/60 text-slate-300'
                  }`}>
                    {jobApplications.length}
                  </span>
                </button>
              </div>

              {vacancySubTab === 'openings' && (
                <div className="space-y-6">
                  {/* Filters Bar: Status Tabs, Category Chips, Search */}
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={vacancySearch}
                      onChange={(e) => setVacancySearch(e.target.value)}
                      placeholder="Search vacancies by title, subject, or qualification..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-700 shrink-0">
                    {(['All', 'Active', 'Paused'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setVacancyStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                          vacancyStatusFilter === st
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {['All', 'Computer & AI', 'Languages', 'Science & STEM', 'Mathematics', 'Pre-Primary', 'Administration'].map((cat) => {
                    const count = cat === 'All'
                      ? vacancies.length
                      : vacancies.filter(v => v.category === cat).length;
                    const isActive = vacancyCategoryFilter === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setVacancyCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                          isActive
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700/60'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          isActive ? 'bg-purple-800 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Vacancy Modal */}
              {isAddingVacancy && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                  <form onSubmit={handleCreateVacancy} className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl my-8">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Plus className="w-4 h-4 text-purple-400" />
                        <span>Post New Career Opening</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingVacancy(false)}
                        className="text-slate-400 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Position Title *</label>
                        <input
                          type="text"
                          value={newVacancyData.title}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, title: e.target.value })}
                          placeholder="e.g. Senior Secondary Physics Teacher"
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Department / Category *</label>
                        <select
                          value={newVacancyData.category}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-bold"
                        >
                          <option value="Computer & AI">Computer &amp; AI</option>
                          <option value="Languages">Languages (English / Nepali)</option>
                          <option value="Science & STEM">Science &amp; STEM</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Pre-Primary">Pre-Primary (Montessori / ECD)</option>
                          <option value="Administration">Administration &amp; Front-Desk</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Employment Type *</label>
                        <select
                          value={newVacancyData.type}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, type: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-bold"
                        >
                          <option value="Full Time">Full Time</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Contract Basis">Contract Basis</option>
                          <option value="Visiting Lecturer">Visiting Lecturer</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Icon Category Type</label>
                        <select
                          value={newVacancyData.iconType}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, iconType: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-bold"
                        >
                          <option value="computer">Computer / IT</option>
                          <option value="science">Science &amp; STEM</option>
                          <option value="math">Mathematics</option>
                          <option value="english">Languages / English</option>
                          <option value="ecd">Pre-Primary / ECD</option>
                          <option value="admin">Administration</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Experience Required</label>
                        <input
                          type="text"
                          value={newVacancyData.experience}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, experience: e.target.value })}
                          placeholder="e.g. 2+ Years Experience"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Minimum Qualification</label>
                        <input
                          type="text"
                          value={newVacancyData.qualification}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, qualification: e.target.value })}
                          placeholder="e.g. Master's in Physics or B.Sc."
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Campus Location</label>
                        <input
                          type="text"
                          value={newVacancyData.location}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, location: e.target.value })}
                          placeholder="Birgunj, Parsa"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Application Deadline</label>
                        <input
                          type="text"
                          value={newVacancyData.deadline}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, deadline: e.target.value })}
                          placeholder="e.g. Rolling Basis or 30 Chaitra 2081"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-6">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={newVacancyData.isActive}
                            onChange={(e) => setNewVacancyData({ ...newVacancyData, isActive: e.target.checked })}
                            className="rounded border-slate-700 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-xs font-bold text-white">Active &amp; Actively Hiring</span>
                        </label>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Role Description *</label>
                        <textarea
                          rows={3}
                          value={newVacancyData.description}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, description: e.target.value })}
                          placeholder="Provide an overview of the role, expected responsibilities, and department context..."
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Key Responsibilities (One per line)</label>
                        <textarea
                          rows={3}
                          value={newVacancyData.responsibilities}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, responsibilities: e.target.value })}
                          placeholder="Teach classes 6-10 physics theory and practicals&#10;Maintain laboratory equipment and student safety&#10;Evaluate homework and terminal exam answer scripts"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Candidate Requirements (One per line)</label>
                        <textarea
                          rows={3}
                          value={newVacancyData.requirements}
                          onChange={(e) => setNewVacancyData({ ...newVacancyData, requirements: e.target.value })}
                          placeholder="M.Sc. or B.Sc. in Physics with minimum second division&#10;Strong English medium communication skills&#10;Punctual and committed to student mentoring"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsAddingVacancy(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        Publish Opening
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Edit Vacancy Modal */}
              {editingVacancy && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                  <form onSubmit={handleSaveEditVacancy} className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl my-8">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-purple-400" />
                        <span>Edit Vacancy: {editingVacancy.title}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingVacancy(null)}
                        className="text-slate-400 hover:text-white p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Position Title *</label>
                        <input
                          type="text"
                          value={editingVacancy.title}
                          onChange={(e) => setEditingVacancy({ ...editingVacancy, title: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Department / Category *</label>
                        <select
                          value={editingVacancy.category}
                          onChange={(e) => setEditingVacancy({ ...editingVacancy, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-bold"
                        >
                          <option value="Computer & AI">Computer &amp; AI</option>
                          <option value="Languages">Languages (English / Nepali)</option>
                          <option value="Science & STEM">Science &amp; STEM</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Pre-Primary">Pre-Primary (Montessori / ECD)</option>
                          <option value="Administration">Administration &amp; Front-Desk</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Employment Type *</label>
                        <input
                          type="text"
                          value={editingVacancy.type}
                          onChange={(e) => setEditingVacancy({ ...editingVacancy, type: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Experience Required</label>
                        <input
                          type="text"
                          value={editingVacancy.experience}
                          onChange={(e) => setEditingVacancy({ ...editingVacancy, experience: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Minimum Qualification</label>
                        <input
                          type="text"
                          value={editingVacancy.qualification}
                          onChange={(e) => setEditingVacancy({ ...editingVacancy, qualification: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Application Deadline</label>
                        <input
                          type="text"
                          value={editingVacancy.deadline || ''}
                          onChange={(e) => setEditingVacancy({ ...editingVacancy, deadline: e.target.value })}
                          placeholder="e.g. Rolling Basis"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-6">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={editingVacancy.isActive !== false}
                            onChange={(e) => setEditingVacancy({ ...editingVacancy, isActive: e.target.checked })}
                            className="rounded border-slate-700 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-xs font-bold text-white">Active Listing (Hiring)</span>
                        </label>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Role Description *</label>
                        <textarea
                          rows={3}
                          value={editingVacancy.description}
                          onChange={(e) => setEditingVacancy({ ...editingVacancy, description: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Key Responsibilities (One per line)</label>
                        <textarea
                          rows={3}
                          value={editingVacancy.responsibilitiesText}
                          onChange={(e) => setEditingVacancy({
                            ...editingVacancy,
                            responsibilitiesText: e.target.value
                          })}
                          placeholder="Teach classes 6-10 physics theory and practicals&#10;Maintain laboratory equipment"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300 block mb-1">Candidate Requirements (One per line)</label>
                        <textarea
                          rows={3}
                          value={editingVacancy.requirementsText}
                          onChange={(e) => setEditingVacancy({
                            ...editingVacancy,
                            requirementsText: e.target.value
                          })}
                          placeholder="M.Sc. or B.Sc. in Physics with minimum second division&#10;Strong communication skills"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-purple-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingVacancy(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Vacancies List Table / Cards */}
              <div className="space-y-3">
                {vacancies
                  .filter(v => {
                    const matchesCat = vacancyCategoryFilter === 'All' || v.category === vacancyCategoryFilter;
                    const matchesStatus = vacancyStatusFilter === 'All' ||
                      (vacancyStatusFilter === 'Active' && v.isActive !== false) ||
                      (vacancyStatusFilter === 'Paused' && v.isActive === false);
                    const q = vacancySearch.toLowerCase().trim();
                    const matchesQ = !q ||
                      v.title.toLowerCase().includes(q) ||
                      v.description.toLowerCase().includes(q) ||
                      v.qualification.toLowerCase().includes(q);
                    return matchesCat && matchesStatus && matchesQ;
                  })
                  .map((vac) => {
                    const isLive = vac.isActive !== false;
                    return (
                      <div key={vac.id} className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md hover:border-slate-600 transition-all">
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600/20 text-purple-300 border border-purple-500/30">
                              {vac.category}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-700 text-slate-200">
                              {vac.type}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                              isLive 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-slate-700 text-slate-400'
                            }`}>
                              {isLive ? '● Active Hiring' : 'Paused'}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white leading-snug">{vac.title}</h4>
                          
                          <p className="text-xs text-slate-400 line-clamp-2">{vac.description}</p>
                          
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                            <span><strong>Qual:</strong> {vac.qualification}</span>
                            <span>•</span>
                            <span><strong>Exp:</strong> {vac.experience}</span>
                            <span>•</span>
                            <span><strong>Deadline:</strong> {vac.deadline || 'Rolling Basis'}</span>
                          </div>
                        </div>

                        {/* Action Buttons & Status Toggle */}
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          <button
                            type="button"
                            onClick={() => {
                              toggleVacancyActive(vac.id);
                              showToast(`Vacancy marked as ${!isLive ? 'Active' : 'Paused'}`);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                              isLive
                                ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
                                : 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30'
                            }`}
                            title="Toggle between active and paused status"
                          >
                            {isLive ? 'Pause' : 'Activate'}
                          </button>

                          <button
                            onClick={() => handleStartEditVacancy(vac)}
                            className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete vacancy position "${vac.title}"?`)) {
                                deleteVacancy(vac.id);
                                showToast('Vacancy opening removed');
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-bold flex items-center gap-1 border border-rose-800/40 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

              {/* APPLICATIONS DASHBOARD */}
              {vacancySubTab === 'applications' && (
                <div className="space-y-4">
                  {/* Filter & Search Bar */}
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
                      <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={appSearch}
                          onChange={(e) => setAppSearch(e.target.value)}
                          placeholder="Search candidate, phone, Ref ID..."
                          className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      {/* Status Tabs */}
                      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-700 overflow-x-auto w-full sm:w-auto">
                        {(['All', 'Pending', 'Reviewing', 'Shortlisted', 'Rejected'] as const).map((st) => {
                          const count = st === 'All' ? jobApplications.length : jobApplications.filter(a => a.status === st).length;
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => setAppStatusFilter(st)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap ${
                                appStatusFilter === st
                                  ? 'bg-purple-600 text-white shadow-xs'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              <span>{st}</span>
                              <span className="text-[10px] opacity-75">({count})</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleExportApplicationsCSV}
                      className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                      title="Export all applications to CSV file"
                    >
                      <Download className="w-3.5 h-3.5 text-purple-400" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {/* Candidate Applications List */}
                  {jobApplications.filter(app => {
                    const matchesStatus = appStatusFilter === 'All' || app.status === appStatusFilter;
                    const q = appSearch.toLowerCase().trim();
                    const matchesQ = !q ||
                      app.fullName.toLowerCase().includes(q) ||
                      app.positionTitle.toLowerCase().includes(q) ||
                      app.phone.includes(q) ||
                      app.email.toLowerCase().includes(q) ||
                      app.refNumber.toLowerCase().includes(q);
                    return matchesStatus && matchesQ;
                  }).length === 0 ? (
                    <div className="p-12 text-center bg-slate-800/60 rounded-3xl border border-slate-700 space-y-3">
                      <Users className="w-10 h-10 text-slate-500 mx-auto" />
                      <h4 className="text-base font-bold text-white">No candidate applications found</h4>
                      <p className="text-xs text-slate-400">Applications submitted from the public website career openings will appear here instantly.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {jobApplications
                        .filter(app => {
                          const matchesStatus = appStatusFilter === 'All' || app.status === appStatusFilter;
                          const q = appSearch.toLowerCase().trim();
                          const matchesQ = !q ||
                            app.fullName.toLowerCase().includes(q) ||
                            app.positionTitle.toLowerCase().includes(q) ||
                            app.phone.includes(q) ||
                            app.email.toLowerCase().includes(q) ||
                            app.refNumber.toLowerCase().includes(q);
                          return matchesStatus && matchesQ;
                        })
                        .map((app) => (
                          <div key={app.id} className="p-4 sm:p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-md hover:border-slate-600 transition-all">
                            <div className="space-y-2 min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs font-bold text-purple-300 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/50">
                                  {app.refNumber}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-200">
                                  Applied for: {app.positionTitle}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                                  app.status === 'Shortlisted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                  app.status === 'Reviewing' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                                  app.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                                  'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                }`}>
                                  ● {app.status}
                                </span>
                                <span className="text-[10px] text-slate-400 ml-auto">
                                  {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              </div>

                              <div>
                                <h4 className="text-base font-black text-white">{app.fullName}</h4>
                                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5 flex-wrap">
                                  <a href={`tel:${app.phone}`} className="hover:text-purple-300 flex items-center gap-1 font-mono">
                                    <Phone className="w-3 h-3 text-purple-400" />
                                    <span>{app.phone}</span>
                                  </a>
                                  <span>•</span>
                                  <a href={`mailto:${app.email}`} className="hover:text-purple-300 flex items-center gap-1">
                                    <Mail className="w-3 h-3 text-purple-400" />
                                    <span>{app.email}</span>
                                  </a>
                                </div>
                              </div>

                              <div className="grid sm:grid-cols-2 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60 text-slate-300">
                                <div>
                                  <span className="text-slate-400 text-[10px] block">Qualification</span>
                                  <span className="font-semibold text-white">{app.qualification || 'Not specified'}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 text-[10px] block">Experience</span>
                                  <span className="font-semibold text-white">{app.experience || 'Not specified'}</span>
                                </div>
                                {app.message && (
                                  <div className="sm:col-span-2 pt-1 border-t border-slate-800 text-[11px] text-slate-400 italic">
                                    "{app.message}"
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Actions & Status Control */}
                            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 items-end md:w-44">
                              <div className="w-full">
                                <label className="text-[10px] font-bold text-slate-400 block mb-1">Status</label>
                                <select
                                  value={app.status}
                                  onChange={(e) => {
                                    updateApplicationStatus(app.id, e.target.value as any);
                                    showToast(`Candidate status updated to ${e.target.value}`);
                                  }}
                                  className="w-full px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-white focus:border-purple-500 cursor-pointer"
                                >
                                  <option value="Pending">🟡 Pending Review</option>
                                  <option value="Reviewing">🔵 Reviewing</option>
                                  <option value="Shortlisted">🟢 Shortlisted</option>
                                  <option value="Rejected">🔴 Rejected</option>
                                </select>
                              </div>

                              <div className="flex items-center gap-1.5 w-full pt-1">
                                {app.resumeDataUrl ? (
                                  <a
                                    href={app.resumeDataUrl}
                                    download={app.resumeName || `CV_${app.fullName.replace(/\s+/g, '_')}.pdf`}
                                    className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30 text-center flex items-center justify-center gap-1 cursor-pointer transition-colors"
                                    title="Download attached CV / Resume"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>Download CV</span>
                                  </a>
                                ) : app.resumeName ? (
                                  <span className="flex-1 py-1.5 px-2 rounded-xl text-[10px] font-mono text-slate-400 bg-slate-900 text-center truncate border border-slate-700">
                                    {app.resumeName}
                                  </span>
                                ) : null}

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (window.confirm(`Delete application for ${app.fullName}?`)) {
                                      deleteJobApplication(app.id);
                                      showToast('Application record deleted');
                                    }
                                  }}
                                  className="p-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-800/40 cursor-pointer transition-colors"
                                  title="Delete Application"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: PHOTO GALLERY MANAGER */}
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
                  <h3 className="text-base font-black text-white">Team &amp; Faculty Directory Manager</h3>
                  <p className="text-xs text-slate-400">Manage school team members, departments, designations, and contact emails.</p>
                </div>
                <button
                  onClick={() => setIsAddingFaculty(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              </div>

              {/* Department Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['All', 'Science & STEM', 'Mathematics', 'Computer & AI', 'Languages & Literature', 'Social Sciences', 'Arts & Physical Ed'].map((dept) => (
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

              {/* Add Faculty Form */}
              {isAddingFaculty && (
                <form onSubmit={handleCreateFaculty} className="p-6 rounded-2xl bg-slate-800 border-2 border-blue-500/50 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span>Register New Team Member</span>
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
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Designation</label>
                        <input
                          type="text"
                          value={newFacultyData.role}
                          onChange={(e) => setNewFacultyData({ ...newFacultyData, role: e.target.value })}
                          placeholder="e.g. Head of Department — Physics"
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Department</label>
                        <select
                          value={newFacultyData.department}
                          onChange={(e) => setNewFacultyData({ ...newFacultyData, department: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold focus:border-blue-500 outline-none"
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

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
                        <input
                          type="email"
                          value={newFacultyData.email}
                          onChange={(e) => setNewFacultyData({ ...newFacultyData, email: e.target.value })}
                          placeholder="e.g. rajesh.physics@lfsbirgunj.edu.np"
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-mono focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Photo Avatar (Optional URL or Upload)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newFacultyData.avatarUrl}
                            onChange={(e) => setNewFacultyData({ ...newFacultyData, avatarUrl: e.target.value })}
                            placeholder="Paste photo URL or click upload"
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-blue-500 outline-none"
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

                      <div className="pt-4 flex items-center justify-end gap-3">
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
                          <span>Add Member</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Simplified Faculty Cards Grid: Name, Department, Designation, Email */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {facultyMembers
                  .filter(f => facultyDeptFilter === 'All' || f.department === facultyDeptFilter)
                  .map((fac) => (
                    <div
                      key={fac.id}
                      className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between gap-3 shadow-md hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-13 h-13 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-950 flex items-center justify-center">
                          {fac.avatarUrl ? (
                            <img
                              src={fac.avatarUrl}
                              alt={fac.name}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <span className="text-slate-400 font-bold text-sm">{fac.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-slate-700 text-blue-300 border border-slate-600 truncate max-w-full">
                            {fac.department}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate" title={fac.name}>{fac.name}</h4>
                          <p className="text-[11px] text-red-400 font-semibold truncate" title={fac.role}>{fac.role}</p>
                        </div>
                      </div>

                      {/* Email and Action Buttons */}
                      <div className="pt-2.5 border-t border-slate-700/60 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0 text-slate-400 text-[11px] font-mono truncate" title={fac.email}>
                          <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{fac.email}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditingFaculty(fac)}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-400 cursor-pointer"
                            title="Edit Member"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              deleteFacultyMember(fac.id);
                              showToast('Member removed from directory');
                            }}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 cursor-pointer"
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Edit Faculty Modal: Basic details only */}
              {editingFaculty && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditFaculty} className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-amber-400" />
                        <span>Edit Team Member</span>
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
                        <label className="text-xs font-bold text-slate-300 block mb-1">Full Name</label>
                        <input
                          type="text"
                          value={editingFaculty.name}
                          onChange={(e) => setEditingFaculty({ ...editingFaculty, name: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Designation</label>
                        <input
                          type="text"
                          value={editingFaculty.role}
                          onChange={(e) => setEditingFaculty({ ...editingFaculty, role: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Department</label>
                        <select
                          value={editingFaculty.department}
                          onChange={(e) => setEditingFaculty({ ...editingFaculty, department: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-bold focus:border-blue-500 outline-none"
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
                        <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
                        <input
                          type="email"
                          value={editingFaculty.email}
                          onChange={(e) => setEditingFaculty({ ...editingFaculty, email: e.target.value })}
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-mono focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Photo Avatar</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingFaculty.avatarUrl || ''}
                            onChange={(e) => setEditingFaculty({ ...editingFaculty, avatarUrl: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:border-blue-500 outline-none"
                            placeholder="Image URL"
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

              {/* Supabase Cloud Database Connection */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">Supabase Cloud Database Sync</h4>
                        {isSupabaseConnected ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            CONNECTED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            LOCAL STORAGE ONLY
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Connect your Supabase project to enable global real-time synchronization across all devices and visitors.
                      </p>
                    </div>
                  </div>

                  {isSupabaseConnected && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePushAllToSupabase}
                        disabled={isSyncingSupabase}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                      >
                        {isSyncingSupabase ? 'Syncing...' : 'Push Local Content to Cloud'}
                      </button>
                      <button
                        type="button"
                        onClick={disconnectSupabase}
                        className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-bold cursor-pointer"
                      >
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>

                {!isSupabaseConnected && (
                  <form onSubmit={handleConnectSupabase} className="space-y-3 pt-2 border-t border-slate-700/60">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Supabase Project URL</label>
                        <input
                          type="text"
                          value={sbInputUrl}
                          onChange={(e) => setSbInputUrl(e.target.value)}
                          placeholder="https://xyzcompany.supabase.co"
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-mono focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-1">Supabase Anon Public Key</label>
                        <input
                          type="password"
                          value={sbInputKey}
                          onChange={(e) => setSbInputKey(e.target.value)}
                          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                          required
                          className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white font-mono focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[11px] text-slate-400">
                        Run the SQL schema located in <strong className="text-emerald-400 font-mono">docs/supabase_schema.sql</strong> in your Supabase SQL Editor first.
                      </p>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all shrink-0"
                      >
                        Connect &amp; Activate Cloud Sync
                      </button>
                    </div>
                  </form>
                )}
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
