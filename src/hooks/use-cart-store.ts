import { Product, Variant } from "@prisma/client";
import { create } from "zustand";

type CartItemType = {
  cartId: string;
  product: Product & {
    variants: Variant[];
  };
  variant: Variant | null;
  quantity: number;
};

interface CartStore {
  cart: CartItemType[];
  setCart: (cart: CartItemType[]) => void;
  addToCart: (newItem: CartItemType) => void;
  updateCart: (cartId: string, quantity: number) => void;
  deleteCart: (cartId: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  setCart: (newCart: CartItemType[]) => set({ cart: newCart }),
  addToCart: (newItem: CartItemType) =>
    set((state) => {
      return { cart: [...state.cart, newItem] };
    }),
  updateCart: (cartId: string, quantity: number) =>
    set((state) => {
      const cartIndex = state.cart.findIndex((item) => item.cartId === cartId);
      if (cartIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[cartIndex].quantity += quantity;
        return { cart: updatedCart };
      }
      return state;
    }),
  deleteCart: (cartId: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.cartId !== cartId),
    })),
}));
