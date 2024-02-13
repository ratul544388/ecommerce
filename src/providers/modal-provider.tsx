"use client";

import { CategoryModal } from "@/components/modals/category-modal";
import { ColorModal } from "@/components/modals/color-modal";
import { DeleteCategoryModal } from "@/components/modals/delete-category-modal";
import { DeleteColorsModal } from "@/components/modals/delete-colors-modal";
import { DeleteSizeModal } from "@/components/modals/delete-size-modal";
import { SizeModal } from "@/components/modals/size-modal";

export const ModalProvider = () => {
  return (
    <>
      <CategoryModal />
      <DeleteCategoryModal />
      <ColorModal />
      <DeleteColorsModal />
      <SizeModal />
      <DeleteSizeModal />
    </>
  );
};
