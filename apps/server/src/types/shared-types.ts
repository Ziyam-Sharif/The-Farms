export interface IApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown;
  };
}

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type UserRole = 'customer' | 'admin' | 'editor';

export interface IUserAddress {
  _id?: string;
  label: string;
  street: string;
  city: string;
  province: string;
  isDefault: boolean;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  addresses: IUserAddress[];
  refreshTokenVersion: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

export type ProductCategoryEnum = 'Spices' | 'Honey' | 'Wellness';

export interface IProductImage {
  url: string;
  alt: string;
}

export interface IModel3D {
  url: string;
  format: 'glb';
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ProductCategoryEnum | string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  weight: string;
  images: IProductImage[];
  model3d?: IModel3D;
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  ratingAvg: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICartItem {
  product: IProduct | string;
  qty: number;
}

export interface ICart {
  _id: string;
  user?: string;
  sessionId?: string;
  items: ICartItem[];
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethodEnum = 'COD' | 'Card' | 'JazzCash' | 'Easypaisa';
export type PaymentStatusEnum = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderStatusEnum = 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

export interface IOrderItem {
  product: string;
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

export interface IReview {
  _id: string;
  product: string;
  user?: {
    _id: string;
    name: string;
  };
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead?: boolean;
  status?: 'new' | 'read' | 'responded';
  createdAt: string;
  updatedAt: string;
}

export interface INewsletterSubscriber {
  _id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
}

export interface IAuditLog {
  _id: string;
  actor: {
    _id: string;
    name: string;
    email: string;
  };
  action: string;
  target: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  timestamp: string;
}
