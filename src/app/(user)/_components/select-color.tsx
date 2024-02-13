"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useState } from "react";

interface SelectVariantProps {
  colors: {
    name: string;
    hexCode: string;
  }[];
}

export const SelectColor = ({ colors }: SelectVariantProps) => {
  const [value, setValue] = useState<string>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (color: string) => {
    const currentQuery = qs.parse(searchParams.toString());
    setValue(color);
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        ...currentQuery,
        color: color.toLowerCase(),
      },
    });
    router.push(url);
  };

  return (
    <div className="space-y-1 mt-4">
      <h4 className="text-sm font-semibold">Select color:</h4>
      <div className="flex items-center gap-3">
        {colors.map(({ name, hexCode }) => (
          <span
            onClick={() => handleClick(name)}
            className={cn(
              "h-9 w-9 rounded-sm cursor-pointer",
              value === name && "ring-2 ring-sky-500"
            )}
            key={name}
            style={{ backgroundColor: hexCode }}
          />
        ))}
      </div>
    </div>
  );
};
