"use client";

import {
  createCart,
  updateCart as updateGlobalCart,
} from "@/actions/cart-action";
import { Button } from "@/components/ui/button";
import { getProductVariant } from "@/helper";
import { useCartStore } from "@/hooks/use-cart-store";
import { useProductSelectionStore } from "@/hooks/use-product-selection-store";
import { UserWithCart } from "@/types";
import { Product, Variant } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { uuid } from "uuidv4";

interface AddToCartProps {
  product: Product & {
    variants: Variant[];
  };
  user: UserWithCart | null;
}

export const AddToCart = ({ product, user }: AddToCartProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setCart, addToCart, cart, updateCart } = useCartStore();
  const [_, startTransition] = useTransition();
  const { size, color, quantity, setQuantity, error, setError } =
    useProductSelectionStore();

  const variants = product.variants;

  const handleClick = (qty: number) => {
    setQuantity(quantity + qty);
  };

  const variant =
    getProductVariant({
      variants,
      size,
      color,
    }) || null;

  const handleAddToCart = () => {
    if (!user) {
      return router.push(`/sign-in/redirect_url=${pathname}`);
    }
    const hasSize = variants.some((variant) => variant.size);
    const hasColor = variants.some((variant) => variant.color);

    if ((hasSize && !size) || (hasColor && !color)) {
      return setError("Please select color or size");
    }

    if (!variant && (hasSize || hasColor)) {
      return setError("Stock out");
    }
    setQuantity(1);
    setError("");
    const cartId = uuid();
    const previousCart = cart;

    const existingCart = cart.find((item) => {
      if (variant) {
        return (
          variant.size === item.variant?.size &&
          variant.color[0] === item.variant?.color[0]
        );
      } else {
        return product.id === item.product.id;
      }
    });

    if (existingCart) {
      updateCart(existingCart.cartId, quantity);
      toast.success("Product add to cart");
      startTransition(() => {
        updateGlobalCart({
          cartId: existingCart.cartId,
          quantity,
        }).then(({ error }) => {
          if (error) {
            toast.error(error);
            setCart(previousCart);
          }
        });
      });
    } else {
      const newItem = {
        cartId,
        product,
        variant,
        quantity,
      };
      addToCart(newItem);
      startTransition(() => {
        createCart({
          cartId,
          productId: product.id,
          variantId: variant?.id,
          quantity,
        }).then(({ error }) => {
          if (error) {
            toast.error(error);
            setCart(previousCart);
          }
        });
      });
    }
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
