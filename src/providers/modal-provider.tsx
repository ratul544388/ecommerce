"use client";

import { MobileSidebar } from "@/app/admin/_components/mobile-sidebar";
import { CategoryModal } from "@/components/modals/category-modal";
import { ColorModal } from "@/components/modals/color-modal";
import { DeleteCategoryModal } from "@/components/modals/delete-category-modal";
import { DeleteColorsModal } from "@/components/modals/delete-colors-modal";
import { DeleteSizeModal } from "@/components/modals/delete-size-modal";
import { SizeModal } from "@/components/modals/size-modal";
import { CartSheet } from "@/components/sheets/cart-sheet";
import { UserWithCart } from "@/types";

export const ModalProvider = ({ user }: { user: UserWithCart | null }) => {
  return (
    <>
      <CategoryModal />
      <DeleteCategoryModal />
      <ColorModal />
      <DeleteColorsModal />
      <SizeModal />
      <DeleteSizeModal />
      <CartSheet user={user} />
      <MobileSidebar />
    </>
  );
};
