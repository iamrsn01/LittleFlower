const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://imsvncczxpzqybwjjapx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltc3ZuY2N6eHB6cXlid2pqYXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTc3NTksImV4cCI6MjEwNDA5Mzc1OX0.KfXTDTjP_UPCoaV0O1bfnC7zJAOoy4-vAr0CqIBZXSk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const heroSlides = [
  {
    id: '1',
    image: './slider/cover.jpg',
    caption: 'Little Flower Secondary School — Welcome & Campus Overview',
    location: 'Birgunj-21, Parwanipur, Parsa (Estd. 2005)',
    is_active: true
  },
  {
    id: '2',
    image: './slider/1.jpg',
    caption: 'Little Flower Secondary School — Campus Life & Student Activities',
    location: 'Parwanipur, Parsa',
    is_active: true
  },
  {
    id: '3',
    image: './slider/2.JPG',
    caption: 'Little Flower Secondary School — Annual Event & Campus Showcase',
    location: 'Auditorium & Parade Grounds',
    is_active: true
  },
  {
    id: '4',
    image: './slider/3.JPG',
    caption: 'Little Flower Secondary School — Student Leadership & Assembly',
    location: 'Parwanipur, Parsa',
    is_active: true
  },
  {
    id: '5',
    image: './slider/4.JPG',
    caption: 'Little Flower Secondary School — Sports & Co-Curricular Excellence',
    location: 'Green Playground & Sports Grounds',
    is_active: true
  },
  {
    id: '6',
    image: './slider/5.JPG',
    caption: 'Little Flower Secondary School — Cultural Festivities & Performances',
    location: 'School Auditorium Stage',
    is_active: true
  },
  {
    id: '7',
    image: './slider/6.JPG',
    caption: 'Little Flower Secondary School — Mentorship & Graduation Honor',
    location: 'Parwanipur, Parsa',
    is_active: true
  },
  {
    id: '8',
    image: './slider/7.JPG',
    caption: 'Little Flower Secondary School — School Community & Celebrations',
    location: 'Parwanipur, Parsa',
    is_active: true
  }
];

const galleryItems = [
  {
    id: 'g-01',
    title: 'Main Academic Campus & Green Playground',
    category: 'Campus',
    image_url: './slider/cover.jpg',
    description: 'The scenic Little Flower Secondary School campus featuring the multi-storey academic wings and expansive green lawn.',
    featured: true,
    aspect: 'wide',
    tag: 'Campus View',
    year: '2025'
  },
  {
    id: 'g-02',
    title: 'Annual Inter-House Sports & 100m Sprint',
    category: 'Sports',
    image_url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1000&q=80',
    description: 'Students competing with great enthusiasm in the annual sports meet on our expansive green athletic ground.',
    featured: false,
    aspect: 'portrait',
    tag: 'Athletics',
    year: '2025'
  },
  {
    id: 'g-03',
    title: 'Science Practical & Chemistry Titration Lab',
    category: 'STEM & Labs',
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
    description: 'Senior secondary students conducting acid-base titration and biological cell slide inspections with modern laboratory apparatus.',
    featured: false,
    aspect: 'square',
    tag: 'Science Lab',
    year: '2025'
  },
  {
    id: 'g-04',
    title: 'Computer Lab Practical & Typing Practice',
    category: 'STEM & Labs',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
    description: 'Students practicing logic, basic programming, and typing speed in our high-speed digital computer facility.',
    featured: false,
    aspect: 'landscape',
    tag: 'IT Lab',
    year: '2025'
  },
  {
    id: 'g-05',
    title: 'Saraswati Puja Cultural Dance & Musical Drama',
    category: 'Arts & Culture',
    image_url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80',
    description: 'Traditional and cultural dance performance staged during annual celebrations and Saraswati Puja by Little Flower students.',
    featured: true,
    aspect: 'portrait',
    tag: 'Celebration',
    year: '2025'
  },
  {
    id: 'g-06',
    title: 'Kindergarten Joyful Learning & Play Area',
    category: 'Campus',
    image_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80',
    description: 'Our young pre-primary learners enjoying educational toys, puzzles, and sensory play in the kindergarten activity room.',
    featured: false,
    aspect: 'square',
    tag: 'Pre-Primary',
    year: '2025'
  },
  {
    id: 'g-07',
    title: 'Robotics & STEM Exhibition Project Display',
    category: 'STEM & Labs',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
    description: 'Young innovators showcasing hands-on robotics models and science fair projects during the Annual Science Exhibition.',
    featured: false,
    aspect: 'landscape',
    tag: 'Innovation',
    year: '2025'
  },
  {
    id: 'g-08',
    title: 'Inter-School Football Championship Match',
    category: 'Sports',
    image_url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1000&q=80',
    description: 'School football team demonstrating teamwork, discipline, and spirited play in regional school tournament matches.',
    featured: false,
    aspect: 'square',
    tag: 'Football',
    year: '2025'
  },
  {
    id: 'g-09',
    title: 'Annual Graduation & Academic Excellence Awards',
    category: 'Events',
    image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80',
    description: 'Felicitating board exam toppers and outstanding performers at the annual convocation and prize distribution ceremony.',
    featured: false,
    aspect: 'wide',
    tag: 'Awards',
    year: '2025'
  }
];

