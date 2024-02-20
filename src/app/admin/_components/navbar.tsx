"use client";

import { MobileSidebarTrigger } from "@/components/mobile-sidebar-trigger";
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="h-[60px] z-20 fixed inset-x-0 top-0 bg-background flex items-center justify-between border-b md:hidden px-5">
      <MobileSidebarTrigger className="sm:flex md:hidden" />
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
};
