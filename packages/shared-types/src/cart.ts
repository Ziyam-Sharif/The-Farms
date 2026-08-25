import { IProduct } from './product';

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
