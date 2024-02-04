"use client";

import { Color } from "@prisma/client";

interface ColorBoxProps {
  color: Color;
}

export const ColorBox = ({ color }: ColorBoxProps) => {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-accent rounded-md">
      <span
        className="rounded-md h-9 w-9 border"
        style={{ backgroundColor: color.hexCode }}
      />
      <h4 className="font-semibold">{color.name}</h4>
    </div>
  );
};
