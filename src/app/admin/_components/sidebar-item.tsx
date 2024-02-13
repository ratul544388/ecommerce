"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon?: LucideIcon;
  level?: number;
  children?: {
    label: string;
    href: string;
  }[];
}

export const SidebarItem = ({
  label,
  href,
  level = 0,
  icon: Icon,
  children,
}: SidebarItemProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = ({ href, level }: { href?: string; level?: number }) => {
    if (href) {
      router.push(href);
    } else {
      setOpen(!open);
    }
  };
  return (
    <div
      onClick={() => handleClick({ href, level })}
      key={label}
      role="button"
      className={cn("flex select-none flex-col font-medium text-foreground/70")}
      style={{ paddingLeft: `${level * 20}px` }}
    >
      <div
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
      <motion.div
        variants={{ hidden: { height: 0 }, visible: { height: "auto" } }}
        initial="hidden"
        animate={open ? "visible" : "hidden"}
        className="overflow-hidden"
      >
        {children &&
          children.map(({ label, href }) => (
            <SidebarItem
              key={label}
              label={label}
              href={href}
              level={level + 1}
            />
          ))}
      </motion.div>
    </div>
  );
};
