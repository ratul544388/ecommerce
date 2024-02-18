"use client";

import { Photo } from "@/components/photo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImagePlusIcon, X } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";

interface ImageUploadProps {
  onUpload: (value: string) => void;
  value?: string;
  onRemove?: (value: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  onUpload,
  value,
  onRemove,
  disabled
}: ImageUploadProps) => {
  const onClose = () => {
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 500);
  };

  return (
    <div className={cn("border w-[100px] aspect-square rounded-md flex items-center justify-center border-dashed", disabled && "opacity-60 pointer-events-none")}>
      {value ? (
        <div className="relative w-full h-full">
          <Photo photo={value} className="aspect-square" />
          <Button
            onClick={() => onRemove?.("")}
            type="button"
            className="h-6 w-6 rounded-full z-20 absolute top-1 right-1"
            size="icon"
            variant="secondary"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          asChild
          variant="secondary"
          size="icon"
          className="overflow-hidden"
        >
          <div className="">
            <CldUploadButton
              onSuccess={onClose}
              uploadPreset="ecommerce"
              className="opacity-0"
              onUpload={(result) => {
                //@ts-ignore
                onUpload(result.info.secure_url);
              }}
            />
            <ImagePlusIcon className="h-8 w-8 text-muted-foreground absolute pointer-events-none" />
          </div>
        </Button>
      )}
    </div>
  );
};
