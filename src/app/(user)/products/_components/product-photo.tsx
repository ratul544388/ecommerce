"use client";

import { Photo } from "@/components/photo";
import { useProductSelectionStore } from "@/hooks/use-product-selection-store";

interface ProductPhotoProps {
  photos: string[];
}

export const ProductPhoto = ({ photos }: ProductPhotoProps) => {
  const { photo } = useProductSelectionStore();
  return (
    <Photo photo={photo || photos[0]} className="aspect-[7/8] max-w-full" />
  );
};
