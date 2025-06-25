export interface Skill {
  title: string;
  description: string;
  icon: string;
  iconType: string;
  iconColor: string;
  category: string;
  projects?: { name: string; url: string }[];
}
export const techStack = [
  {
    name: 'Angular',
    icon: 'angular',
    iconType: 'fab',
    colorClass: 'text-red-500',
  },
  {
    name: 'Laravel',
    icon: 'laravel',
    iconType: 'fab',
    colorClass: 'text-red-600',
  },
  {
    name: 'Flutter',
    icon: 'flutter',
    iconType: 'fab',
    colorClass: 'text-[#02569B]',
  },
  {
    name: 'Docker',
    icon: 'docker',
    iconType: 'fab',
    colorClass: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: '.NET',
    icon: 'code',
    iconType: 'fas',
    colorClass: 'text-[#512BD4]',
  },
];
export const additionalSkills: Skill[] = [
  {
    title: 'Laravel',
    description:
      'Building clean, scalable APIs with Laravel’s powerful ecosystem.',
    icon: 'laravel',
    iconType: 'fab',
    category: 'Backend & API',
    projects: [
      { name: 'CRM System', url: '/projects/crm' },
      { name: 'E-commerce API', url: '/projects/ecommerce' },
    ],
    iconColor: 'text-red-600',
  },
  {
    title: '.NET',
    description:
      'Creating fast, maintainable backends and APIs with .NET Core.',
    icon: 'code',
    iconType: 'fas',
    category: 'Backend & API',
    projects: [
      { name: 'FCM with .NET', url: '/projects/fcm-integration' },
      { name: 'Coupon System', url: '/projects/coupon-selling' },
      { name: 'Appointment System', url: '/projects/appointment-scheduling' },
    ],
    iconColor: 'text-[#512BD4]',
  },
  {
    title: 'Flutter',
    description:
      'Building smooth, cross-platform mobile apps with native-like UX.',
    icon: 'flutter',
    iconType: 'fab',
    category: 'Frontend',
    projects: [
      { name: 'FCM with Flutter', url: '/projects/fcm-integration' },
      { name: 'Flutter with Firebase', url: '/projects/fcm-firebase' },
      { name: 'Coupon Selling System', url: '/projects/coupon-selling' },
      { name: 'Appointment System', url: '/projects/appointment-scheduling' },
    ],
    iconColor: 'text-[#02569B]',
  },
  {
    title: 'Angular CLI',
    description: 'Building modular SPAs using Angular and best practices.',
    icon: 'angular',
    iconType: 'fab',
    category: 'Frontend',
    projects: [
      { name: 'Notification', url: '/projects/push-notification-dashboard' },
      { name: 'CRM System', url: '/projects/crm' },
      { name: 'My Portfolio', url: '/app/about-me' },
      { name: 'Coupon Management System', url: '/projects/coupon-management' },
    ],
    iconColor: 'text-[#DD0031]',
  },
  {
    title: 'Firebase',
    description:
      'Using Firebase for real-time features, auth, and push notifications.',
    icon: 'fire-flame-curved',
    iconType: 'fas',
    category: 'Backend & API',
    projects: [
      { name: 'Firebase Auth', url: '/projects/firebase-auth' },
      { name: 'Mobile Notifications', url: '/projects/notifications' },
    ],
    iconColor: 'text-orange-500',
  },
  {
    title: 'JWT Auth',
    description: 'Securing APIs with stateless JWT-based authentication.',
    icon: 'key',
    iconType: 'fas',
    category: 'Security',
    projects: [{ name: 'Authentication System', url: '/projects/auth' }],
    iconColor: 'text-blue-400',
  },
  {
    title: 'Docker',
    description:
      'Containerizing apps with Docker and writing efficient Dockerfiles.',
    icon: 'docker',
    iconType: 'fab',
    category: 'DevOps',
    projects: [
      { name: 'Microservices Architecture', url: '/projects/microservices' },
    ],
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
];

export const skills = [
  {
    icon: 'code',
    iconType: 'fas',
    title: '.NET',
    description:
      'Building fast, scalable APIs with .NET Core, focused on clean architecture.',
    color: '#512BD4',
  },
  {
    icon: 'angular',
    title: 'Angular',
    iconType: 'fab',
    description:
      'Developing dynamic SPAs using modular, scalable Angular architecture.',
    color: '#DD0031',
  },
  {
    icon: 'flutter',
    iconType: 'fab',
    title: 'Flutter',
    description:
      'Creating smooth, native-like apps for iOS and Android with Flutter.',
    color: '#02569B',
  },
  {
    icon: 'css3',
    iconType: 'fab',
    title: 'Tailwind CSS',
    description:
      'Designing responsive UIs fast with Tailwind’s utility-first approach.',
    color: '#06B6D4',
  },
  {
    icon: 'ant-design',
    iconType: 'ant-icon',
    title: 'Ant Design',
    description:
      'Building clean, consistent UIs with Ant Design’s rich components.',
    color: '#1890FF',
  },
  {
    icon: 'database',
    iconType: 'ant-icon',
    title: 'Databases',
    description:
      'Skilled in PostgreSQL, MongoDB, SQL & Firebase for scalable data handling.',
    color: '#336791',
  },
];
