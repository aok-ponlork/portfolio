export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  techStack: string[];
  images: ProjectImage[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ProjectImage {
  url: string;
  alt: string;
  isGif?: boolean;
}
