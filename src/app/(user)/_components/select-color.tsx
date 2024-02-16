"use client";

import { useQueryString } from "@/hooks/use-query-string";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface SelectVariantProps {
  colors: {
    name: string;
    hex: string;
  }[];
}

export const SelectColor = ({ colors }: SelectVariantProps) => {
  const searchParams = useSearchParams();
  const { handleClick } = useQueryString();
  return (
    <div className="space-y-1 mt-4">
      <h4 className="text-sm font-semibold">
        {colors.length === 1 ? "Color:" : "Select Color:"}
      </h4>
      <div className="flex items-center gap-3">
        {colors.map(({ name, hex }) => (
          <span
            onClick={() => handleClick({ key: "color", value: name })}
            className={cn(
              "h-8 w-8 rounded-sm cursor-pointer",
              name === searchParams.get("color") && "ring-2 ring-sky-500"
            )}
            key={name}
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>
    </div>
  );
};
