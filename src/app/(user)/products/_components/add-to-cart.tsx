"use client";

import { cartAction } from "@/actions/cart-action";
import { Button } from "@/components/ui/button";
import { getProductVariant } from "@/helper";
import { useCartStore } from "@/hooks/use-cart-store";
import { useProductSelectionStore } from "@/hooks/use-product-selection-store";
import { UserWithCart } from "@/types";
import { Product, Variant } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { useMemo, useTransition } from "react";
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
  const [_, startTransition] = useTransition();
  const { size, color, quantity, setQuantity, error, setError } =
    useProductSelectionStore();

  const variants = product.variants;

  const handleClick = (qty: number) => {
    setQuantity(quantity + qty);
  };

  const variant = getProductVariant({
    variants,
    size,
    color,
  });

  const handleAddToCart = () => {
    const hasSize = variants.some((variant) => variant.size);
    const hasColor = variants.some((variant) => variant.color);

    if ((hasSize && !size) || (hasColor && !color)) {
      return setError("Please select color or size");
    }

    if (!variant) {
      return setError("Stock out");
    }
    setError("");
    const previousCart = cart;
    const existingCart = user?.cartItems.find((item) => {
      return item.variant?.id === variant?.id;
    });
    if (existingCart && variant) {
      updateCart(variant.id, quantity);
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
