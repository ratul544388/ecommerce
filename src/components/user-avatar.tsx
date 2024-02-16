"use client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
interface AvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

export const UserAvatar = ({ src, alt, className }: AvatarProps) => {
  const fallback = alt?.split(" ")?.map((word) => word.charAt(0));

  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage
        src={src || "/images/placeholder.jpg"}
        alt={alt}
        className="object-cover"
      />
      {alt && <AvatarFallback>{fallback}</AvatarFallback>}
    </Avatar>
  );
};
