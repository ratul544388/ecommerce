"use client";
import { CategoryBox } from "@/app/admin/_components/category-box";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
interface SelectProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export const CategorySelect = ({
  categories,
  value,
  onChange,
}: SelectProps) => {
  const animation = useAnimation();

  const handleSelect = (value: string) => {
    onChange(value);
    animation.start("hidden");
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        onClick={() => animation.start("visible")}
        className="w-full"
      >
        <p
          className={cn(
            "text-muted-foreground text-sm",
            value && "text-foreground"
          )}
        >
          {value || "Select category"}
        </p>
        <motion.div
          variants={{ hidden: { rotate: 0 }, visible: { rotate: 180 } }}
          initial="hidden"
          animate={animation}
          className="ml-auto"
        >
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </Button>
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
          },
        }}
        initial="hidden"
        animate={animation}
        className="absolute overflow-hidden w-full z-40 p-3 border shadow-md rounded-md bg-background"
      >
        {categories.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => handleSelect(item.title)}
              variant="ghost"
            >
              {item.title}
            </Button>
            <div className="flex items-center gap-2">
              {item.subCategories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <Button
                    type="button"
                    onClick={() => handleSelect(category)}
                    variant="ghost"
                  >
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </div>
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
