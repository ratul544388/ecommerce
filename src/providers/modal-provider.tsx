"use client";

import { MobileSidebar } from "@/app/admin/_components/mobile-sidebar";
import { CancelOrderModal } from "@/components/modals/cancel-order-modal";
import { CategoryModal } from "@/components/modals/category-modal";
import { CheckoutModal } from "@/components/modals/checkout-modal";
import { ColorModal } from "@/components/modals/color-modal";
import { DeleteCategoryModal } from "@/components/modals/delete-category-modal";
import { DeleteColorsModal } from "@/components/modals/delete-colors-modal";
import { DeleteSizeModal } from "@/components/modals/delete-size-modal";
import { SizeModal } from "@/components/modals/size-modal";
import { CartSheet } from "@/components/sheets/cart-sheet";
import { UserWithCart } from "@/types";
import { Category } from "@prisma/client";

export const ModalProvider = ({ user, categories }: { user: UserWithCart | null, categories: Category[] }) => {
  return (
    <>
      <CategoryModal />
      <DeleteCategoryModal />
      <ColorModal />
      <DeleteColorsModal />
      <SizeModal />
      <DeleteSizeModal />
      <CheckoutModal user={user} />
      <CancelOrderModal />

      {/* sheet */}
      {user && <CartSheet user={user} />}
      <MobileSidebar user={user} categories={categories}/>
    </>
  );
};
