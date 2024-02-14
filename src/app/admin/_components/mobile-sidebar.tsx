"use client";

import { Logo } from "@/components/header/logo";
import { Sheet } from "@/components/sheet";
import { adminRoutes } from "@/constants";
import { useSheetStore } from "@/hooks/use-sheet-store";
import { SidebarItem } from "./sidebar-item";

export const MobileSidebar = () => {
  const { isOpen, type } = useSheetStore();
  return (
    <Sheet open={isOpen && type === "sidebar"}>
      <Logo />
      <div className="mt-5">
        {adminRoutes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>
    </Sheet>
  );
};
