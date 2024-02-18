import { BuyNowButton } from "@/app/(user)/products/_components/buy-now-button";
import { cn } from "@/lib/utils";
import { Product, Variant } from "@prisma/client";
import Link from "next/link";
import { DynamicBluredImage } from "./dynamic-blured-image";

interface ProductCardProps {
  product: Product & {
    variants: Variant[]
  };
}

export const ProductCard = async ({ product }: ProductCardProps) => {
  return (
    <div className="rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:ring-1 hover:ring-sky-500 group overflow-hidden">
      <Link
        href={`/products/${product.slug}`}
        className="w-full flex flex-col items-center"
      >
        <DynamicBluredImage
          image={product.photos[0]}
          className="group-hover:scale-105 transition-all duration-500 rounded-none"
        />
        <h5 className="text-sm font-semibold text-foreground/80 pt-1 h-[42px] text-center bg-background z-20 w-full">
          {product.name}
        </h5>
        <div className="bg-neutral-800 px-2 py-1 text-white/80 text-xs font-semibold rounded-md mt-1">
          Save 2.9$
        </div>
        <p className="text-xl font-bold mt-2 flex gap-2 ">
          <span
            className={cn(product.offerPrice && "text-rose-500 line-through")}
          >
            ${product.price}{" "}
          </span>
          ${product.offerPrice}
        </p>
      </Link>
      <BuyNowButton product={product} classsName="w-full mt-3"/>
    </div>
  );
};
