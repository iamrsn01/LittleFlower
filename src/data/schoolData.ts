export interface AcademicLevel {
  id: string;
  name: string;
  gradeRange: string;
  badge: string;
  tagline: string;
  description: string;
  curriculum: string[];
  keyHighlights: string[];
  color: string;
  iconName: string;
  subjects: { name: string; code: string; credits: string; isPractical: boolean }[];
  admissionRequirements: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: 'Science & STEM' | 'Mathematics' | 'Computer & AI' | 'Languages & Literature' | 'Social Sciences' | 'Arts & Physical Ed';
  qualification: string;
  experience: string;
  email: string;
  bio: string;
  avatarUrl: string;
  achievements: string[];
}

export interface Facility {
  id: string;
  name: string;
  category: 'Laboratories' | 'Sports & Fitness' | 'Academics' | 'Arts & Culture' | 'Campus Life';
  description: string;
  imageUrl: string;
  highlights: string[];
  capacity: string;
}

export interface SchoolNotice {
  id: string;
  title: string;
  category: 'Academic' | 'Examination' | 'Sports' | 'Holiday' | 'General';
  date: string;
  isUrgent?: boolean;
  summary: string;
  fileSize?: string;
  downloadUrl?: string;
  details: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  category: 'Academic' | 'Sports' | 'Cultural' | 'Exhibition';
  date: string;
  time: string;
  location: string;
  description: string;
  audience: string;
}

export interface StudentRecord {
  id: string;
  studentName: string;
  studentId: string;
  grade: string;
  section: string;
  rollNo: number;
  guardianName: string;
  guardianPhone: string;
  attendanceRate: number;
  monthlyAttendance: { month: string; present: number; total: number }[];
  gpa: number;
  rank: number;
  termResults: {
    term: string;
    gpa: number;
    subjects: { name: string; fullMarks: number; obtainedMarks: number; grade: string; remark: string }[];
  }[];
  examRoutines: {
    examName: string;
    startDate: string;
    endDate: string;
    schedule: { date: string; day: string; subject: string; time: string; roomNo: string }[];
  }[];
  feeLedger: {
    invoices: {
      id: string;
      title: string;
      dueDate: string;
      amount: number;
      status: 'Paid' | 'Pending' | 'Overdue';
      paymentDate?: string;
      receiptNo?: string;
    }[];
    totalPaid: number;
    totalPending: number;
  };
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  morningTime: string;
  eveningTime: string;
  stops: string[];
  status: 'On Route' | 'At Terminal' | 'Delayed';
  currentStopIndex: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  relation: string;
  rating: number;
  content: string;
  avatarUrl: string;
  highlight: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'STEM & Labs' | 'Sports' | 'Arts & Culture' | 'Campus' | 'Events';
  imageUrl: string;
  description: string;
}

export const schoolStats = [
  { label: 'SEE Board Pass Rate', value: '100%', subtext: 'Distinction & First Division Legacy' },
  { label: 'Educational Legacy', value: '20+ Yrs', subtext: 'Serving Parsa & Madhesh since 2005' },
  { label: 'Active Students', value: '1,400+', subtext: 'From Nursery to Secondary Level' },
  { label: 'Qualified Teachers', value: '48+', subtext: 'Experienced & Caring Mentors' },
  { label: 'Campus Land Area', value: '3.5 Bigha', subtext: 'Lush Green, Secure Campus' }
];

