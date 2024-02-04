"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface ImagePreviewProps {
  images: string[];
  onRemove: (value: string[]) => void;
}

export const ImagesPreview = ({ images, onRemove }: ImagePreviewProps) => {
  if (!images.length) return null;

  const handleRemove = (image: string) => {
    onRemove(images.filter((item) => item !== image));
  };

  return (
    <div className="flex items-center flex-wrap gap-3">
      {images.map((image) => (
        <div
          key={image}
          className="h-[100px] relative aspect-square rounded-md overflow-hidden"
        >
          <Image src={image} alt="image" fill className="object-cover" />
          <Button
            type="button"
            onClick={() => handleRemove(image)}
            className="h-7 w-7 absolute top-1 right-1"
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
