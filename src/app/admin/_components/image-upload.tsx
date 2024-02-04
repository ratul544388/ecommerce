"use client";

import { Button } from "@/components/ui/button";
import { ImagePlusIcon } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { useEffect } from "react";

interface ImageUploadProps {
  onUpload: (value: string) => void;
}

export const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const onClose = () => {
    console.log("triggered");
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 500);
  };

  return (
    <div className="border w-[100px] aspect-square rounded-md flex items-center justify-center border-dashed">
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
    </div>
  );
};
