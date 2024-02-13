import { cn } from "@/lib/utils";
import Image from "next/image";

import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";

interface StaticBluredImage {
  image: string;
  className?: string;
  alt?: string;
}

export const StaticBluredImage = async ({
  image,
  className,
  alt = "image",
}: StaticBluredImage) => {
  const buffer = await fs.readFile(`./public${image}`);
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <div
      className={cn(
        "w-full max-w-[80px] overflow-hidden rounded-md relative aspect-square",
        className
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={base64}
      />
    </div>
  );
};
