"use client";

import { SidebarTrigger } from "@/components/sidebar-trigger";
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  return (
    <div className="h-[60px] bg-background flex items-center justify-between border-b md:hidden px-5">
      <SidebarTrigger />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
