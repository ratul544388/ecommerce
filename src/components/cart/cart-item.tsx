"use client";

import {
  updateCart as UpdateCartItem,
  deleteCart as deleteCartAction,
} from "@/actions/cart-action";
import { ColorPopover } from "@/app/admin/_components/color-popover";
import { SizePopover } from "@/app/admin/_components/size-popover";
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

interface CartItemProps {
  cartItem: {
    id: string;
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
  const { setCart, deleteCart } = useCartStore();
  const [size, setSize] = useState(cartItem.variant?.size as string);
  const [color, setColor] = useState(cartItem.variant?.color as string[]);

  const sizes = product.variants
    .filter(
      (variant, index, self) =>
        variant.size && index === self.findIndex((i) => i.size === variant.size)
    )
    .map((item) => item.size) as string[];

  const colors = product.variants
    .filter(
      (variant, index, self) =>
        variant.color &&
        index === self.findIndex((i) => i.color[0] == variant.color[0])
    )
    .map((item) => item.color);

  const updateCart = ({
    currentSize,
    currentColor,
  }: {
    currentSize?: string;
    currentColor?: string[];
  }) => {
    const variant = cartItem.product.variants.find((variant) => {
      return (
        variant.color[0] === currentColor?.[0] && variant.size === currentSize
      );
    });

    if (variant) {
      startTransition(() => {
        UpdateCartItem({ cartItemId: cartItem.id, variantId: variant.id }).then(
          ({ success, error }) => {
            if (success) {
              toast.success(success);
            } else if (error) {
              toast.error(error);
            }
          }
        );
      });
    }
  };

  const sizePopover = (
    <SizePopover
      sizes={sizes}
      value={size}
      onChange={(value) => {
        setSize(value);
        updateCart({ currentSize: value, currentColor: color });
      }}
      triggerClassName="w-[120px] flex-row-reverse"
      containerClassName="w-[120px]"
    />
  );

  const colorPopover = (
    <ColorPopover
      colors={colors}
      value={color}
      onChange={(value) => {
        setColor(value);
        updateCart({ currentColor: value, currentSize: size });
      }}
      triggerClassName="w-[120px] flex-row-reverse"
      containerClassName="w-[120px]"
    />
  );

  const details = [
    {
      label: "Price",
      value: `$${product.offerPrice || product.price}`,
    },
    {
      label: "Size",
      value: sizePopover,
    },
    {
      label: "Color",
      value: colors.length > 1 ? colorPopover : cartItem.variant?.color[0],
    },
    {
      label: "Quantity",
      value: cartItem.quantity,
    },
    {
      label: "Subtotal",
      value: `$${cartItem.quantity * product.price}`,
    },
  ];

  const handleDeleteCart = () => {
    const previousCart = user.cartItems;
    deleteCart(cartItem.id);
    toast.success("Product removed from cart");
    startTransition(() => {
      deleteCartAction(cartItem.id).then(({ error }) => {
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
        <Photo photo={product.photos[0]} />
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
