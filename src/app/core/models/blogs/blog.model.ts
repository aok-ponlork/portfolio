export interface Article {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  type: string[];
  images: ArticleImage[];
  createdAt: string;
  filePath: string;
}

export interface ArticleImage {
  url: string;
  alt: string;
  isVod?: boolean;
}
