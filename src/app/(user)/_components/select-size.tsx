"use client";

import { useQueryString } from "@/hooks/use-query-string";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface SelectVariantProps {
  sizes: string[];
}

export const SelectSize = ({ sizes }: SelectVariantProps) => {
  const { handleClick } = useQueryString();
  const searchParams = useSearchParams();

  return (
    <div className="space-y-1 mt-4">
      <h4 className="text-sm font-semibold">Select size:</h4>
      <div className="flex items-center gap-3">
        {sizes.map((item) => (
          <div
            onClick={() =>
              handleClick({ key: "size", value: item.toLowerCase() })
            }
            key={item}
            className={cn(
              "rounded-sm border-neutral-800 uppercase cursor-pointer border shadow-sm h-8 min-w-8 px-1 flex items-center justify-center select-none transition-colors text-sm font-medium",
              item.toLowerCase() === searchParams.get("size") &&
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
