import getBase64 from "@/lib/getLocalBase64";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DynamicBluredImageProps {
  image: string;
  className?: string;
  alt?: string;
}

export const DynamicBluredImage = async ({
  image,
  className,
  alt = "image",
}: DynamicBluredImageProps) => {
  const blurDataUrl = await getBase64(image);
  return (
    <div
      className={cn(
        "w-full border overflow-hidden rounded-md relative aspect-square",
        className
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={blurDataUrl}
      />
    </div>
  );
};