const schoolNotices = [
  {
    id: 'not-01',
    title: 'Admissions Open for Academic Session 2026/27 (Nursery to Grade 9)',
    category: 'Academic',
    date: '28 Aug 2026',
    is_urgent: true,
    summary: 'Little Flower Secondary School invites applications for the new academic session. Merit scholarships available for meritorious students and siblings.',
    file_size: '1.2 MB PDF',
    download_url: '#',
    details: 'Admissions are officially open for Playgroup, Nursery, LKG, UKG, and Grades 1 through 9. Prospectus and registration forms can be filled online or obtained from the school administrative office in Parwanipur, Parsa.'
  },
  {
    id: 'not-02',
    title: 'First Terminal Examination Routine 2026 Announced',
    category: 'Examination',
    date: '24 Aug 2026',
    is_urgent: true,
    summary: 'Examinations for Grades 1 to 10 will begin from Ashwin 1, 2083 (September 17, 2026). Hall tickets can be collected or viewed on the portal.',
    file_size: '480 KB PDF',
    download_url: '#',
    details: 'All students are instructed to prepare according to the syllabus provided. Guardians are requested to ensure all prior dues are cleared before Ashwin 2083.'
  },
  {
    id: 'not-03',
    title: 'Annual Inter-House Sports Meet & Athletics Championship',
    category: 'Sports',
    date: '18 Aug 2026',
    is_urgent: false,
    summary: 'House trials in 100m, 200m race, long jump, cricket tournament, and volleyball will commence from next week. House captains to submit rosters.',
    file_size: '620 KB PDF',
    download_url: '#',
    details: 'Red, Blue, Green, and Yellow house students should report in their respective sports uniform with coach Bijay Chaudhary.'
  },
  {
    id: 'not-04',
    title: 'Grand Saraswati Puja & Cultural Exhibition Celebration',
    category: 'Academic',
    date: '12 Aug 2026',
    is_urgent: false,
    summary: 'Annual Saraswati Vandana, Vidyarambha ceremony for new nursery admissions, and student science/art exhibition in the school courtyard.',
    file_size: '350 KB PDF',
    download_url: '#',
    details: 'All parents, well-wishers, and alumni of Little Flower Secondary School are cordially invited to seek the blessings of Goddess Saraswati.'
  }
];

const facultyMembers = [
  {
    id: 'principal-desk',
    name: 'Mr. R. K. Kushwaha',
    role: 'Principal & Academic Director',
    department: 'Science & STEM',
    qualification: 'M.Sc. Physics (Tribhuvan University), B.Ed.',
    experience: '21+ Years in Educational Leadership',
    email: 'principal@lfsbirgunj.edu.np',
    bio: 'Guiding Little Flower Secondary School since its inception with a vision of blending moral integrity with high academic standards in the Parsa region.',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
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
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
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
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
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
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
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
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
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
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    achievements: ['Led School Cricket Team to Parsa District Cup Victory 2024']
  }
];

async function seed() {
  console.log('Seeding Supabase data...');

  const r1 = await supabase.from('hero_slides').upsert(heroSlides);
  if (r1.error) console.error('Error hero_slides:', r1.error);
  else console.log('✓ Seeded ' + heroSlides.length + ' hero_slides');

  const r2 = await supabase.from('gallery_items').upsert(galleryItems);
  if (r2.error) console.error('Error gallery_items:', r2.error);
  else console.log('✓ Seeded ' + galleryItems.length + ' gallery_items');

  const r3 = await supabase.from('school_notices').upsert(schoolNotices);
  if (r3.error) console.error('Error school_notices:', r3.error);
  else console.log('✓ Seeded ' + schoolNotices.length + ' school_notices');

  const r4 = await supabase.from('faculty_members').upsert(facultyMembers);
  if (r4.error) console.error('Error faculty_members:', r4.error);
  else console.log('✓ Seeded ' + facultyMembers.length + ' faculty_members');

  console.log('Database seeding complete!');
}

seed();