export const academicLevels: AcademicLevel[] = [
  {
    id: 'secondary-school',
    name: 'Secondary School (SEE Board)',
    gradeRange: 'Grades 9 & 10',
    badge: 'SEE Excellence',
    tagline: 'Rigorous Academic Mastery & Practical Scientific Exploration',
    description: 'Comprehensive secondary education focused on academic mastery, analytical problem-solving, laboratory experiments, and competitive examination preparation.',
    curriculum: ['National Examination Board (NEB) Curriculum', 'Advanced Science Practicals', 'Computer Programming & Logic', 'Elocution & Moral Science'],
    keyHighlights: [
      'Comprehensive preparation for SEE with regular unit and terminal mock assessments',
      'Fully equipped separate Physics, Chemistry, and Biology laboratories',
      'Model exhibitions, inter-school debates, and quiz championships',
      'Daily extra coaching classes for SEE candidates in Mathematics & Science'
    ],
    color: 'from-red-800 to-rose-900',
    iconName: 'GraduationCap',
    subjects: [
      { name: 'Compulsory Mathematics', code: 'MTH-901', credits: '4.0', isPractical: false },
      { name: 'Optional Mathematics', code: 'OPT-902', credits: '4.0', isPractical: false },
      { name: 'Science & Technology', code: 'SCI-903', credits: '4.0', isPractical: true },
      { name: 'Computer Science & ICT', code: 'CSC-904', credits: '3.5', isPractical: true },
      { name: 'Compulsory English', code: 'ENG-905', credits: '4.0', isPractical: false },
      { name: 'Social Studies & Life Skills', code: 'SOC-906', credits: '3.5', isPractical: true },
      { name: 'Compulsory Nepali', code: 'NEP-907', credits: '4.0', isPractical: false }
    ],
    admissionRequirements: [
      'Passed Grade 8 / BLE with minimum GPA 2.80',
      'Transfer Certificate (TC) & Character Certificate',
      'Entrance examination in English, Math & Science'
    ]
  },
  {
    id: 'lower-secondary',
    name: 'Lower Secondary School (BLE)',
    gradeRange: 'Grades 6 to 8',
    badge: 'Holistic Development',
    tagline: 'Fostering Analytical Thinking, Creativity & Disciplined Habits',
    description: 'Nurturing young minds through conceptual understanding, collaborative group learning, computer literacy, and active athletic participation.',
    curriculum: ['Basic Level Examination (BLE) Framework', 'Experiential Science Experiments', 'Computer Studies', 'Cultural Arts & Physical Fitness'],
    keyHighlights: [
      'Hands-on science demonstrations and math lab activities',
      'English and Nepali elocution, essay writing, and spelling bees',
      'Inter-house football, cricket, volleyball, and athletics tournaments',
      'Disciplined value education and moral character building'
    ],
    color: 'from-rose-800 to-red-900',
    iconName: 'BookOpen',
    subjects: [
      { name: 'General Science & Environment', code: 'SCI-601', credits: '4.0', isPractical: true },
      { name: 'Mathematics & Geometry', code: 'MTH-602', credits: '4.0', isPractical: false },
      { name: 'Computer Applications & Typing', code: 'COM-603', credits: '3.0', isPractical: true },
      { name: 'English Grammar & Literature', code: 'ENG-604', credits: '4.0', isPractical: false },
      { name: 'Social Studies & Civics', code: 'SOC-605', credits: '3.5', isPractical: false },
      { name: 'Moral Education & Health', code: 'MOR-606', credits: '2.0', isPractical: false }
    ],
    admissionRequirements: [
      'Grade 5 progress report card',
      'Entrance assessment in Mathematics & English',
      'Parent and student interaction'
    ]
  },
  {
    id: 'primary-school',
    name: 'Primary School Level',
    gradeRange: 'Grades 1 to 5',
    badge: 'Foundational Excellence',
    tagline: 'Activity-Based Learning & Joy of Discovery',
    description: 'Activity-oriented curriculum building strong foundations in language, reading fluency, mental arithmetic, and creative expression in a loving atmosphere.',
    curriculum: ['Child-Centric Learning', 'Mental Math & Vedic Arithmetic', 'Phonics & Handwriting Enhancement', 'Junior Science Discovery'],
    keyHighlights: [
      'Bright, ventilated, and interactive smart classrooms',
      'Well-stocked junior reading library with bilingual storybooks',
      'Daily physical drill, yoga, dance, and music sessions',
      'Regular parent-teacher review meets and personalized attention'
    ],
    color: 'from-amber-600 to-rose-700',
    iconName: 'Compass',
    subjects: [
      { name: 'Primary English Reading & Writing', code: 'PRM-101', credits: '4.0', isPractical: false },
      { name: 'Conceptual Mathematics', code: 'PRM-102', credits: '4.0', isPractical: true },
      { name: 'General Science & Nature Study', code: 'PRM-103', credits: '3.5', isPractical: true },
      { name: 'Social Studies & Moral Science', code: 'PRM-104', credits: '3.0', isPractical: false },
      { name: 'Drawing, Art & Craft', code: 'PRM-105', credits: '2.0', isPractical: true }
    ],
    admissionRequirements: [
      'Birth registration certificate',
      'Previous grade marksheet (if applicable)',
      'Basic readiness observation'
    ]
  },
  {
    id: 'kindergarten',
    name: 'Early Childhood & Pre-Primary',
    gradeRange: 'Playgroup, Nursery, LKG & UKG',
    badge: 'Play-Way Montessori',
    tagline: 'A Loving Sanctuary of Play, Sensory Growth & Joyful Learning',
    description: 'Child-friendly environment designed to nurture sensory coordination, early phonics, counting games, and emotional warmth in children aged 2.5 to 5 years.',
    curriculum: ['Montessori & Play-Way Approach', 'Sensory Exploration & Motor Skills', 'Rhymes, Storytelling & Dramatics', 'Early Phonics & Number Concepts'],
    keyHighlights: [
      'Safe indoor soft play zone, toys, puzzles, and splash pool',
      'Caring and certified pre-primary female educators and care attendants',
      'Audio-visual smart rhymes screen and puppet show sessions',
      'Clean drinking water, hygienic sanitized washrooms, and safe campus'
    ],
    color: 'from-rose-700 to-red-800',
    iconName: 'Sparkles',
    subjects: [
      { name: 'Sensory Exploration & Motor Play', code: 'EY-01', credits: '—', isPractical: true },
      { name: 'Phonics, Rhymes & Speech', code: 'EY-02', credits: '—', isPractical: true },
      { name: 'Early Numeracy & Sorting Puzzles', code: 'EY-03', credits: '—', isPractical: true },
      { name: 'Coloring, Clay Modeling & Craft', code: 'EY-04', credits: '—', isPractical: true }
    ],
    admissionRequirements: [
      'Child birth certificate (Ages 2.5+ for Nursery)',
      'Immunization record',
      'Friendly informal parent interaction'
    ]
  }
];

