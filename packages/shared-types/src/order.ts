export type PaymentMethodEnum = 'COD' | 'Card' | 'JazzCash' | 'Easypaisa';
export type PaymentStatusEnum = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderStatusEnum = 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

export interface IOrderItem {
  product: string; // Product ID
  title: string;
  price: number;
  qty: number;
  image: string;
}

export interface IShippingAddress {
  name: string;
  phone: string;
  street: string;
  city: string;
  province: string;
}

export interface IOrderStatusHistory {
  status: OrderStatusEnum;
  changedBy?: string;
  timestamp: string;
  note?: string;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  user?: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethodEnum;
  paymentStatus: PaymentStatusEnum;
  orderStatus: OrderStatusEnum;
  statusHistory: IOrderStatusHistory[];
  createdAt: string;
  updatedAt: string;
}
