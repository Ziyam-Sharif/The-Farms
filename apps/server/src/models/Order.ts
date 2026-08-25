import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from '@farms/shared-types';

export interface IOrderDocument extends Omit<IOrder, '_id' | 'createdAt' | 'updatedAt'>, Document {}

const OrderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 },
  image: { type: String, required: true },
});

const ShippingAddressSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
});

const StatusHistorySchema = new Schema({
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'],
    required: true,
  },
  changedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  note: { type: String },
});

const OrderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    items: [OrderItemSchema],
    shippingAddress: { type: ShippingAddressSchema, required: true },
    subtotal: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Card', 'JazzCash', 'Easypaisa'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'],
      default: 'placed',
      index: true,
    },
    statusHistory: [StatusHistorySchema],
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrderDocument>('Order', OrderSchema);
