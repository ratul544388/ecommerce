"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  UserButton as ClerkUserButton,
} from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

export const UserButton = () => {
  return (
    <div className="min-w-8">
      <ClerkLoading>
        <Skeleton className="h-8 w-8 rounded-full" />
      </ClerkLoading>
      <ClerkLoaded>
        <ClerkUserButton afterSignOutUrl="/" />
      </ClerkLoaded>
    </div>
  );
};
