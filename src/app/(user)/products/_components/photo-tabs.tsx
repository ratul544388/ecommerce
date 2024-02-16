"use client";

import { Photo } from "@/components/photo";
import { useQueryString } from "@/hooks/use-query-string";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface PhotoTabsProps {
  photos: string[];
  activePhoto: number;
}

export const PhotoTabs = ({ photos, activePhoto }: PhotoTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { handleClick } = useQueryString();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {photos.map((item, index) => (
        <Photo
          onClick={() => handleClick({ key: "photo", value: `${index + 1}` })}
          photo={item}
          key={index}
          className={cn(
            "aspect-square max-w-[40px] cursor-pointer",
            index === activePhoto - 1 && "ring-[1.5px] ring-sky-500"
          )}
        />
      ))}
    </div>
  );
};
