"use client";

import { Logo } from "@/components/header/logo";
import { Sheet } from "@/components/sheet";
import { adminRoutes } from "@/constants";
import { Menu } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export const MobileSidebar = () => {
  const trigger = <Menu className="h-6 w-6 text-muted-foreground" />;
  return (
    <Sheet trigger={trigger}>
      <Logo />
      <div className="mt-5">
        {adminRoutes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>
    </Sheet>
  );
};
