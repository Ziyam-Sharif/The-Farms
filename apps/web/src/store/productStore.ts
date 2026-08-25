import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    slug: 'turmeric-powder',
    title: 'Turmeric Powder',
    urduTitle: 'خالص ہلدی پاؤڈر',
    urduShort: 'ہلدی',
    category: 'Spices',
    price: 650,
    weight: '200g',
    shortDesc: 'Our signature Haldi — organic roots, sun-dried and slowly ground to protect curcumin and warm aroma.',
    mainImg: '/farms-images/turmeric-main.jpg',
    altImg: '/farms-images/turmeric-alt.jpg',
    stock: 85,
    isFeatured: true,
  },
  {
    id: 'p3',
    slug: 'coriander-powder',
    title: 'Coriander Powder',
    urduTitle: 'خالص دھنیا پاؤڈر',
    urduShort: 'دھنیا',
    category: 'Spices',
    price: 550,
    weight: '200g',
    shortDesc: 'Freshly ground Dhania with a rich aroma and cooling citrusy lift for every curry.',
    mainImg: '/farms-images/coriander-main.jpg',
    altImg: '/farms-images/coriander-alt.jpg',
    stock: 92,
    isFeatured: true,
  },
  {
    id: 'p2',
    slug: 'red-chilli-powder',
    title: 'Red Chilli Powder',
    urduTitle: 'لال مرچ',
    urduShort: 'لال مرچ',
    category: 'Spices',
    price: 600,
    weight: '200g',
    shortDesc: 'Sun-ripened chillies slowly ground — a vibrant red powder with clean, sharp heat.',
    mainImg: '/farms-images/chilli-main.jpg',
    altImg: '/farms-images/chilli-alt.jpg',
    stock: 64,
    isFeatured: true,
  },
  {
    id: 'p5',
    slug: 'chhoti-beri-honey',
    title: 'Chhoti Beri Sidr Honey',
    urduTitle: 'سدر شہد',
    urduShort: 'شہد',
    category: 'Honey',
    price: 2450,
    weight: '500g',
    shortDesc: 'Wild-harvested Sidr honey from Changa Manga — thick, buttery and 100% raw.',
    mainImg: '/farms-images/honey-main.jpg',
    altImg: '/farms-images/honey-main.jpg',
    stock: 42,
    isFeatured: true,
  },
  {
    id: 'p7',
    slug: 'himalayan-salajit',
    title: 'Pure Himalayan Salajit',
    urduTitle: 'سلاجیت',
    urduShort: 'سلاجیت',
    category: 'Wellness',
    price: 3200,
    weight: '20g',
    shortDesc: 'A potent, mineral-rich resin sun-dried and purified naturally to protect 84+ minerals.',
    mainImg: '/farms-images/shilajit-main.jpg',
    altImg: '/farms-images/shilajit-main.jpg',
    stock: 35,
    isFeatured: true,
  },
  {
    id: 'p8',
    slug: 'turmeric-curcumin-capsules',
    title: 'Turmeric Curcumin Capsules',
    urduTitle: 'کیپسول',
    urduShort: 'کیپسول',
    category: 'Wellness',
    price: 1850,
    weight: '60 Capsules',
    shortDesc: 'High-potency organic turmeric curcumin, enhanced with piperine for optimal absorption.',
    mainImg: '/farms-images/capsules-main.jpg',
    altImg: '/farms-images/capsules-main.jpg',
    stock: 58,
    isFeatured: false,
  },
  {
    id: 'p4',
    slug: 'cumin-seeds',
    title: 'Whole Cumin Seeds',
    urduTitle: 'سفید زیرہ',
    urduShort: 'زیرہ',
    category: 'Spices',
    price: 700,
    weight: '200g',
    shortDesc: 'Aromatic whole white cumin seeds with intense natural aroma and warmth.',
    mainImg: '/farms-images/spices-spread.jpg',
    altImg: '/farms-images/spices-spread.jpg',
    stock: 75,
    isFeatured: false,
  },
  {
    id: 'p6',
    slug: 'garam-masala',
    title: 'Organic Garam Masala',
    urduTitle: 'گرم مصالحہ',
    urduShort: 'گرم مصالحہ',
    category: 'Spices',
    price: 850,
    weight: '150g',
    shortDesc: 'Heritage 12-spice royal blend roasted and ground in small farm batches.',
    mainImg: '/farms-images/spices-spread.jpg',
    altImg: '/farms-images/spices-spread.jpg',
    stock: 60,
    isFeatured: false,
  },
];

interface ProductState {
  products: ProductItem[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  updateProduct: (id: string, updates: Partial<ProductItem>) => void;
  addProduct: (product: ProductItem) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      loading: false,
      fetchProducts: async () => {
        set({ loading: true });
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
            set({ products: mapped, loading: false });
          } else {
            set({ loading: false });
          }
        } catch {
          set({ loading: false });
        }
      },
      updateProduct: (id, updates) => {
        const current = get().products;
        const updated = current.map((p) => (p.id === id || p.slug === id ? { ...p, ...updates } : p));
        set({ products: updated });
      },
      addProduct: (product) => {
        set({ products: [product, ...get().products] });
      },
      deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id && p.slug !== id) });
      },
    }),
    {
      name: 'farms_shared_catalog_v2',
    }
  )
);
