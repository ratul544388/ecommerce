"use client";

import { cartAction } from "@/actions/cart-action";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart-store";
import { useSizeAndColorStore } from "@/hooks/use-size-and-color-store";
import { UserWithCart } from "@/types";
import { Product, Variant } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { uuid } from "uuidv4";

interface AddToCartProps {
  product: Product & {
    variants: Variant[];
  };
  user: UserWithCart | null;
}

export const AddToCart = ({ product, user }: AddToCartProps) => {
  const { setCart, addToCart, cart, updateCart } = useCartStore();
  const [error, setError] = useState("");
  const [_, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(1);
  const { size, color } = useSizeAndColorStore();

  const handleClick = (qty: number) => {
    setQuantity(quantity + qty);
  };

  const variant = product.variants.find((variant) => {
    return variant.color[0] === color?.[0] && variant.size === size;
  });

  const handleAddToCart = () => {
    if (product.variants.length && !variant) {
      return setError("Please select a color or size");
    }
    setError("");
    const previousCart = cart;
    if (cart.some((item) => item.product.id === product.id)) {
      updateCart(product.id, quantity);
    } else {
      const newItem = {
        id: uuid(),
        product,
        variant: variant || null,
        quantity,
      };
      addToCart(newItem);
    }
    setQuantity(1);
    toast.success("Added to cart");
    startTransition(() => {
      cartAction({
        productId: product.id,
        variantId: variant?.id,
        quantity,
      }).then(({ success, error, cartItems }) => {
        if (success && cartItems) {
          setCart(cartItems);
        } else if (error) {
          toast.error(error);
          setCart(previousCart);
        }
      });
    });
  };

  return (
    <div className="mt-5 space-y-2">
      {error && <p className="font-medium text-red-500/80 text-sm">{error}</p>}
      <div className="flex items-center gap-5">
        <div className="border rounded-sm border-neutral-600 flex items-center justify-between min-w-[130px] h-9 font-semibold overflow-hidden select-none">
          <Button
            disabled={quantity === 1}
            onClick={() => handleClick(-1)}
            size="icon"
            variant="ghost"
          >
            <Minus className="h-5 w-5" />
          </Button>
          <span className="w-fit">{quantity}</span>
          <Button onClick={() => handleClick(1)} size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <Button onClick={handleAddToCart} variant="ordinary">
          Add to cart
        </Button>
      </div>
    </div>
  );
};
