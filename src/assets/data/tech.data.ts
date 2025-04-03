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
    name: 'Node.js',
    icon: 'node',
    iconType: 'fab',
    colorClass: 'text-green-600',
  },
  {
    name: 'Docker',
    icon: 'docker',
    iconType: 'fab',
    colorClass: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'GraphQL',
    icon: 'plug',
    iconType: 'fas',
    colorClass: 'text-pink-500',
  },
];
export const additionalSkills: Skill[] = [
  {
    title: 'Laravel',
    description:
      'Building scalable and maintainable backend applications with Laravel, leveraging its powerful ecosystem.',
    icon: 'laravel',
    iconType: 'fab',
    category: 'Backend',
    projects: [
      { name: 'CRM System', url: '/projects/crm' },
      { name: 'E-commerce API', url: '/projects/ecommerce' },
    ],
    iconColor: 'text-red-600',
  },
  {
    title: '.NET',
    description:
      'Experienced in building scalable back-end services and APIs with .NET Core, focusing on performance and maintainability.',
    icon: 'code',
    iconType: 'fas',
    category: 'Backend',
    projects: [
      { name: 'FCM with .NET', url: '/projects/fcm-integration' },
      { name: 'Coupon System', url: '/projects/coupon-selling' },
      {
        name: 'Appointment System',
        url: '/projects/appointment-scheduling',
      },
    ],

    iconColor: 'text-[#512BD4]',
  },
  {
    title: 'Flutter',
    description:
      'Building smooth, responsive cross-platform mobile apps with Flutter, ensuring a native-like experience on both iOS and Android.',
    icon: 'flutter',
    iconType: 'fab',
    category: 'Frontend',
    projects: [
      {
        name: 'FCM with Flutter',
        url: '/projects/fcm-integration',
      },
      {
        name: 'Flutter with Firebase',
        url: '/projects/fcm-firebase',
      },
      { name: 'Coupon Selling System', url: '/projects/coupon-selling' },
      {
        name: 'Appointment System',
        url: '/projects/appointment-scheduling',
      },
    ],
    iconColor: 'text-[#02569B]',
  },
  {
    title: 'Angular CLI',
    description:
      'Developing high-performance SPAs with Angular, using modular architecture and best practices for scalability.',
    icon: 'angular',
    iconType: 'fab',
    category: 'Frontend',
    projects: [
      {
        name: 'Notification',
        url: '/projects/push-notification-dashboard',
      },
      { name: 'CRM System', url: '/projects/crm' },
      { name: 'My Portfolio', url: '/app/about-me' },
      { name: 'Coupon Management System', url: '/projects/coupon-management' },
    ],
    iconColor: 'text-[#DD0031]',
  },
  {
    title: 'Node.js',
    description:
      'Developing high-performance, event-driven backend applications with Node.js.',
    icon: 'node',
    iconType: 'fab',
    category: 'Backend',
    projects: [
      { name: 'Real-time Dashboard', url: '/projects/dashboard' },
      { name: 'Chat Application', url: '/projects/chat' },
    ],
    iconColor: 'text-green-600',
  },
  {
    title: 'FCM',
    description:
      'Implementing real-time messaging and push notifications with Firebase Cloud Messaging.',
    icon: 'paper-plane',
    iconType: 'fas',
    category: 'API',
    projects: [
      { name: 'Mobile Notifications', url: '/projects/notifications' },
    ],
    iconColor: 'text-blue-500',
  },
  {
    title: 'GraphQL',
    description:
      'Fetching and managing data efficiently with GraphQL, enabling flexible API queries.',
    icon: 'plug',
    iconType: 'fas',
    category: 'API',
    projects: [{ name: 'Content Management API', url: '/projects/cms' }],
    iconColor: 'text-pink-500',
  },
  {
    title: 'JWT Auth',
    description:
      'Implementing secure and stateless authentication using JSON Web Tokens (JWT).',
    icon: 'key',
    iconType: 'fas',
    category: 'Security',
    projects: [
      { name: 'Authentication System', url: '/projects/auth' },
    ],
    iconColor: 'text-blue-400',
  },
  {
    title: 'Docker',
    description:
      'Containerizing applications with Docker to ensure consistency and easy deployment across environments.',
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
      'Experienced in building scalable back-end services and APIs with .NET Core, focusing on performance and maintainability.',
    color: '#512BD4', // .NET color
  },
  {
    icon: 'angular',
    title: 'Angular',
    iconType: 'fab',
    description:
      'Developing high-performance SPAs with Angular, using modular architecture and best practices for scalability.',
    color: '#DD0031', // Angular color
  },
  {
    icon: 'flutter',
    iconType: 'fab',
    title: 'Flutter',
    description:
      'Building smooth, responsive cross-platform mobile apps with Flutter, ensuring a native-like experience on both iOS and Android.',
    color: '#02569B', // Flutter color
  },
  {
    icon: 'css3',
    iconType: 'fab',
    title: 'Tailwind CSS',
    description:
      'Crafting modern, responsive UIs with Tailwind CSS, leveraging its utility-first approach for clean and efficient styling.',
    color: '#06B6D4', // Tailwind color
  },
  {
    icon: 'ant-design',
    iconType: 'ant-icon',
    title: 'Ant Design',
    description:
      'Creating polished, Experienced with UIs Ant Design, focusing on consistency, accessibility, and user experience.',
    color: '#1890FF', // Ant Design color
  },
  {
    icon: 'database',
    iconType: 'ant-icon',
    title: 'Databases',
    description:
      'Proficient in PostgreSQL, MongoDB, and SQL, optimizing data structures for efficiency and scalability. Also experienced in Firebase for real-time applications.',
    color: '#336791', // PostgreSQL color
  },
];
