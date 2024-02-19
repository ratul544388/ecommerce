"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Checkbox } from "../ui/checkbox";
import { useSheetStore } from "@/hooks/use-sheet-store";

interface FilterItemProps {
  label: string;
  level?: number;
}

export const FilterItem = ({ label, level = 0 }: FilterItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { onClose } = useSheetStore();
  const isChecked = useMemo(() => {
    return !!searchParams.get("filters")?.split(" ").includes(label);
  }, [label, searchParams]);

  const handleClick = () => {
    const existingFilters = searchParams.get("filters")?.split(" ") || [];
    let newFilters: string[] = [];
    if (existingFilters.includes(label)) {
      newFilters = existingFilters.filter((item) => item !== label);
    } else {
      newFilters = [...existingFilters, label];
    }
    if (newFilters.length) {
      router.push(`/shop?filters=${newFilters.join("+")}`);
    } else {
      router.push("/shop");
    }
    onClose();
  };

  return (
    <div
      role="button"
      onClick={handleClick}
      key={label}
      className={cn("flex items-center gap-3 select-none")}
      style={{ paddingLeft: `${12 * level}px` }}
    >
      <Checkbox checked={isChecked} id={label} />
      <p className="cursor-pointer capitalize">{label}</p>
    </div>
  );
};
