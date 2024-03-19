"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  element?: "section" | "div";
}

export const Container = ({
  children,
  className,
  element = "div",
}: ContainerProps) => {
  return element === "section" ? (
    <section
      className={cn(
        "mx-auto px-4 xs:px-8 md:px-10 w-full max-w-screen-xl",
        className
      )}
    >
      {children}
    </section>
  ) : (
    <div
      className={cn(
        "mx-auto px-4 xs:px-8 md:px-10 w-full max-w-screen-xl",
        className
      )}
    >
      {children}
    </div>
  );
};
