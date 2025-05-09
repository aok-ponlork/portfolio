import { Project } from '../../app/core/models/projects/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Admin Push Notification Feature',
    shortDescription:
      'Angular dashboard feature for pushing notifications to Flutter app',
    description:
      'An internal feature within the Angular-based admin dashboard that allows admins to compose and push notifications to a Flutter app. It uses a .NET backend to communicate with Firebase Cloud Messaging (FCM), ensuring real-time delivery of notifications.',
    techStack: ['Angular', 'Firebase'],
    images: [
      {
        url: '/assets/images/projects/project1/1.webp',
        alt: 'Dashboard view showing push notification interface',
      },
      {
        url: '/assets/images/projects/project1/2.webp',
        alt: 'Firebase Dashboard',
      },
    ],
    githubUrl: '',
    featured: true,
    isInternal: true,
  },
  {
    id: 'project-6',
    title: 'Appointment Booking App',
    shortDescription:
      'A Flutter mobile app for scheduling appointments and receiving notifications.',
    description:
      'A mobile application built with Flutter that allows users to book appointments easily and receive real-time push notifications. Integrated with Firebase Cloud Messaging (FCM) and .NET backend through an admin dashboard for managing notifications.',
    techStack: ['Flutter', 'Angular'],
    images: [
      {
        url: '/assets/images/projects/mobile-app/1.webp',
        alt: 'Appointment booking screen',
      },
      {
        url: '/assets/images/projects/mobile-app/2.webp',
        alt: 'Appointment booking screen',
      },
      {
        url: '/assets/images/projects/mobile-app/demo.mp4',
        alt: 'Appointment booking screen',
        isVod: true,
      },
    ],
    githubUrl: '',
    featured: true,
    isInternal: true,
  },
  {
    id: 'project-3',
    title: 'Firebase Auth with .NET',
    shortDescription:
      'Full integration of Firebase Authentication with a .NET backend and PostgreSQL',
    description:
      'A complete authentication system integrating Firebase Authentication (email/password, Google) with a .NET backend. It validates Firebase ID tokens using the Admin SDK, supports JWT verification, and PostgreSQL for data storage. Features include secure sign-in, role-based API access, and a Swagger-documented API for easy testing and integration.',
    techStack: ['.NET', 'Firebase'],
    images: [
      {
        url: '/assets/images/projects/project3/2.webp',
        alt: 'Firebase Authentication',
      },
      {
        url: '/assets/images/projects/project3/1.webp',
        alt: 'Firebase Authentication',
      },
    ],
    githubUrl: 'https://github.com/aok-ponlork/firebase-core',
    featured: true,
    isInternal: false,
  },

  {
    id: 'project-portfolio',
    title: 'Personal Developer Portfolio',
    shortDescription:
      'Responsive and interactive portfolio showcasing personal projects and experience.',
    description:
      'A personal portfolio website showcasing my skills, tech stack, and projects. Built with a clean layout and smooth animations.',
    techStack: ['Angular'],
    images: [
      {
        url: '/assets/images/projects/portfolio/2.webp',
        alt: 'Portfolio homepage screenshot',
      },
      {
        url: '/assets/images/projects/portfolio/1.webp',
        alt: 'Project section displaying multiple project cards',
      },
    ],
    githubUrl: 'https://github.com/aok-ponlork/portfolio',
    featured: false,
    isInternal: false,
    liveUrl: window.location.origin,
  },

  {
    id: 'project-2',
    title: 'Mobile App Backend API',
    shortDescription:
      'Laravel backend API for mobile app with user authentication, CRUD, and PayPal integration',
    description:
      'A robust backend API built with Laravel for powering a mobile application. It provides essential features including user authentication, CRUD operations, secure data handling, and PayPal integration for transactions.',
    techStack: ['Laravel'],
    images: [],
    githubUrl: 'https://github.com/aok-ponlork/Laravel_e-commerce_API',
    featured: false,
    isInternal: false,
    shcoolProject: true,
  },
];