export const facultyMembers: FacultyMember[] = [
  {
    id: 'principal-desk',
    name: 'Mr. R. K. Kushwaha',
    role: 'Principal & Academic Director',
    department: 'Science & STEM',
    qualification: 'M.Sc. Physics (Tribhuvan University), B.Ed.',
    experience: '21+ Years in Educational Leadership',
    email: 'principal@lfsbirgunj.edu.np',
    bio: 'Guiding Little Flower Secondary School since its inception with a vision of blending moral integrity with high academic standards in the Parsa region.',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    achievements: ['Parsa District Best Principal Award 2023', 'Over 18 Batches of 100% SEE Distinction Result']
  },
  {
    id: 'vice-principal',
    name: 'Mrs. Sunita Pandey',
    role: 'Vice Principal & Head of Primary Section',
    department: 'Languages & Literature',
    qualification: 'M.A. in English & Education',
    experience: '16+ Years Experience',
    email: 'viceprincipal@lfsbirgunj.edu.np',
    bio: 'Dedicated educator specializing in early childhood language acquisition, holistic student welfare, and progressive teaching methods.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    achievements: ['Excellence in Primary Pedagogy Award', 'Director of Annual School Cultural Fest']
  },
  {
    id: 'hod-science',
    name: 'Mr. Manoj Kumar Yadav',
    role: 'Head of Department — Science & Environment',
    department: 'Science & STEM',
    qualification: 'M.Sc. Chemistry (Gold Medalist)',
    experience: '14+ Years Experience',
    email: 'manoj.science@lfsbirgunj.edu.np',
    bio: 'Passionate chemistry and science instructor who mentors students in experimental lab techniques and annual district science fairs.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    achievements: ['District Science Exhibition Chief Judge', 'Published Senior Secondary Science Guidebook']
  },
  {
    id: 'hod-math',
    name: 'Mr. Santosh Prasad Gupta',
    role: 'Head of Department — Mathematics & Opt. Math',
    department: 'Mathematics',
    qualification: 'M.Sc. Pure Mathematics',
    experience: '17+ Years Experience',
    email: 'santosh.math@lfsbirgunj.edu.np',
    bio: 'Specialist in higher algebra, geometry, and calculus. Known for turning complex mathematical concepts into easy intuitive steps.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    achievements: ['Trained over 500+ Grade 10 A+ Mathematics Achievers', 'National Vedic Math Trainer']
  },
  {
    id: 'hod-computer',
    name: 'Er. Amit Sharma',
    role: 'Head of Computer & ICT Department',
    department: 'Computer & AI',
    qualification: 'B.E. Computer Science & IT',
    experience: '9+ Years Experience',
    email: 'amit.ict@lfsbirgunj.edu.np',
    bio: 'Leads modern computer laboratories, training students in typing, office suites, web design, and computational thinking.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    achievements: ['Certified Microsoft ICT Educator', 'Coach of Inter-School Coding Olympiad Team']
  },
  {
    id: 'head-sports',
    name: 'Coach Bijay Chaudhary',
    role: 'Director of Physical Education & Sports',
    department: 'Arts & Physical Ed',
    qualification: 'B.P.Ed & National Cricket Coach License',
    experience: '12+ Years Experience',
    email: 'sports@lfsbirgunj.edu.np',
    bio: 'Inspiring discipline, athletic sportsmanship, football and cricket skills across all houses and school teams.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    achievements: ['Led School Cricket Team to Parsa District Cup Victory 2024']
  }
];

