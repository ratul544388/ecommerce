"use client";

import { CategoryModal } from "@/components/modals/category-modal";
import { ColorModal } from "@/components/modals/color-modal";
import { DeleteCategoryModal } from "@/components/modals/delete-category-modal";

export const ModalProvider = () => {
  return (
    <>
      <CategoryModal />
      <DeleteCategoryModal />
      <ColorModal />
    </>
  );
};
