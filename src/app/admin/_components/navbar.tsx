"use client";

import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  return (
    <div className="h-[60px] bg-background flex items-center justify-between border-b md:hidden px-5">
      <MobileSidebar />
      <UserButton />
    </div>
  );
};
