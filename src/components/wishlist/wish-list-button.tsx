"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { TiHeartOutline } from "react-icons/ti";

export const WishListButton = () => {
  return (
    <Link
      href="/wishlist"
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "sm",
        }),
        "hidden sm:flex text-xs font-medium flex-col hover:text-rose-500"
      )}
    >
      <TiHeartOutline className="h-5 w-5 mr-2" />
      Wish List
    </Link>
  );
};
