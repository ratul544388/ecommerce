"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { Check, ChevronUp } from "lucide-react";
import { useState } from "react";

type ColorType = {
  name: string;
  hex: string;
};

interface SelectProps {
  colors: ColorType[];
  onChange: (colors: ColorType) => void;
}

export const ColorSelect = ({ colors, onChange }: SelectProps) => {
  const animation = useAnimation();
  const [selectedColor, setSelectedColor] = useState<ColorType>();

  return (
    <div className="relative">
      <div
        role="button"
        onClick={() => animation.start("visible")}
        className="flex z-20 items-center gap-3 border rounded-md shadow-sm h-9 px-3"
      >
        <p
          className={cn(
            "text-muted-foreground text-sm",
            selectedColor && "text-foreground"
          )}
        >
          {selectedColor ? (
            <div className="flex items-center gap-3">
              <span
                className="h-6 w-6 rounded-sm border"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <p className="text-sm">{selectedColor.name}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Select product color
            </p>
          )}
        </p>
        <motion.div
          variants={{ hidden: { rotate: 0 }, visible: { rotate: 180 } }}
          initial="hidden"
          animate={animation}
          className="ml-auto"
        >
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </div>
      <motion.div
        variants={{
          hidden: {
            pointerEvents: "none",
            opacity: 0,
            top: 0,
            height: 0,
          },
          visible: {
            pointerEvents: "auto",
            opacity: 1,
            top: 36,
            height: "auto",
            transition: {
              staggerChildren: 1,
            },
          },
        }}
        initial="hidden"
        animate={animation}
        className="absolute overflow-hidden w-full z-40 py-3 border shadow-md rounded-md bg-background"
      >
        {colors.map((color, index) => (
          <motion.div
            onClick={() => {
              setSelectedColor(color);
              onChange(color);
              animation.start("hidden");
            }}
            variants={{
              hidden: { x: -10, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
            transition={{ delay: 0.1 * index }}
            initial="hidden"
            animate={animation}
            key={color.name}
            className="py-1 px-3 hover:bg-accent"
            role="button"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-6 w-6 rounded-md border"
                style={{ backgroundColor: color.hex }}
              />
              <p className="font-medium text-sm">{color.name}</p>
              {selectedColor?.hex === color.hex && (
                <Check className="h-4 w-4 text-muted-foreground ml-auto" />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.span
        onClick={() => animation.start("hidden")}
        variants={{
          hidden: { display: "none" },
          visible: { display: "block" },
        }}
        initial="hidden"
        animate={animation}
        className="fixed inset-0 z-30"
      />
    </div>
  );
};
