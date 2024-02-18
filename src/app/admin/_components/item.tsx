"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ItemProps {
  id: string;
  label: string;
  color?: string;
  onCheckChange: (id: string) => void;
  subCategories?: string[];
}

export const Item = ({
  id,
  label,
  color,
  onCheckChange,
  subCategories,
}: ItemProps) => {
  return (
    <div className="font-medium flex flex-col gap-2">
      <div className="flex items-center gap-3 p-3 hover:bg-secondary rounded-md">
        <Checkbox onCheckedChange={() => onCheckChange(id)} id={id} />
        {color && (
          <span
            className="h-6 w-6 rounded-md border"
            style={{ backgroundColor: color }}
          />
        )}
        <Label htmlFor={id} className="cursor-pointer capitalize">
          {label}
        </Label>
      </div>
      {subCategories &&
        subCategories.map((item, index) => (
          <div
            key={index}
            className="flex capitalize flex-col pl-12 gap-3 text-sm text-muted-foreground"
          >
            {item}
          </div>
        ))}
    </div>
  );
};
