"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

interface SelectVariantProps {
  sizes: string[];
}

export const SelectSize = ({ sizes }: SelectVariantProps) => {
  const [value, setValue] = useState<string>();
  const searchParams = useSearchParams();

  const handleClick = (size: string) => {
    setValue(size);
  };

  return (
    <div className="space-y-1 mt-4">
      <h4 className="text-sm font-semibold">Select size:</h4>
      <div className="flex items-center gap-3">
        {sizes.map((size) => (
          <Button
            onClick={() => handleClick(size)}
            variant={
              value === size ||
              searchParams.get("size") === value?.toLowerCase()
                ? "ordinary"
                : "outline"
            }
            key={size}
            size="icon"
            className="rounded-sm border-neutral-800 uppercase"
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};
