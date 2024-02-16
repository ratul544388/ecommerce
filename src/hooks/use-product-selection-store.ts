import { create } from "zustand";

interface ProductSelectionStorePrpos {
  size: string | undefined;
  setSize: (value: string) => void;
  color: string[] | undefined;
  setColor: (value: string[]) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  photo: string | undefined;
  setPhoto: (value: string) => void;
  error: undefined | string;
  setError: (value: string) => void;
}

export const useProductSelectionStore = create<ProductSelectionStorePrpos>(
  (set) => ({
    size: undefined,
    setSize: (value: string) => set({ size: value }),
    color: undefined,
    setColor: (value: string[]) => set({ color: value }),
    quantity: 1,
    setQuantity: (value: number) => set({ quantity: value }),
    error: undefined,
    setError: (value: string) => set({ error: value }),
    photo: undefined,
    setPhoto: (value: string) => set({ photo: value }),
  })
);
