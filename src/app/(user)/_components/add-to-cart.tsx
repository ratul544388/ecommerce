"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface AddToCartProps {}

export const AddToCart = ({}: AddToCartProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleClick = (qty: number) => {
    setQuantity(quantity + qty);
  };

  return (
    <div className="flex items-center gap-5 mt-5">
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
      <Button variant="ordinary">Add to cart</Button>
    </div>
  );
};
