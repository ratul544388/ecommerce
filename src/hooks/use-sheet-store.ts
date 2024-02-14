import { create } from "zustand";

export type SheetType = "useMobileSidebar" | "sidebar" | "cart";

interface ModalStore {
  type: SheetType | null;
  isOpen: boolean;
  onOpen: (type: SheetType) => void;
  onClose: () => void;
}

export const useSheetStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