export const facilitiesList: Facility[] = [
  {
    id: 'science-labs',
    name: 'Equipped Science & Chemistry Laboratories',
    category: 'Laboratories',
    description: 'Fully equipped separate laboratory spaces for Physics, Chemistry, and Biology with high-grade optical microscopes, glassware, and reagent stations for practical demonstrations.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Separate Physics & Bio practical stations', 'Safety eyewash and fire safety equipped', 'Individual experimental kits'],
    capacity: '50 Students'
  },
  {
    id: 'computer-lab',
    name: 'Modern High-Speed Computer Lab',
    category: 'Laboratories',
    description: 'Air-conditioned digital computer facility with 40+ networked high-speed PCs, fiber broadband internet, UPS power backup, and modern ICT learning suites.',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
    highlights: ['40+ High-performance workstations', 'High-speed fiber connectivity', 'Interactive projector screen'],
    capacity: '45 Students'
  },
  {
    id: 'school-library',
    name: 'Saraswati Knowledge Library & Reading Room',
    category: 'Academics',
    description: 'Calm reading environment housing more than 12,000 reference textbooks, encyclopedias, children literature, newspapers, and national educational journals.',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
    highlights: ['12,000+ Books in Nepali, English & Hindi', 'Daily national dailies & periodicals', 'Comfortable reading desks'],
    capacity: '80 Students'
  },
  {
    id: 'sports-ground',
    name: 'Spacious Sports Arena & Playground',
    category: 'Sports & Fitness',
    description: 'Expansive open ground for cricket, football, volleyball, badminton courts, and 100m sprint tracks with permanent spectator stands.',
    imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Cricket pitch & football goalposts', 'Volleyball & badminton court', 'Annual sports festival grounds'],
    capacity: '600 Spectators'
  },
  {
    id: 'assembly-hall',
    name: 'Open Auditorium & Cultural Stage',
    category: 'Arts & Culture',
    description: 'Covered central assembly auditorium for daily prayer assemblies, Saraswati Puja celebrations, speech contests, and cultural dance dramas.',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Large acoustic stage & sound system', 'Covered weather protection', 'Daily moral assembly podium'],
    capacity: '800 Students'
  },
  {
    id: 'kindergarten-playzone',
    name: 'Kids Play Zone & Activity Room',
    category: 'Campus Life',
    description: 'Vibrant play area with slides, swings, soft foam play mats, educational toys, and colorful learning charts for Kindergarten children.',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Child-safe non-toxic play gear', 'Slides, swings & see-saws', 'Dedicated female attendants'],
    capacity: '60 Children'
  }
];

