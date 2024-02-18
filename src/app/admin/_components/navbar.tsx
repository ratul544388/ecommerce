"use client";

import { MobileSidebarTrigger } from "@/components/mobile-sidebar-trigger";
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  return (
    <div className="h-[60px] bg-background flex items-center justify-between border-b md:hidden px-5">
      <MobileSidebarTrigger className="sm:flex md:hidden" />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
