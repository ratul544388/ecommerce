"use client";

import { useSheetStore } from "@/hooks/use-sheet-store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: LucideIcon;
  children?: {
    label: string;
    href: string;
  }[];
}

export const SidebarItem = ({
  label,
  href,
  icon: Icon,
  children,
}: SidebarItemProps) => {
  const [open, setOpen] = useState(false);
  const { onClose } = useSheetStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href?: string) => {
    if (href) {
      router.push(href);
      onClose();
    } else {
      setOpen(!open);
    }
  };
  return (
    <div
      key={label}
      role="button"
      className={cn("flex select-none flex-col font-medium text-foreground/70")}
    >
      <div
        onClick={() => handleClick(href)}
        className={cn(
          "flex items-center gap-3 hover:bg-neutral-200 py-2 px-3 rounded-md",
          pathname === href && "bg-background text-primary hover:bg-background"
        )}
      >
        {Icon && <Icon className="h-5 w-5" />}
        {label}
        {!href && (
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 ml-auto transition",
              open && "text-purple-500 rotate-90"
            )}
          />
        )}
      </div>
      {children && (
        <motion.div
          variants={{
            hidden: {
              pointerEvents: "none",
              height: 0,
            },
            visible: {
              pointerEvents: "auto",
              height: "auto",
            },
          }}
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          className="overflow-hidden"
        >
          {children.map(({ label, href }) => (
            <div
              onClick={() => handleClick(href)}
              key="label"
              className="ml-6 px-3 py-2 hover:bg-neutral-200 rounded-md cursor-pointer"
            >
              {label}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
