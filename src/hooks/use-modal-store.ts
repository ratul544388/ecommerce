import { OrderItem } from "@/actions/order-action";
import { Category, Color, Size, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "categoryModal"
  | "deleteCategoryModal"
  | "colorModal"
  | "deleteColorsModal"
  | "sizeModal"
  | "deleteSizeModal"
  | "checkoutModal";

interface ModalData {
  user?: User | null;
  category?: Category;
  categories?: string[];
  color?: Color;
  size?: Size;
  title?: string;
  id?: string;
  ids?: string[];
  onSuccess?: () => void;
  orderItems?: OrderItem[];
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
