import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IProduct } from '@farms/shared-types';

export interface CartItem {
  product: IProduct;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: IProduct, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (product, qty = 1) => {
        const current = get().items;
        const existingIndex = current.findIndex((item) => item.product._id === product._id);

        if (existingIndex > -1) {
          const updated = [...current];
          updated[existingIndex].qty += qty;
          set({ items: updated, isOpen: true });
        } else {
          set({ items: [...current, { product, qty }], isOpen: true });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product._id !== productId) });
      },
      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product._id === productId ? { ...item, qty } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
      },
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0);
      },
    }),
    {
      name: 'farms-cart-guest-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Persist cart items across browser sessions
    }
  )
);
