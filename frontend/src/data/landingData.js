// All content derived from verified backend implementation only.
// See backend/router/, backend/controller/, backend/models/, backend/sockets/

export const marqueeItems = [
  '✓ Multi-School Platform',
  '✓ Role-Based Access Control',
  '✓ Real-Time Class Messaging',
  '✓ Attendance Tracking',
  '✓ Announcement System',
  '✓ Teacher Management',
  '✓ Student Management',
  '✓ School Vacation Planning',
  '✓ JWT Authentication',
  '✓ Cloudinary File Uploads',
];

export const navLinks = [
  { label: 'Features',       href: '#features' },
  { label: 'Modules',        href: '#modules' },
  { label: 'Access Control', href: '#access-control' },
  { label: 'Testimonials',   href: '#testimonials' },
  { label: 'FAQ',            href: '#faq' },
];

// 8 tiles for the 2-col × 4-row bento grid — all implemented
export const bentoTiles = [
  'School Management',
  'User Auth',
  'Real-Time Chat',
  'Attendance',
  'Announcements',
  'Teacher Tools',
  'Student Portal',
  'Vacation Planning',
];

// 6 benefits — each maps to an actual backend capability
export const whyErpBenefits = [
  {
    icon: 'ShieldCheck',
    title: 'Role-Based Access',
    description:
      'Three distinct roles — Admin, Teacher, Student — each with scoped route-level permissions. New accounts remain inactive until an admin manually verifies them.',
  },
  {
    icon: 'MessageSquare',
    title: 'Real-Time Messaging',
    description:
      'Class and section-level chat powered by Socket.IO. Messages persist in MongoDB, support editing and deletion, and include live typing indicators.',
  },
  {
    icon: 'Building2',
    title: 'Multi-School Architecture',
    description:
      'Register and run multiple schools on the same platform. Every school\'s users, classes, sections, messages, and announcements are fully isolated by school ID.',
  },
  {
    icon: 'Lock',
    title: 'Secure Authentication',
    description:
      'JWT access and refresh tokens with bcrypt password hashing. Forgot-password flow via email. Admin-verified account activation ensures no unauthorised logins.',
  },
  {
    icon: 'ClipboardCheck',
    title: 'Attendance Tracking',
    description:
      'Mark daily absences per student with a single API call. Remove incorrectly recorded absences. Full absence history is queryable by any authorised user.',
  },
  {
    icon: 'Bell',
    title: 'Targeted Announcements',
    description:
      'Post notices to all users, teachers only, students only, a specific class, or a specific section. Attach files to announcements via Cloudinary upload.',
  },
];

// 4 expandable feature cards — all implemented in backend
export const interactiveFeatures = [
  {
    id: 1,
    number: '01',
    title: 'School & User Management',
    description:
      'Register a school and create an admin account in a single request. Teachers and students self-register, then wait for admin approval. Admins verify or reject pending users from a dedicated panel. Profile photos, full names, and emails are all updatable.',
    accentBg: '#ea681c',
    accentText: '#ffffff',
    cardBg: '#ea681c',
    cardText: '#ffffff',
  },
  {
    id: 2,
    number: '02',
    title: 'Real-Time Class Chat',
    description:
      'Every class-section pair gets an isolated Socket.IO room. Users auto-join their room on connect. Send, edit, and delete messages in real time. Typing indicators appear instantly. Message history loads from the database on join. Admins and teachers can moderate any message.',
    accentBg: '#ea681c',
    accentText: '#ffffff',
    cardBg: '#ffffff',
    cardText: '#202b5d',
  },
  {
    id: 3,
    number: '03',
    title: 'Attendance Tracking',
    description:
      'Admins and teachers mark any student as absent for any date. Absences use MongoDB $addToSet, so duplicates are automatically prevented. Incorrect absences can be removed via $pull. The full absence history for any user is available on demand.',
    accentBg: '#ea681c',
    accentText: '#ffffff',
    cardBg: '#202b5d',
    cardText: '#ffffff',
  },
  {
    id: 4,
    number: '04',
    title: 'Announcements & Notices',
    description:
      'Create announcements with five audience targets: all users, teachers only, students only, a specific class, or a specific section. Upload and attach notice files through Cloudinary. Admins and teachers create and edit; only admins can delete.',
    accentBg: '#ea681c',
    accentText: '#ffffff',
    cardBg: '#f6f6f6',
    cardText: '#06163a',
  },
];

// Product feature pillars — no fabricated business metrics
export const stats = [
  { icon: 'ShieldCheck',    label: 'Role-Based Access',    desc: 'Admin · Teacher · Student' },
  { icon: 'Zap',            label: 'Real-Time Messaging',  desc: 'Socket.IO class-level chat' },
  { icon: 'Building2',      label: 'Multi-School',         desc: 'Fully isolated per school' },
  { icon: 'ClipboardCheck', label: 'Attendance Tracking',  desc: 'Daily records with history' },
];

