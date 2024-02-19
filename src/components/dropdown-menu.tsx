"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons/lib";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
interface DropdownMenuProps {
  items: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon | IconType;
    disabled?: boolean;
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
        {items.map(({ label, onClick, icon: Icon, destructive, disabled }) => (
          <div
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            key={label}
            className={cn(
              "flex items-center gap-3 font-medium text-sm px-3 py-1.5 hover:bg-secondary transition-colors cursor-pointer",
              disabled && "pointer-events-none opacity-60",
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
