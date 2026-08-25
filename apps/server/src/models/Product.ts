import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '@farms/shared-types';

export interface IProductDocument extends Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const ProductImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
});

const Model3DSchema = new Schema({
  url: { type: String, required: true },
  format: { type: String, enum: ['glb'], default: 'glb' },
});

const ProductSchema = new Schema<IProductDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    sku: { type: String, required: true, unique: true, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    weight: { type: String, required: true },
    images: [ProductImageSchema],
    model3d: Model3DSchema,
    tags: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
    ratingAvg: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// Search Text Index on title and description
ProductSchema.index({ title: 'text', description: 'text', shortDescription: 'text' });

export const Product = mongoose.model<IProductDocument>('Product', ProductSchema);
