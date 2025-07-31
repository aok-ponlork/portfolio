import { Article } from '../../app/core/models/blogs/blog.model';

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Redis Command',
    shortDescription:
      'A practical guide to Redis commands for fast data operations.',
    description:
      'This article covers essential Redis commands, their use cases, and best practices to efficiently manage in-memory data storage for caching, messaging, and real-time applications.',
    type: ['Database', 'Backend'],
    images: [
      {
        url: '/assets/articles/images/redis.webp',
        alt: 'Redis',
      },
    ],
    createdAt: '2025-07-08T12:34:56Z',
    duration: '3 min',
  },
  {
    id: '2',
    title: 'How to Create Custom Middleware in .NET and Laravel',
    shortDescription: 'How to Create Custom Middleware in .NET and Laravel',
    description:
      'Learn how to build custom middleware in both .NET and Laravel with step-by-step examples. Master request filtering and reusable logic in your backend apps.',
    type: ['Backend'],
    images: [
      {
        url: '/assets/articles/images/middleware.webp',
        alt: 'Middleware',
      },
    ],
    createdAt: '2025-07-08T12:34:56Z',
    duration: '3 min',
  },
];
