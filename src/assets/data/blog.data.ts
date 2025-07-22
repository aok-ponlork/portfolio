import { Article } from '../../app/core/models/blogs/blog.model';

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'How I Built My Angular Dashboard',
    shortDescription:
      'A deep dive into the Angular dashboard project I created.',
    description:
      'This article explains the architecture, tech stack, and challenges I faced while building an Angular dashboard that integrates with Firebase and .NET backend. It includes code snippets and lessons learned.',
    type: ['Backend', 'Backend'],
    images: [
      {
        url: '/assets/images/dummy.jpg',
        alt: 'Angular dashboard overview',
      },
    ],
    createdAt: '2025-07-08T12:34:56Z',
    filePath: '/assets/articles/The_difference_between.md',
  },
];
