"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhotoProps {
  photo: string;
  className?: string;
  alt?: string;
  onClick?: () => void;
}

export const Photo = ({
  photo,
  className,
  alt = "photo",
  onClick,
}: PhotoProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full overflow-hidden rounded-md relative aspect-square",
        className
      )}
    >
      <Image src={photo} alt={alt} fill className="object-cover" />
    </div>
  );
};
