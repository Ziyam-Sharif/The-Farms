import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '@farms/shared-types';

export interface ICategoryDocument extends Omit<ICategory, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategoryDocument>('Category', CategorySchema);
