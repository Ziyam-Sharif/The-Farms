import mongoose, { Schema, Document } from 'mongoose';
import { IContactMessage } from '@farms/shared-types';

export interface IContactMessageDocument extends Omit<IContactMessage, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const ContactMessageSchema = new Schema<IContactMessageDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['new', 'read', 'responded'], default: 'new', index: true },
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model<IContactMessageDocument>('ContactMessage', ContactMessageSchema);
