import { Project } from '../../app/core/models/projects/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    shortDescription:
      'A full-stack e-commerce platform with payment integration',
    description:
      'A comprehensive e-commerce solution featuring product browsing, cart functionality, user authentication, and Stripe payment integration. Built with a focus on performance and user experience.',
    techStack: ['Angular'],
    images: [
      {
        url: '/assets/images/projects/ecommerce-dashboard.jpg',
        alt: 'E-commerce dashboard showing sales analytics',
      },
      {
        url: '/assets/images/projects/ecommerce-products.jpg',
        alt: 'Product listing page with filtering options',
      },
      {
        url: '/assets/images/projects/ecommerce-checkout.gif',
        alt: 'Checkout process demonstration',
        isGif: true,
      },
    ],
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    shortDescription: 'A drag-and-drop task management application',
    description:
      'A productivity tool allowing users to create, categorize, and manage tasks with drag-and-drop functionality. Features include task prioritization, deadline tracking, and data visualization for productivity analysis.',
    techStack: ['Angular'],
    images: [
      {
        url: '/assets/images/projects/taskapp-board.jpg',
        alt: 'Task board with multiple lists and cards',
      },
      {
        url: '/assets/images/projects/taskapp-mobile.jpg',
        alt: 'Mobile view of the task management app',
      },
    ],
    githubUrl: 'https://github.com/yourusername/task-management',
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    shortDescription: 'Real-time weather information visualization',
    description:
      'A weather dashboard that provides real-time forecasts, historical data, and interactive maps. Uses multiple weather APIs to ensure accuracy and comprehensive coverage.',
    techStack: ['Angular'],
    images: [
      {
        url: '/assets/images/projects/weather-main.jpg',
        alt: 'Main weather dashboard showing current conditions and forecast',
      },
    ],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
  },
];
