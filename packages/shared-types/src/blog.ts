export type BlogPostStatusEnum = 'draft' | 'published';

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  coverImage: string;
  author: {
    _id: string;
    name: string;
  };
  tags: string[];
  category: string;
  status: BlogPostStatusEnum;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
