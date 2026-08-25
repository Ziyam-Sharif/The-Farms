import mongoose, { Schema, Document } from 'mongoose';
import { IBlogPost } from '@farms/shared-types';

export interface IBlogPostDocument extends Omit<IBlogPost, '_id' | 'createdAt' | 'updatedAt' | 'author'>, Document {
  author: mongoose.Types.ObjectId;
}

const BlogPostSchema = new Schema<IBlogPostDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    contentHtml: { type: String, required: true }, // DOMPurify sanitized before save
    coverImage: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String, trim: true }],
    category: { type: String, required: true, index: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export const BlogPost = mongoose.model<IBlogPostDocument>('BlogPost', BlogPostSchema);
