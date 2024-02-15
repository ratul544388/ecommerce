"use client";

import { useCartStore } from "@/hooks/use-cart-store";
import { useSheetStore } from "@/hooks/use-sheet-store";
import { UserWithCart } from "@/types";
import { useEffect } from "react";
import { CartItem } from "../cart/cart-item";
import { Sheet } from "../sheet";
import { Separator } from "../ui/separator";
import { ChevronRight } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface CartSheetProps {
  user: UserWithCart | null;
}

export const CartSheet = ({ user }: CartSheetProps) => {
  const { isOpen, type } = useSheetStore();
  const { onOpen } = useModal();
  const { cart, setCart } = useCartStore();

  useEffect(() => {
    if (user) {
      setCart(user.cartItems);
    }
  }, [user, setCart]);

  return (
    <Sheet open={isOpen && type === "cart"} side="right" className="p-0">
      <div className="flex flex-col items-center justify-between h-12">
        <p className="mt-auto">Cart</p>
        <Separator className="mt-auto" />
      </div>
      <div
        className="space-y-5 overflow-hidden pt-3 overflow-y-auto px-3"
        style={{ height: "calc(100vh - 96px)" }}
      >
        {user &&
          cart.map((item) => (
            <CartItem user={user} cartItem={item} key={item.id} />
          ))}
      </div>
      <div className="flex items-center justify-between h-12">
        <div className="flex-1 h-full flex flex-col items-center justify-center font-bold text-lg">
          <p className="text-muted-foreground text-xs font-normal">
            Cart total
          </p>
          $1000
        </div>
        <div
          onClick={() => onOpen("checkoutModal")}
          className="w-full cursor-pointer select-none h-full bg-green-600 hover:bg-green-600/90 flex items-center justify-center flex-1 text-white/90 font-semibold text-lg"
        >
          Checkout
          <ChevronRight className="h-5 w-5 ml02" />
        </div>
      </div>
    </Sheet>
  );
};
