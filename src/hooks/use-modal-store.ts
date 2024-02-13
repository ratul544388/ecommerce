import { Category, Color, Size } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "categoryModal"
  | "deleteCategoryModal"
  | "colorModal"
  | "deleteColorsModal"
  | "sizeModal"
  | "deleteSizeModal";

interface ModalData {
  category?: Category;
  color?: Color;
  size?: Size;
  title?: string;
  id?: string;
  ids?: string[];
  onSuccess?: () => void;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
