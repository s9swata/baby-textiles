"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Product } from "@baby-textiles/schemas";
import { toast } from "sonner";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  sku?: string;
  blouseStitching?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: { blouseStitching?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "baby-textiles-cart";

function isValidCartItem(item: unknown): item is CartItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as CartItem).productId === 'string' &&
    typeof (item as CartItem).name === 'string' &&
    typeof (item as CartItem).price === 'number' &&
    typeof (item as CartItem).image === 'string' &&
    typeof (item as CartItem).quantity === 'number'
  );
}

function isValidCartItems(arr: unknown): arr is CartItem[] {
  return Array.isArray(arr) && arr.every(isValidCartItem);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (isValidCartItems(parsed)) {
          setItems(parsed);
        } else {
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = useCallback((product: Product, quantity = 1, options?: { blouseStitching?: string }) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        toast.success(`${product.name} quantity updated in cart`);
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity, ...options }
            : item
        );
      }
      toast.success(`${product.name} added to cart`);
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          sku: product.sku,
          ...options,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const item = items.find((item) => item.productId === productId);
    if (item) {
      toast.info(`${item.name} removed from cart`);
    }
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, [items]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    toast.info("Cart cleared");
    setItems([]);
  }, []);

  const getItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const getTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
