"use client";

import { UserButton } from "@clerk/nextjs";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { DesktopSearch } from "./desktop-search";
import { Logo } from "./logo";
import { MobileSearch } from "./mobile-search";
import { SidebarTrigger } from "./sidebar-trigger";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  return (
    <header className="fixed bg-background z-30 h-[70px] border-b inset-x-0 top-0 shadow-md flex items-center justify-between px-5 sm:px-8 gap-3">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Logo />
      </div>
      <DesktopSearch />
      <MobileSearch />
      <div className="flex items-center gap-3">
        <Button size="sm">Log in</Button>
        <Button size="sm" variant="outline" className="hidden sm:block">
          Register
        </Button>
        <Button variant="ghost" size="icon" className="relative mr-3">
          <IoCartOutline className="h-5 w-5" />
          <div className="absolute top-0 bg-primary text-white text-xs font-semibold right-0 border px-1 translate-x-1/2 rounded-md">
            3
          </div>
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};
