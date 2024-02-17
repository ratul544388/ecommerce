"use client";

import { Photo } from "@/components/photo";
import { useProductSelectionStore } from "@/hooks/use-product-selection-store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface PhotoTabsProps {
  photos: string[];
}

export const PhotoTabs = ({ photos }: PhotoTabsProps) => {
  const { photo, setPhoto } = useProductSelectionStore();

  useEffect(() => {
    setPhoto(photos[0]);
  }, [photos, setPhoto]);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {photos.map((item, index) => (
        <Photo
          onClick={() => setPhoto(item)}
          photo={item}
          key={index}
          className={cn(
            "aspect-square max-w-[40px] cursor-pointer",
            photo === item && "ring-[1.5px] ring-sky-500"
          )}
        />
      ))}
    </div>
  );
};