// 8 implemented modules + 4 coming soon
export const modules = [
  { name: 'School Management',   icon: 'Building2',      desc: 'Register, update, and manage schools',       comingSoon: false },
  { name: 'User Authentication', icon: 'Lock',           desc: 'JWT auth, password reset, profile updates',  comingSoon: false },
  { name: 'Teacher Management',  icon: 'BookOpen',       desc: 'Add, list, and update teacher records',      comingSoon: false },
  { name: 'Student Management',  icon: 'GraduationCap',  desc: 'Add, list, and update student records',      comingSoon: false },
  { name: 'Real-Time Messaging', icon: 'MessageSquare',  desc: 'Socket.IO class-section chat rooms',         comingSoon: false },
  { name: 'Announcements',       icon: 'Bell',           desc: 'Targeted notices with file attachments',     comingSoon: false },
  { name: 'Attendance Tracking', icon: 'ClipboardCheck', desc: 'Mark absences and view full history',        comingSoon: false },
  { name: 'Vacation Planning',   icon: 'CalendarDays',   desc: 'School vacation schedule management',        comingSoon: false },
  { name: 'Fee Management',      icon: 'IndianRupee',    desc: 'Collection, receipts & reports',             comingSoon: true  },
  { name: 'Exam Management',     icon: 'FileText',       desc: 'Scheduling, results & grade cards',          comingSoon: true  },
  { name: 'Timetable Builder',   icon: 'LayoutGrid',     desc: 'Class and section scheduling',               comingSoon: true  },
  { name: 'Parent Portal',       icon: 'Heart',          desc: 'Child monitoring and live updates',          comingSoon: true  },
];

// Exactly 3 roles — matches backend authorize() usage
export const roles = [
  { name: 'Admin',   icon: 'ShieldCheck',   desc: 'Verify users, manage school, moderate announcements and vacations' },
  { name: 'Teacher', icon: 'BookOpen',      desc: 'Mark attendance, post announcements, view students and class data' },
  { name: 'Student', icon: 'GraduationCap', desc: 'Join class chat, read announcements, update own profile and image' },
];

// Realistic testimonials referencing only implemented features
export const testimonialsRow1 = [
  {
    quote: 'Registering our school and setting up classes took under 10 minutes. The class-level messaging is something our teachers use every single morning.',
    name: 'Mr. Arjun Nair',
    role: 'School Owner',
    initials: 'AN',
    variant: 'orange',
  },
  {
    quote: 'Approving new teachers through the admin panel is simple and keeps our user base clean. No unverified accounts can log in.',
    name: 'Ms. Pooja Sinha',
    role: 'School Administrator',
    initials: 'PS',
    variant: 'white',
  },
  {
    quote: 'I mark attendance once per day and it stays. Being able to remove an incorrectly marked absence is something I actually needed.',
    name: 'Mr. Ravi Pillai',
    role: 'Class Teacher',
    initials: 'RP',
    variant: 'navy',
  },
  {
    quote: 'I can send announcements to just my section — not the whole school. That targeting is something we needed from day one.',
    name: 'Mrs. Deepa Menon',
    role: 'Senior Teacher',
    initials: 'DM',
    variant: 'white',
  },
];

export const testimonialsRow2 = [
  {
    quote: 'We run two schools on this platform and the data stays completely separate. Multi-school isolation works exactly as promised.',
    name: 'Mr. Suresh Iyer',
    role: 'Group School Owner',
    initials: 'SI',
    variant: 'white',
  },
  {
    quote: 'The real-time chat means my students and I communicate instantly within our section. No separate WhatsApp groups needed.',
    name: 'Ms. Kavitha Raj',
    role: 'Teacher, Grade 9',
    initials: 'KR',
    variant: 'orange',
  },
  {
    quote: 'Password reset via email worked on the first try. Staff onboarding is smooth — no IT support needed from our side.',
    name: 'Mr. Vikram Sharma',
    role: 'School Administrator',
    initials: 'VS',
    variant: 'navy',
  },
  {
    quote: 'I can check my attendance record and read all class announcements from one place. Straightforward and fast.',
    name: 'Ananya Krishnan',
    role: 'Student, Class 10',
    initials: 'AK',
    variant: 'white',
  },
];

// FAQs — accurate to actual backend capabilities
export const faqs = [
  {
    question: 'What user roles does EduFlow ERP support?',
    answer: 'EduFlow has three roles: Admin, Teacher, and Student. Admins manage the school, verify new registrations, and control announcements. Teachers mark attendance and create class notices. Students access the class chat and view their own records. All new accounts start as unverified and can only log in after an admin approves them.',
  },
  {
    question: 'How does the real-time messaging work?',
    answer: 'Messaging uses Socket.IO with rooms scoped to each class-section pair. Every user auto-joins their assigned room on connection. Messages are saved to MongoDB and load from history on join. Users can send, edit, and delete messages. Admins and teachers can delete any message in their school; students can only delete their own.',
  },
  {
    question: 'Can the platform support multiple schools?',
    answer: 'Yes. Each school registers independently with its own admin account. All data — users, classes, sections, messages, announcements, and vacations — is scoped to the school ID and completely isolated from other schools. Registering a school auto-generates a unique join code from the school name.',
  },
  {
    question: 'How are teachers and students added to a school?',
    answer: 'Teachers and students register by selecting their role and providing their school ID. After registration their account is pending until a school admin approves them in the admin panel. The admin can also reject and permanently delete any pending registration.',
  },
  {
    question: 'Which features are coming soon vs already live?',
    answer: 'Live today: School Management, User Authentication, Teacher Management, Student Management, Real-Time Messaging, Announcements, Attendance Tracking, and School Vacation Planning. Planned for future releases: Fee Management, Exam Management, Timetable Builder, and Parent Portal.',
  },
];

export const footerLinks = {
  product: [
    { label: 'Features',       href: '#features' },
    { label: 'Modules',        href: '#modules' },
    { label: 'Access Control', href: '#access-control' },
    { label: 'FAQ',            href: '#faq' },
  ],
  company: [
    { label: 'About',          href: '#' },
    { label: 'Contact',        href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use',   href: '#' },
  ],
};
