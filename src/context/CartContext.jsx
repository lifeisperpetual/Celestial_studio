import { createContext, useContext, useMemo } from 'react';
import useSessionStorage from '../hooks/useSessionStorage.js';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  // items: [{ key, id, name, price, qty }]
  const [items, setItems] = useSessionStorage('cart-items', []);

  const addToCart = (product) => {
    setItems((prev) => {
      const key = product.id;
      const existing = prev.find((p) => p.key === key);
      if (existing) {
        return prev.map((p) => (p.key === key ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { key, id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (key) => setItems((prev) => prev.filter((p) => p.key !== key));
  const clearCart = () => setItems([]);

  const totalCount = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((a, b) => a + b.price * b.qty, 0), [items]);

  const value = { items, addToCart, removeFromCart, clearCart, totalCount, totalPrice };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
