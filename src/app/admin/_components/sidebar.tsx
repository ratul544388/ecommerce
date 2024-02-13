"use client";

import { Logo } from "@/components/header/logo";
import { adminRoutes } from "@/constants";
import { SidebarItem } from "./sidebar-item";
import { UserButton } from "@clerk/nextjs";

export const Sidebar = () => {
  return (
    <div className="fixed hidden md:flex flex-col h-full inset-y-0 left-0 w-[260px] border-r bg-secondary/70 py-5 px-6 space-y-6">
      <Logo />
      <div className="flex-1">
        {adminRoutes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>
      <UserButton />
    </div>
  );
};
