import { Product, Variant } from "@prisma/client";
import { create } from "zustand";

type CartItemType = {
  id: string;
  product: Product & {
    variants: Variant[];
  };
  variant: Variant | null;
  quantity: number;
};

interface CartStore {
  cart: CartItemType[];
  setCart: (cart: CartItemType[]) => void;
  addToCart: (item: CartItemType) => void;
  deleteCart: (id: string) => void;
  updateCart: (productId: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  setCart: (newCart: CartItemType[]) => set({ cart: newCart }),
  addToCart: (item: CartItemType) =>
    set((state) => ({ cart: [...state.cart, item] })),
  deleteCart: (id: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateCart: (variantId: string, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((item) => ({
        ...item,
        quantity:
          item.variant?.id === variantId
            ? item.quantity + quantity
            : item.quantity,
      })),
    })),
}));
