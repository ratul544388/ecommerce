"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { LucideIcon, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";
interface DropdownMenuProps {
  items: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
    destructive?: boolean;
  }[];
}

export const DropdownMenu = ({ items }: DropdownMenuProps) => {
  const animation = useAnimation();
  return (
    <>
      <div className="relative w-fit">
        <Button
          onClick={() => animation.start("visible")}
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
        <motion.div
          variants={{
            hidden: {
              height: 0,
              width: 0,
              opacity: 0,
              pointerEvents: "none",
            },
            visible: {
              height: "auto",
              width: "auto",
              opacity: 1,
              pointerEvents: "auto",
            },
          }}
          initial="hidden"
          animate={animation}
          className="absolute overflow-hidden bg-background  border rounded-md z-[60] right-0  top-[100%]"
        >
          {items.map(({ label, onClick, icon: Icon, destructive }) => (
            <div
              role="button"
              onClick={() => {
                animation.start("hidden");
                onClick();
              }}
              key={label}
              className={cn(
                "flex font-medium whitespace-nowrap text-foreground/70 items-center gap-3 px-4 py-1.5 hover:bg-accent",
                destructive && "bg-red-500/10 text-red-600 hover:bg-red-500/20"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div
        onClick={() => animation.start("hidden")}
        variants={{
          hidden: { display: "none" },
          visible: { display: "block" },
        }}
        initial="hidden"
        animate={animation}
        className="fixed inset-0 z-50"
      />
    </>
  );
};
