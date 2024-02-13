"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhotoProps {
  photo: string;
  className?: string;
  alt?: string;
}

export const Photo = ({ photo, className, alt = "photo" }: PhotoProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[80px] overflow-hidden rounded-md relative aspect-square",
        className
      )}
    >
      <Image src={photo} alt={alt} fill className="object-cover" />
    </div>
  );
};
