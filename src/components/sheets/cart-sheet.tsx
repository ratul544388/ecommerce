"use client";

import { useCartStore } from "@/hooks/use-cart-store";
import { useModal } from "@/hooks/use-modal-store";
import { useSheetStore } from "@/hooks/use-sheet-store";
import { UserWithCart } from "@/types";
import { Variant } from "@prisma/client";
import { ChevronRight, Router } from "lucide-react";
import { useEffect } from "react";
import { CartItem } from "../cart/cart-item";
import { Sheet } from "../sheet";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface CartSheetProps {
  user: UserWithCart;
}

export const CartSheet = ({ user }: CartSheetProps) => {
  const { isOpen, type, onClose } = useSheetStore();
  const { onOpen } = useModal();
  const router = useRouter();

  const { cart, setCart } = useCartStore();

  useEffect(() => {
    setCart(user.cartItems);
  }, [user, setCart]);

  const handleCheckout = () => {
    onOpen("checkoutModal", { orderItems: cart, user, clearCart: "true" });
  };

  const total = cart.reduce((total, item) => {
    return (total =
      total +
      (item.variant?.offerPrice ||
        item.variant?.price ||
        item.product.offerPrice ||
        item.product.price) *
        item.quantity);
  }, 0);

  return (
    <Sheet open={isOpen && type === "cart"} side="right" className="p-0">
      <div className="flex flex-col items-center justify-between h-12">
        <p className="mt-auto">Cart</p>
        <Separator className="mt-auto" />
      </div>
      {cart.length ? (
        <ScrollArea
          className="flex flex-col gap-5 pt-5 px-3"
          style={{ height: "calc(100vh - 96px)" }}
        >
          {cart.map((item) => (
            <CartItem user={user} cartItem={item} key={item.cartId} />
          ))}
        </ScrollArea>
      ) : (
        <div
          style={{ height: "calc(100vh - 96px)" }}
          className="flex items-center justify-center flex-1 font-medium text-muted-foreground text-xl"
        >
          <div className="flex flex-col gap-4">
            Your Cart is Empty
            <Button
              onClick={() => {
                onClose();
                router.push("/shop");
              }}
              variant="ordinary"
            >
              Continue shopping <FaArrowRightLong className="h-4 w-4 ml-2" />{" "}
            </Button>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between h-12">
        <div className="flex-1 h-full flex flex-col items-center justify-center font-bold text-lg">
          <p className="text-muted-foreground text-xs font-normal">
            Cart total
          </p>
          ${total.toFixed(2)}
        </div>
        <Button
          variant="green"
          disabled={!!!cart.length}
          onClick={handleCheckout}
          className={cn("flex-1 text-lg font-semibold h-full rounded-none")}
        >
          Checkout
          <ChevronRight className="h-5 w-5 ml02" />
        </Button>
      </div>
    </Sheet>
  );
};
