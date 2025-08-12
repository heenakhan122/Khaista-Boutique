import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from "@/shared/schema";

type WishlistItem = Product;

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.id === item.id);
        
        if (!existingItem) {
          set({ items: [...items, item] });
        }
      },
      
      removeFromWishlist: (itemId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== itemId) });
      },
      
      isInWishlist: (itemId) => {
        const { items } = get();
        return items.some(item => item.id === itemId);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        const { items } = get();
        return items.length;
      },
    }),
    {
      name: 'khaista-wishlist-storage',
    }
  )
);