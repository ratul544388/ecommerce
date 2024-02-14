import { create } from "zustand";

interface SizeAndColorStore {
  size: string | undefined;
  color: string[] | undefined;
  setSize: (value: string) => void;
  setColor: (value: string[]) => void;
}

export const useSizeAndColorStore = create<SizeAndColorStore>((set) => ({
  size: undefined,
  color: undefined,
  setSize: (value: string) => set({ size: value }),
  setColor: (value: string[]) => set({ color: value }),
}));
