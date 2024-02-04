"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormWrapperProps {
  children: ReactNode;
  className?: string;
}

export const FormWrapper = ({ className, children }: FormWrapperProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-screen-lg bg-background shadow-lg border rounded-lg mx-auto p-5 flex flex-col space-y-3",
        className
      )}
    >
      {children}
    </div>
  );
};
