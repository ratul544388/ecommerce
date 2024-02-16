"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  UserButton as ClerkUserButton,
  useClerk,
} from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Button } from "./ui/button";
import { UserAvatar } from "./user-avatar";
import { Heart, ListOrdered, LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserButton = ({
  user,
  className,
  align = "end",
}: {
  user: User;
  className?: string;
  align?: "start" | "end";
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();

  const options = user.isAdmin
    ? [
        {
          label: "Log out",
          onClick: () => signOut(() => router.push("/")),
          icon: LogOut,
        },
      ]
    : [
        {
          label: "Profile",
          onClick: () => router.push("/profile"),
          icon: User2,
        },
        {
          label: "Wishlist",
          onClick: () => router.push("/wishlist"),
          icon: Heart,
          className: "sm:hidden",
        },
        {
          label: "My Orders",
          onClick: () => router.push("/my-orders"),
          icon: ListOrdered,
        },
        {
          label: "Log out",
          onClick: () => signOut(() => router.push("/")),
          icon: LogOut,
        },
      ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 hover:shadow-sm rounded-full"
        >
          <UserAvatar src={user.imageUrl} alt={user.name} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0 py-5 text-sm bg-background shadow-lg rounded-lg"
        align={align}
      >
        <div className="flex items-center gap-3 px-5">
          <UserAvatar
            src={user.imageUrl}
            alt={user.name}
            className="h-12 w-12"
          />
          <div className="">
            <h4 className="font-medium leading-4">{user.name}</h4>
            <span className="line-clamp-1">{user.email}</span>
          </div>
        </div>
        <div className="mt-4">
          {options.map(({ label, icon: Icon, onClick, className }) => (
            <Button
              onClick={() => {
                setOpen(false);
                onClick();
              }}
              key={label}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-4 px-5 py-2.5 rounded-none hover:bg-secondary",
                className
              )}
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              <p className="text-foreground/80 font-medium">{label}</p>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