export const schoolNotices: SchoolNotice[] = [
  {
    id: 'not-01',
    title: 'Admissions Open for Academic Session 2026/27 (Nursery to Grade 9)',
    category: 'Academic',
    date: '28 Aug 2026',
    isUrgent: true,
    summary: 'Little Flower Secondary School invites applications for the new academic session. Merit scholarships available for meritorious students and siblings.',
    fileSize: '1.2 MB PDF',
    downloadUrl: '#',
    details: 'Admissions are officially open for Playgroup, Nursery, LKG, UKG, and Grades 1 through 9. Prospectus and registration forms can be filled online or obtained from the school administrative office in Parwanipur, Parsa.'
  },
  {
    id: 'not-02',
    title: 'First Terminal Examination Routine 2026 Announced',
    category: 'Examination',
    date: '24 Aug 2026',
    isUrgent: true,
    summary: 'Examinations for Grades 1 to 10 will begin from Ashwin 1, 2083 (September 17, 2026). Hall tickets can be collected or viewed on the portal.',
    fileSize: '480 KB PDF',
    downloadUrl: '#',
    details: 'All students are instructed to prepare according to the syllabus provided. Guardians are requested to ensure all prior dues are cleared before Ashwin 2083.'
  },
  {
    id: 'not-03',
    title: 'Annual Inter-House Sports Meet & Athletics Championship',
    category: 'Sports',
    date: '18 Aug 2026',
    summary: 'House trials in 100m, 200m race, long jump, cricket tournament, and volleyball will commence from next week. House captains to submit rosters.',
    fileSize: '620 KB PDF',
    downloadUrl: '#',
    details: 'Red, Blue, Green, and Yellow house students should report in their respective sports uniform with coach Bijay Chaudhary.'
  },
  {
    id: 'not-04',
    title: 'Grand Saraswati Puja & Cultural Exhibition Celebration',
    category: 'Academic',
    date: '12 Aug 2026',
    summary: 'Annual Saraswati Vandana, Vidyarambha ceremony for new nursery admissions, and student science/art exhibition in the school courtyard.',
    fileSize: '350 KB PDF',
    downloadUrl: '#',
    details: 'All parents, well-wishers, and alumni of Little Flower Secondary School are cordially invited to seek the blessings of Goddess Saraswati.'
  }
];

export const upcomingEvents: SchoolEvent[] = [
  {
    id: 'ev-01',
    title: 'Annual Science & Art Model Exhibition 2026',
    category: 'Exhibition',
    date: '14 Sep 2026',
    time: '09:30 AM - 03:30 PM',
    location: 'Little Flower School Main Auditorium & Courtyard',
    description: 'Showcasing over 80 working science models, solar energy displays, hydraulic cranes, and Madhesh cultural art prepared by students.',
    audience: 'Open to All Parents, Students & Community'
  },
  {
    id: 'ev-02',
    title: 'Inter-House Cricket & Volleyball Championship Final',
    category: 'Sports',
    date: '28 Sep 2026',
    time: '01:30 PM - 05:00 PM',
    location: 'School Main Playground',
    description: 'Championship finals between Red House and Blue House followed by award presentation by distinguished district sports officers.',
    audience: 'All Students & Guardians'
  },
  {
    id: 'ev-03',
    title: 'Parent-Teacher Orientation & Progress Review Meet',
    category: 'Academic',
    date: '08 Oct 2026',
    time: '08:00 AM - 12:30 PM',
    location: 'Respective Classrooms',
    description: 'Individual interaction with class teachers regarding student academic progress, discipline, homework, and terminal preparation.',
    audience: 'All Parents & Guardians'
  }
];

