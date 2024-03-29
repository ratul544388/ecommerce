"use client";

import { Logo } from "@/components/header/logo";
import { adminRoutes } from "@/constants";
import { SidebarItem } from "./sidebar-item";
import { UserButton } from "@clerk/nextjs";

export const Sidebar = () => {
  return (
    <aside className="sticky z-20 hidden md:flex flex-col h-screen inset-y-0 top-0 left-0 min-w-[260px] border-r bg-neutral-100 py-5 px-6 space-y-6">
      <Logo />
      <div className="flex-1">
        {adminRoutes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>
      <UserButton afterSignOutUrl="/" />
    </aside>
  );
};
