import { create } from 'zustand';
import { fetchApi } from '../lib/api';

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  urduTitle: string;
  urduShort: string;
  category: 'Spices' | 'Honey' | 'Wellness';
  price: number;
  weight: string;
  shortDesc: string;
  mainImg: string;
  altImg?: string;
  stock?: number;
  isFeatured?: boolean;
}

interface ProductState {
  products: ProductItem[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: true,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchApi('/products');
      if (res.data?.items && res.data.items.length > 0) {
        const mapped: ProductItem[] = res.data.items.map((p: any) => ({
          id: p._id || p.id,
          slug: p.slug,
          title: p.title,
          urduTitle: p.urduTitle || p.title,
          urduShort: p.urduShort || p.title,
          category: p.category as any,
          price: Number(p.price),
          weight: p.weight || '200g',
          shortDesc: p.shortDescription || p.description || '',
          mainImg: p.images?.[0]?.url || '/farms-images/spices-spread.jpg',
          altImg: p.images?.[1]?.url || p.images?.[0]?.url || '/farms-images/spices-spread.jpg',
          stock: Number(p.stock) || 50,
          isFeatured: Boolean(p.isFeatured),
        }));
        set({ products: mapped, loading: false, error: null });
      } else {
        set({ products: [], loading: false, error: null });
      }
    } catch (err: any) {
      set({
        products: [],
        loading: false,
        error:
          err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')
            ? 'Unable to connect to the backend server. Please verify the API status.'
            : err.message || 'Error loading live products from catalog.',
      });
    }
  },
}));