export const mockStudentRecord: StudentRecord = {
  id: 'LFS-2005-084',
  studentName: 'Aryan Kumar Sah',
  studentId: 'LFS-2005-084',
  grade: 'Grade 10 (SEE Batch 2026/27)',
  section: 'Section Lotus',
  rollNo: 5,
  guardianName: 'Mr. Rajesh Sah & Mrs. Meena Sah',
  guardianPhone: '+977 9845 128940',
  attendanceRate: 97.2,
  monthlyAttendance: [
    { month: 'Baisakh', present: 24, total: 25 },
    { month: 'Jestha', present: 26, total: 26 },
    { month: 'Ashadh', present: 23, total: 24 },
    { month: 'Shrawan', present: 25, total: 26 },
    { month: 'Bhadra', present: 24, total: 24 }
  ],
  gpa: 3.88,
  rank: 1,
  termResults: [
    {
      term: 'First Terminal Examination 2026',
      gpa: 3.88,
      subjects: [
        { name: 'Compulsory Mathematics', fullMarks: 100, obtainedMarks: 96, grade: 'A+', remark: 'Excellent problem solving.' },
        { name: 'Optional Mathematics', fullMarks: 100, obtainedMarks: 94, grade: 'A+', remark: 'Strong trigonometry and calculus.' },
        { name: 'Science & Technology', fullMarks: 100, obtainedMarks: 90, grade: 'A+', remark: 'Very good practical and theory.' },
        { name: 'Computer Science', fullMarks: 100, obtainedMarks: 92, grade: 'A+', remark: 'Clean programming concepts.' },
        { name: 'Compulsory English', fullMarks: 100, obtainedMarks: 86, grade: 'A', remark: 'Good grammar and essay writing.' },
        { name: 'Compulsory Nepali', fullMarks: 100, obtainedMarks: 84, grade: 'A', remark: 'Neat handwriting and expression.' }
      ]
    },
    {
      term: 'Unit Assessment Review 2026',
      gpa: 3.85,
      subjects: [
        { name: 'Compulsory Mathematics', fullMarks: 50, obtainedMarks: 48, grade: 'A+', remark: 'Top in class.' },
        { name: 'Optional Mathematics', fullMarks: 50, obtainedMarks: 46, grade: 'A+', remark: 'Accurate proofs.' },
        { name: 'Science & Technology', fullMarks: 50, obtainedMarks: 44, grade: 'A', remark: 'Solid conceptual clarity.' },
        { name: 'Computer Science', fullMarks: 50, obtainedMarks: 47, grade: 'A+', remark: 'Fast typing and logic.' },
        { name: 'Compulsory English', fullMarks: 50, obtainedMarks: 42, grade: 'A', remark: 'Consistent performance.' }
      ]
    }
  ],
  examRoutines: [
    {
      examName: 'First Terminal Examination 2026',
      startDate: 'Sep 17, 2026',
      endDate: 'Sep 24, 2026',
      schedule: [
        { date: '17 Sep 2026', day: 'Thursday', subject: 'Compulsory English', time: '07:30 AM - 10:30 AM', roomNo: 'Hall A-1' },
        { date: '19 Sep 2026', day: 'Saturday', subject: 'Compulsory Nepali', time: '07:30 AM - 10:30 AM', roomNo: 'Hall A-1' },
        { date: '21 Sep 2026', day: 'Monday', subject: 'Compulsory Mathematics', time: '07:30 AM - 10:30 AM', roomNo: 'Hall A-1' },
        { date: '22 Sep 2026', day: 'Tuesday', subject: 'Science & Technology', time: '07:30 AM - 10:30 AM', roomNo: 'Hall A-1' },
        { date: '24 Sep 2026', day: 'Thursday', subject: 'Optional Mathematics / Computer', time: '07:30 AM - 10:30 AM', roomNo: 'Hall A-1' }
      ]
    }
  ],
  feeLedger: {
    invoices: [
      { id: 'INV-2026-0412', title: 'First Term Tuition & Lab Fee', dueDate: '10 Aug 2026', amount: 8500, status: 'Paid', paymentDate: '05 Aug 2026', receiptNo: 'REC-LFS-4412' },
      { id: 'INV-2026-0489', title: 'Bus Transport & Examination Dues', dueDate: '15 Sep 2026', amount: 4200, status: 'Pending' }
    ],
    totalPaid: 8500,
    totalPending: 4200
  }
};

