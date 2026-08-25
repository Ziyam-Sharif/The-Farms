import mongoose, { Schema, Document } from 'mongoose';
import { INewsletterSubscriber } from '@farms/shared-types';

export interface INewsletterSubscriberDocument extends Omit<INewsletterSubscriber, '_id' | 'subscribedAt'>, Document {
  subscribedAt: Date;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriberDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    subscribedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: false }
);

export const NewsletterSubscriber = mongoose.model<INewsletterSubscriberDocument>(
  'NewsletterSubscriber',
  NewsletterSubscriberSchema
);
