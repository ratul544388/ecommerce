"use client";

import { cn } from "@/lib/utils";
import { ClipboardSignature } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  actionUrl,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 items-center justify-center mt-20",
        className
      )}
    >
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="font-light text-muted-foreground pb-4 max-w-[350px] text-center">
        {description}
      </p>
      {actionLabel && actionUrl && (
        <Link
          href={actionUrl}
          className={buttonVariants({ variant: "ordinary" })}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
