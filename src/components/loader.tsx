"use client";
import { cn } from "@/lib/utils";
import { ImSpinner9 } from "react-icons/im";
export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("h-full flex items-center justify-center", className)}>
      <ImSpinner9 className="h-9 w-9 animate-spin text-primary" />
    </div>
  );
};
