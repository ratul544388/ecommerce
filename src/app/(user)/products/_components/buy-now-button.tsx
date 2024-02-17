"use client";

import { Button } from "@/components/ui/button";
import { getProductVariant } from "@/helper";
import { useModal } from "@/hooks/use-modal-store";
import { useProductSelectionStore } from "@/hooks/use-product-selection-store";
import { cn } from "@/lib/utils";
import { Product, Variant } from "@prisma/client";
import { FaCartArrowDown } from "react-icons/fa";

interface BuyNowButtonProps {
  product: Product & {
    variants: Variant[];
  };
  classsName?: string;
}

export const BuyNowButton = ({ product, classsName }: BuyNowButtonProps) => {
  const { onOpen } = useModal();
  const { size, color, quantity, setError } = useProductSelectionStore();

  const handleClick = () => {
    const variant = getProductVariant({
      variants: product.variants,
      color,
      size,
    });

    if (product.variants.length && !variant) {
      return setError("Please select a size or color");
    }
    const orderItems = [{ product, variant, quantity }];
    onOpen("checkoutModal", { orderItems });
  };
  return (
    <Button onClick={handleClick} className={cn(classsName)} variant="ordinary">
      <FaCartArrowDown className="h-4 w-4 mr-2" />
      Buy now
    </Button>
  );
};
