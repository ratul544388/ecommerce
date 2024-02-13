import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { DynamicBluredImage } from "./dynamic-blured-image";
import { buttonVariants } from "./ui/button";

interface ProductCardProps {
  product: Product;
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
          className="group-hover:scale-105 transition-all duration-500"
        />
        <h5 className="text-sm font-semibold text-foreground/80 mt-1">
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
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "ordinary" }), "w-full mt-3")}
      >
        <FaCartArrowDown className="h-4 w-4 mr-2" />
        Buy now
      </Link>
    </div>
  );
};
