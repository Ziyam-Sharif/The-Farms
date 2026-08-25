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
