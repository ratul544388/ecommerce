"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";

interface CategoryItemProps {
  title: string;
  level?: number;
}

export const CategoryItem = ({ title, level = 0 }: CategoryItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCheckChange = () => {
    let filters = searchParams.get("filters");
    const arrayFilters = filters ? filters.split(" ") : [];
  
    const filterIndex = arrayFilters.indexOf(title);
  
    if (filterIndex !== -1) {
      arrayFilters.splice(filterIndex, 1);
    } else {
      arrayFilters.push(title);
    }
  
    const url = arrayFilters.length
      ? `${pathname}?filters=${arrayFilters.join(" ")}`
      : pathname;
  
    router.push(url);
  };
  
  

  return (
    <div
      key={title}
      className={cn("flex items-center gap-3")}
      style={{ paddingLeft: `${12 * level}px` }}
    >
      <Checkbox onCheckedChange={handleCheckChange} id={title} />
      <Label htmlFor={title} className="cursor-pointer">
        {title}
      </Label>
    </div>
  );
};
