"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Category } from "@prisma/client";

interface CategoryBoxProps {
  category: Category;
  onCheckChange: (id: string) => void;
}

export const CategoryBox = ({ category, onCheckChange }: CategoryBoxProps) => {
  return (
    <div className="font-medium flex items-center gap-3 px-3 py-1.5 hover:bg-accent rounded-md">
      <Checkbox
        onCheckedChange={() => onCheckChange(category.id)}
        id={category.id}
      />
      <Label htmlFor={category.id}>{category.title}</Label>
    </div>
  );
};
