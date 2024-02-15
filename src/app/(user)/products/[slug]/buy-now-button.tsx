"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { FaCartArrowDown } from "react-icons/fa";

interface BuyNowButtonProps {
  productId?: string;
  quantity?: number;
  classsName?: string;
}

export const BuyNowButton = ({
  productId,
  quantity = 1,
  classsName,
}: BuyNowButtonProps) => {
    const {onOpen, type} = useModal();
  return (
    <Button onClick={() => onOpen("checkoutModal")} className={cn(classsName)} variant="ordinary">
      <FaCartArrowDown className="h-4 w-4 mr-2" />
      Buy now
    </Button>
  );
};
