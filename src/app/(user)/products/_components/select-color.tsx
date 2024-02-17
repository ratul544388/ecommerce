"use client";

import { useProductSelectionStore } from "@/hooks/use-product-selection-store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface SelectVariantProps {
  colors: string[][];
}

export const SelectColor = ({ colors }: SelectVariantProps) => {
  const { color, setColor } = useProductSelectionStore();
  const handleClick = (color: string[]) => {
    setColor(color);
  };

  useEffect(() => {
    if (colors.length === 1) {
      setColor([colors[0][0], colors[0][1]]);
    }
  }, [colors, setColor]);

  return (
    <div className="space-y-1 mt-4">
      <h4 className="text-sm font-semibold">
        {colors.length === 1 ? "Color:" : "Select Color:"}
      </h4>
      <div className="flex items-center gap-3">
        {colors.map((item) => (
          <span
            onClick={() => handleClick(item)}
            className={cn(
              "h-8 w-8 rounded-sm cursor-pointer",
              item[0] === color?.[0] && "ring-2 ring-sky-500"
            )}
            key={item[0]}
            style={{ backgroundColor: item[1] }}
          />
        ))}
      </div>
    </div>
  );
};
