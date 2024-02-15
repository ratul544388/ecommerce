"use client";

import { IoCartOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useSheetStore } from "@/hooks/use-sheet-store";
import { useCartStore } from "@/hooks/use-cart-store";

interface CartTriggerProps {}

export const CartTrigger = ({}: CartTriggerProps) => {
  const { onOpen } = useSheetStore();
  const { cart } = useCartStore();

  const total = cart.reduce((total, item) => {
    return (total +=
      (item.product.offerPrice || item.product.price) * item.quantity);
  }, 0);

  return (
    <Button
      onClick={() => onOpen("cart")}
      variant="ghost"
      size="icon"
      className="relative mr-3 flex flex-col"
    >
      <IoCartOutline className="h-5 w-5" />
      <span className="absolute -top-1.5 bg-primary text-white text-xs font-semibold right-1.5 border px-1 translate-x-1/2 rounded-md">
        {cart.length}
      </span>
      <span className="text-xs">{total}$</span>
    </Button>
  );
};