export const busRoutesList: BusRoute[] = [
  {
    id: 'route-1',
    routeNumber: 'Route 01 — Parwanipur & Gandak Line',
    routeName: 'Gandak Chowk ➔ Bahuari ➔ Parwanipur ➔ School',
    driverName: 'Mr. Ramesh Mahato',
    driverPhone: '+977 981521991',
    vehicleNumber: 'NA 4 KHA 5512',
    morningTime: '06:45 AM - 07:45 AM',
    eveningTime: '03:45 PM - 04:45 PM',
    stops: ['Gandak Hospital Chowk', 'Bahuari', 'Parwanipur Dryport Road', 'Parwanipur Bazaar', 'Little Flower School'],
    status: 'On Route',
    currentStopIndex: 3
  },
  {
    id: 'route-2',
    routeNumber: 'Route 02 — Birgunj Main Line',
    routeName: 'Ghantaghar ➔ Murli ➔ Powerhouse ➔ Parwanipur ➔ School',
    driverName: 'Mr. Dinesh Sah',
    driverPhone: '+977 981521991',
    vehicleNumber: 'NA 5 KHA 3319',
    morningTime: '06:30 AM - 07:45 AM',
    eveningTime: '03:45 PM - 05:00 PM',
    stops: ['Birgunj Ghantaghar', 'Maisthan Chowk', 'Murli Bagicha', 'Powerhouse Chowk', 'Naya Buspark', 'Little Flower School'],
    status: 'On Route',
    currentStopIndex: 2
  },
  {
    id: 'route-3',
    routeNumber: 'Route 03 — Jitpur & Pipra Line',
    routeName: 'Jitpur Bazaar ➔ Pipra ➔ Lipnimal ➔ School',
    driverName: 'Mr. Suresh Paswan',
    driverPhone: '+977 981521991',
    vehicleNumber: 'NA 3 KHA 8841',
    morningTime: '06:40 AM - 07:45 AM',
    eveningTime: '03:45 PM - 04:50 PM',
    stops: ['Jitpur Main Chowk', 'Pipra Village', 'Lipnimal Road', 'Parwanipur Gate', 'Little Flower School'],
    status: 'On Route',
    currentStopIndex: 3
  },
  {
    id: 'route-4',
    routeNumber: 'Route 04 — Chhapkaiya & Pratima Chowk',
    routeName: 'Chhapkaiya ➔ Pratima Chowk ➔ Nagwa ➔ School',
    driverName: 'Mr. Manoj Raut',
    driverPhone: '+977 981521991',
    vehicleNumber: 'NA 4 KHA 1289',
    morningTime: '06:35 AM - 07:45 AM',
    eveningTime: '03:45 PM - 04:55 PM',
    stops: ['Chhapkaiya', 'Pratima Chowk', 'Nagwa Chowk', 'Parwanipur Bypass', 'Little Flower School'],
    status: 'At Terminal',
    currentStopIndex: 4
  }
];

