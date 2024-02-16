"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";

interface FilterItemProps {
  label: string;
  level?: number;
  filters: string[];
  onChange: (value: string[]) => void;
}

export const FilterItem = ({
  label,
  level = 0,
  filters,
  onChange,
}: FilterItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isChecked = !!searchParams.get("filters")?.split(" ").includes(label);

  const handleCheckChange = () => {
    let newFilters: string[] = [];
    if (filters.includes(label)) {
      newFilters = filters.filter((item) => item !== label);
      onChange(newFilters);
    } else {
      newFilters = [...filters, label];
      onChange([...filters, label]);
    }
  };

  return (
    <div
      key={label}
      className={cn("flex items-center gap-3")}
      style={{ paddingLeft: `${12 * level}px` }}
    >
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleCheckChange}
        id={label}
      />
      <Label htmlFor={label} className="cursor-pointer capitalize">
        {label}
      </Label>
    </div>
  );
};
