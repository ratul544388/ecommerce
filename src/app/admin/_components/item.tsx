"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ItemProps {
  id: string;
  label: string;
  color?: string;
  onCheckChange: (id: string) => void;
  level?: number;
}

export const Item = ({
  id,
  label,
  color,
  onCheckChange,
  level = 0,
}: ItemProps) => {
  return (
    <div
      className="font-medium flex items-center gap-3 py-1.5 hover:bg-accent rounded-md"
      style={{ paddingLeft: `calc(12px + 12 * ${level}px)` }}
    >
      <Checkbox onCheckedChange={() => onCheckChange(id)} id={id} />
      {color && (
        <span
          className="h-6 w-6 rounded-md border"
          style={{ backgroundColor: color }}
        />
      )}
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};
