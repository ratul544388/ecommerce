"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { LucideIcon, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
interface DropdownMenuProps {
  items: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
    destructive?: boolean;
  }[];
  trigger: ReactNode;
  align?: "start" | "end";
}

export const DropdownMenu = ({
  items,
  trigger,
  align = "end",
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="p-0 py-1 w-fit min-w-[150px]" align={align}>
        {items.map(({ label, onClick, icon: Icon, destructive }) => (
          <div
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            key={label}
            className={cn(
              "flex items-center gap-3 font-medium text-sm px-3 py-1.5 hover:bg-secondary transition-colors cursor-pointer",
              destructive &&
                "text-red-500 hover:bg-red-500/10 hover:text-red-500"
            )}
          >
            {Icon && (
              <Icon
                className={cn(
                  "h-4 w-4 text-muted-foreground",
                  destructive && "text-red-500/80"
                )}
              />
            )}
            {label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
