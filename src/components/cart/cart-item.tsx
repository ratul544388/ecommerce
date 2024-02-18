"use client";

import {
  updateCart as UpdateCartItem,
  deleteCart as deleteCartAction,
} from "@/actions/cart-action";
import { useCartStore } from "@/hooks/use-cart-store";
import { cn } from "@/lib/utils";
import { UserWithCart } from "@/types";
import { Product, Variant } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Photo } from "../photo";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { getFormattedPrice } from "@/helper";

interface CartItemProps {
  cartItem: {
    cartId: string;
    product: Product & {
      variants: Variant[];
    };
    variant: Variant | null;
    quantity: number;
  };
  user: UserWithCart;
}

export const CartItem = ({ cartItem, user }: CartItemProps) => {
  const { product, variant } = cartItem;
  const [_, startTransition] = useTransition();
  const { cart, setCart, deleteCart } = useCartStore();

  const price =
    variant?.offerPrice ||
    variant?.price ||
    product.offerPrice ||
    product.price;

  const details = [
    {
      label: "Price",
      value: `$${getFormattedPrice(price)}`,
    },
    {
      label: "Size",
      value: cartItem.variant?.size,
    },
    {
      label: "Color",
      value: cartItem.variant?.color[0],
    },
    {
      label: "Quantity",
      value: cartItem.quantity,
    },
    {
      label: "Subtotal",
      value: `$${getFormattedPrice(cartItem.quantity * price)}`,
    },
  ];

  const handleDeleteCart = () => {
    const previousCart = user.cartItems;
    deleteCart(cartItem.cartId);
    toast.success("Product removed from cart");
    startTransition(() => {
      deleteCartAction(cartItem.cartId).then(({ error }) => {
        if (error) {
          setCart(previousCart);
          toast.error(error);
        }
      });
    });
  };

  return (
    <div className="space-y-2 shadow-md rounded-md">
      <div className="flex justify-between p-2 rounded-md bg-neutral-100">
        <h4 className="font-medium">{product.name}</h4>
        <Photo photo={product.photos[0]} className="max-w-[80px]" />
      </div>
      {details.map(({ label, value }) => (
        <div
          key={label}
          className={cn("space-y-1 mt-1 px-3", !value && "hidden")}
        >
          <div
            className={cn(
              "flex capitalize text-sm text-muted-foreground items-center justify-between"
            )}
          >
            <h5 className="">{label}</h5>
            {value}
          </div>
          <Separator />
        </div>
      ))}
      <div className="flex items-center justify-end p-3">
        <Button
          onClick={handleDeleteCart}
          size="icon"
          variant="destructive"
          className="h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
