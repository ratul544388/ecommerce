"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { IoCartOutline } from "react-icons/io5";
import { Button, buttonVariants } from "../ui/button";
import { DesktopSearch } from "./desktop-search";
import { Logo } from "./logo";
import { MobileSearch } from "./mobile-search";
import { SidebarTrigger } from "./sidebar-trigger";
import { User } from "@prisma/client";
import { TiHeartOutline } from "react-icons/ti";
import Link from "next/link";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface HeaderProps {
  user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRedirectToAuthPage = (path: "/sign-in" | "/sign-up") => {
    const currentQuery = qs.parse(searchParams.toString());
    const url = qs.stringifyUrl(
      {
        url: path,
        query: {
          redirect_url: pathname,
          ...currentQuery,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  return (
    <header className="fixed bg-background z-30 h-[70px] border-b inset-x-0 top-0 shadow-md flex items-center justify-between px-5 sm:px-8 gap-3">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Logo />
      </div>
      <DesktopSearch />
      <MobileSearch />
      <div className="flex items-center gap-3">
        {!user && (
          <>
            <Button
              onClick={() => handleRedirectToAuthPage("/sign-in")}
              size="sm"
            >
              Sign in
            </Button>
            <Button
              onClick={() => handleRedirectToAuthPage("/sign-up")}
              size="sm"
              variant="outline"
              className="hidden sm:block"
            >
              Register
            </Button>
          </>
        )}
        {user && (
          <>
            <Link
              href="/wishlist"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-xs font-medium flex flex-col hover:text-rose-500"
              )}
            >
              <TiHeartOutline className="h-5 w-5 mr-2" />
              Wish List
            </Link>
            <Button variant="ghost" size="icon" className="relative mr-3">
              <IoCartOutline className="h-5 w-5" />
              <div className="absolute top-0 bg-primary text-white text-xs font-semibold right-0 border px-1 translate-x-1/2 rounded-md">
                3
              </div>
            </Button>
          </>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};