export const testimonialsList: Testimonial[] = [
  {
    id: 't-01',
    name: 'Mr. Arvind Sah & Mrs. Sunita Sah',
    role: 'Guardians of Priya Sah (Grade 10 SEE Topper)',
    relation: 'Parent',
    rating: 5,
    content: 'Little Flower School has given our daughter exceptional academic discipline and values. The teachers provide genuine individual care, and the 100% pass result every year speaks for itself.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    highlight: 'SEE District Merit Ranker'
  },
  {
    id: 't-02',
    name: 'Dr. Vivek Kumar Kushwaha',
    role: 'Alumnus — Batch of 2014 | MBBS (Dharmanath Medical College)',
    relation: 'Alumni',
    rating: 5,
    content: 'My foundational schooling at Little Flower Secondary School instilled the curiosity and hard work that helped me clear the Medical Entrance Examination. Proud to be a Little Flower alumnus!',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    highlight: 'Medical Doctor & Alumnus'
  },
  {
    id: 't-03',
    name: 'Mrs. Rekha Devi Gupta',
    role: 'Mother of Aman & Anjali (Grades 4 & 7)',
    relation: 'Parent',
    rating: 5,
    content: 'The safe environment, dedicated science experiments, sports activities, and affordable quality education make Little Flower School the best school in the Parwanipur-Birgunj region.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    highlight: 'Safe & Nurturing Environment'
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g-01',
    title: 'Morning Prayer Assembly & Discipline Drill',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
    description: 'Daily morning prayer assembly, national anthem, and student moral speech in the school courtyard.'
  },
  {
    id: 'g-02',
    title: 'Annual Inter-House Sports & 100m Sprint',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1000&q=80',
    description: 'Students competing in the annual sports meet on the spacious green playground.'
  },
  {
    id: 'g-03',
    title: 'Science Practical & Chemistry Titration Lab',
    category: 'STEM & Labs',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    description: 'Senior secondary students conducting acid-base titration and biological cell slide inspections.'
  },
  {
    id: 'g-04',
    title: 'Computer Lab Practical & Typing Practice',
    category: 'STEM & Labs',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
    description: 'Students practicing logic, basic programming, and typing speed in our digital computer facility.'
  },
  {
    id: 'g-05',
    title: 'Saraswati Puja Cultural Dance & Drama',
    category: 'Arts & Culture',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80',
    description: 'Traditional and cultural performance staged during annual celebrations by Little Flower students.'
  },
  {
    id: 'g-06',
    title: 'Kindergarten Joyful Learning & Play Area',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80',
    description: 'Our young learners enjoying toys, puzzles, and sensory play in the kindergarten play garden.'
  }
];

export const schoolFAQs = [
  {
    question: 'Where is Little Flower Secondary School located?',
    answer: 'Little Flower Secondary School is conveniently located at Birgunj-21, Parwanipur, Parsa, Nepal. It is easily accessible from both Birgunj city and Jitpur via main transit routes.'
  },
  {
    question: 'When was Little Flower Secondary School established?',
    answer: 'The school was established in the year 2005 (Estd. 2005), serving the Parsa community for over 20 years with dedication to academic brilliance and student character.'
  },
  {
    question: 'What classes and streams are offered?',
    answer: 'We offer comprehensive education from Pre-Primary (Nursery, LKG, UKG) through Primary (Grades 1-5), Lower Secondary (Grades 6-8), and Secondary Level (Grades 9 & 10 SEE Board).'
  },
  {
    question: 'Are transportation facilities available across Birgunj and Parsa?',
    answer: 'Yes! We operate safe school bus routes covering Parwanipur, Gandak, Birgunj Ghantaghar, Murli, Powerhouse, Chhapkaiya, Pipra, and Jitpur.'
  },
  {
    question: 'How can we apply for new admission?',
    answer: 'You can submit the Online Admission form directly on this website or visit the school reception desk at Parwanipur, Parsa between 07:30 AM and 04:00 PM (Sunday to Friday).'
  }
];
