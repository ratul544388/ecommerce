"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children?: ReactNode;
}

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-5 sm:px-8", className)}>
      {children}
    </div>
  );
};
