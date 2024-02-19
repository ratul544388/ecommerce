"use client";

import { useSheetStore } from "@/hooks/use-sheet-store";
import { cn } from "@/lib/utils";
import { ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

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

  const handleClick = (href?: string) => {
    console.log(href);
    if (href) {
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
      <ItemWrapper
        href={href}
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
      </ItemWrapper>
      {children && (
        <div
          className={cn(
            "h-0 overflow-hidden flex flex-col transition-all duration-300 pointer-events-none"
          )}
          style={
            open
              ? { height: `${children.length * 40}px`, pointerEvents: "auto" }
              : { height: "0px", pointerEvents: "none" }
          }
        >
          {children.map(({ label, href }) => (
            <ItemWrapper
              href={href}
              onClick={() => handleClick(href)}
              key="label"
              className={cn(
                `ml-6 px-3 h-10 flex items-center hover:bg-neutral-200 rounded-md cursor-pointer`,
                pathname === href &&
                  "bg-background text-primary hover:bg-background"
              )}
            >
              {label}
            </ItemWrapper>
          ))}
        </div>
      )}
    </div>
  );
};

const ItemWrapper = ({
  href,
  className,
  children,
  onClick,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <>
      {href ? (
        <Link onClick={onClick} href={href} className={cn(className)}>
          {children}
        </Link>
      ) : (
        <div onClick={onClick} className={cn(className)}>
          {children}
        </div>
      )}
    </>
  );
};
