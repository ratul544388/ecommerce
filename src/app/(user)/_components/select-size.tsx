"use client";

import { Button } from "@/components/ui/button";
import { useSizeAndColorStore } from "@/hooks/use-size-and-color-store";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SelectVariantProps {
  sizes: string[];
}

export const SelectSize = ({ sizes }: SelectVariantProps) => {
  const { size, setSize } = useSizeAndColorStore();
  const handleClick = (size: string) => {
    setSize(size);
  };

  return (
    <div className="space-y-1 mt-4">
      <h4 className="text-sm font-semibold">Select size:</h4>
      <div className="flex items-center gap-3">
        {sizes.map((item) => (
          <div
            onClick={() => handleClick(item)}
            key={item}
            className={cn(
              "rounded-sm border-neutral-800 uppercase cursor-pointer border shadow-sm h-8 min-w-8 px-1 flex items-center justify-center select-none transition-colors text-sm font-medium",
              item === size &&
                "bg-neutral-800 hover:bg-neutral-800/90 text-white ring-2 ring-sky-500"
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
