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

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    slug: 'turmeric-powder',
    title: 'Turmeric Powder (Haldi)',
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
    title: 'Coriander Powder (Dhania)',
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
    title: 'Red Chilli Powder (Lal Mirch)',
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
    title: 'Whole Cumin Seeds (Zeera)',
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
  error: string | null;
  fetchProducts: () => Promise<void>;
  updateProduct: (id: string, updates: Partial<ProductItem>) => Promise<void>;
  addProduct: (product: ProductItem) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

// BroadcastChannel for instant cross-tab sync
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel('farms_live_sync');
  } catch {}
}

function broadcastChange() {
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: 'PRODUCT_CHANGED', timestamp: Date.now() });
    } catch {}
  }
}

function resolveProductImage(p: any): { mainImg: string; altImg: string; urduShort: string } {
  const title = (p.title || '').toLowerCase();
  const slug = (p.slug || '').toLowerCase();
  let rawMain = p.images?.[0]?.url;
  let rawAlt = p.images?.[1]?.url || rawMain;

  if (title.includes('honey') || slug.includes('honey') || title.includes('sidr')) {
    return {
      mainImg: '/farms-images/honey-main.jpg',
      altImg: '/farms-images/honey-main.jpg',
      urduShort: 'شہد',
    };
  }
  if (title.includes('cumin') || slug.includes('cumin') || title.includes('zeera')) {
    return {
      mainImg: '/farms-images/spices-spread.jpg',
      altImg: '/farms-images/coriander-alt.jpg',
      urduShort: 'زیرہ',
    };
  }
  if (title.includes('turmeric') || slug.includes('turmeric') || title.includes('haldi')) {
    return {
      mainImg: '/farms-images/turmeric-main.jpg',
      altImg: '/farms-images/turmeric-alt.jpg',
      urduShort: 'ہلدی',
    };
  }
  if (title.includes('coriander') || slug.includes('coriander') || title.includes('dhania')) {
    return {
      mainImg: '/farms-images/coriander-main.jpg',
      altImg: '/farms-images/coriander-alt.jpg',
      urduShort: 'دھنیا',
    };
  }
  if (title.includes('chilli') || slug.includes('chilli') || title.includes('mirch')) {
    return {
      mainImg: '/farms-images/chilli-main.jpg',
      altImg: '/farms-images/chilli-alt.jpg',
      urduShort: 'لال مرچ',
    };
  }
  if (title.includes('shilajit') || slug.includes('shilajit') || title.includes('salajit')) {
    return {
      mainImg: '/farms-images/shilajit-main.jpg',
      altImg: '/farms-images/shilajit-main.jpg',
      urduShort: 'سلاجیت',
    };
  }
  if (title.includes('capsule') || slug.includes('capsule') || title.includes('curcumin')) {
    return {
      mainImg: '/farms-images/capsules-main.jpg',
      altImg: '/farms-images/capsules-main.jpg',
      urduShort: 'کیپسول',
    };
  }

  return {
    mainImg: !rawMain || rawMain.includes('unsplash.com') ? '/farms-images/spices-spread.jpg' : rawMain,
    altImg: !rawAlt || rawAlt.includes('unsplash.com') ? '/farms-images/spices-spread.jpg' : rawAlt,
    urduShort: p.urduShort || 'خالص',
  };
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: INITIAL_PRODUCTS,
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchApi('/products');
      if (res.data?.items && res.data.items.length > 0) {
        const mapped: ProductItem[] = res.data.items.map((p: any) => {
          const { mainImg, altImg, urduShort } = resolveProductImage(p);
          return {
            id: p._id || p.id,
            slug: p.slug,
            title: p.title,
            urduTitle: p.urduTitle || p.title,
            urduShort: p.urduShort || urduShort,
            category: p.category as any,
            price: Number(p.price),
            weight: p.weight || '200g',
            shortDesc: p.shortDescription || p.description || '',
            mainImg,
            altImg,
            stock: Number(p.stock) || 50,
            isFeatured: Boolean(p.isFeatured),
          };
        });
        set({ products: mapped, loading: false, error: null });
      } else {
        set({ loading: false, error: null });
      }
    } catch (err: any) {
      set({
        loading: false,
        error: err.message || 'Failed to fetch products from backend API',
      });
      throw err;
    }
  },
  updateProduct: async (id, updates) => {
    await fetchApi(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });

    const current = get().products;
    const updated = current.map((p) => (p.id === id || p.slug === id ? { ...p, ...updates } : p));
    set({ products: updated });
    broadcastChange();
  },
  addProduct: async (product) => {
    const res = await fetchApi('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });

    const createdItem: ProductItem = res.data
      ? {
          id: res.data._id || product.id,
          slug: res.data.slug || product.slug,
          title: res.data.title || product.title,
          urduTitle: res.data.urduTitle || product.urduTitle,
          urduShort: res.data.urduShort || product.urduShort,
          category: res.data.category || product.category,
          price: Number(res.data.price || product.price),
          weight: res.data.weight || product.weight,
          shortDesc: res.data.shortDescription || product.shortDesc,
          mainImg: res.data.images?.[0]?.url || product.mainImg,
          stock: Number(res.data.stock || product.stock),
          isFeatured: Boolean(res.data.isFeatured),
        }
      : product;

    set({ products: [createdItem, ...get().products] });
    broadcastChange();
  },
  deleteProduct: async (id) => {
    await fetchApi(`/products/${id}`, { method: 'DELETE' });
    const updated = get().products.filter((p) => p.id !== id && p.slug !== id);
    set({ products: updated });
    broadcastChange();
  },
}));
