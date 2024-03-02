"use client";

import { Photo } from "@/components/photo";
import { getFormattedPrice } from "@/helper";
import { Product, User } from "@prisma/client";
import Link from "next/link";
import { HeartButton } from "../products/_components/heart-button";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  product: Product;
  user: User | null;
}

export const ProductCard = ({ product, user }: ProductCardProps) => {
  const { price, offerPrice } = product;

  const discount = offerPrice && ((price - offerPrice) / price) * 100;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="relative w-full flex flex-col pb-3 items-center border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.3)] group overflow-hidden"
    >
      <Photo
        photo={product.photos[0]}
        className="group-hover:scale-105 transition-all duration-500 rounded-none"
      />
      <h5 className="text-sm px-3 font-semibold text-foreground/80 h-[45px] pt-2 bg-background z-20 w-full line-clamp-2">
        {product.name}
      </h5>
      <p className="font-medium mt-3 flex gap-2">
        <span className="line-through text-muted-foreground font-medium">
          ${price}
        </span>
        {offerPrice && (
          <span className="font-semibold text-foreground">${offerPrice}</span>
        )}
      </p>
      {discount && (
        <p className="text-green-600 text-xs font-bold mt-1">
          {getFormattedPrice(discount)}% off
        </p>
      )}
      <HeartButton user={user} productId={product.id} />
    </Link>
  );
};
