"use client";
import { ImSpinner9 } from "react-icons/im";
export const Loader = () => {
  return (
    <div className="fixed inset-0 z-20 bg-background flex items-center justify-center">
      <ImSpinner9 className="h-9 w-9 animate-spin text-primary" />
    </div>
  );
};
