import mongoose, { Schema, Document } from 'mongoose';

export interface IReviewDocument extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  body: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    isApproved: { type: Boolean, default: false, index: true }, // Admin moderation flag
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReviewDocument>('Review', ReviewSchema);
