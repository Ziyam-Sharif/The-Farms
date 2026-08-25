import mongoose, { Schema, Document } from 'mongoose';
import { ICart } from '@farms/shared-types';

export interface ICartDocument extends Omit<ICart, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const CartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true, min: 1, default: 1 },
});

const CartSchema = new Schema<ICartDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    sessionId: { type: String, index: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICartDocument>('Cart', CartSchema);
