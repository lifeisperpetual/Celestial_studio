import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isLoading: true,
  cartOpen: false,
  audioEnabled: true,
  
  setLoading: (loading) => set({ isLoading: loading }),
  setCartOpen: (open) => set({ cartOpen: open }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
}));
