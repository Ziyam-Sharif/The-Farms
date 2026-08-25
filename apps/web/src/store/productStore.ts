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
  fetchProducts: (silent?: boolean) => Promise<void>;
}

// BroadcastChannel for instant local cross-tab sync
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel('farms_live_sync');
  } catch {}
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

export const useProductStore = create<ProductState>((set, get) => {
  // Setup SSE and Auto-Sync listener
  if (typeof window !== 'undefined') {
    // 1. Cross-tab sync
    if (broadcastChannel) {
      broadcastChannel.onmessage = (event) => {
        if (event.data?.type === 'PRODUCT_CHANGED') {
          get().fetchProducts(true);
        }
      };
    }

    // 2. Window focus & visibility auto-sync
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        get().fetchProducts(true);
      }
    });

    // 3. Background heartbeat poll every 4 seconds for instant multi-device live sync
    setInterval(() => {
      get().fetchProducts(true);
    }, 4000);

    // 4. Server-Sent Events (SSE) stream listener
    try {
      const sseUrl =
        window.location.hostname !== 'localhost'
          ? 'https://the-farms-server.vercel.app/api/v1/events'
          : 'http://localhost:5000/api/v1/events';
      const eventSource = new EventSource(sseUrl);
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type?.startsWith('PRODUCT_')) {
            get().fetchProducts(true);
          }
        } catch {}
      };
    } catch {}
  }

  return {
    products: [],
    loading: true,
    error: null,
    fetchProducts: async (silent = false) => {
      if (!silent) {
        set({ loading: true, error: null });
      }
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
          set({ products: [], loading: false, error: null });
        }
      } catch (err: any) {
        if (!silent) {
          set({
            products: [],
            loading: false,
            error:
              err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')
                ? 'Unable to connect to the backend server. Please verify the API status.'
                : err.message || 'Error loading live products from catalog.',
          });
        }
      }
    },
  };
});
