"use client";

import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
interface ProductsProps {
  loadMore: boolean;
  initialProducts: Product[];
  className?: string;
}

export const Products = ({ initialProducts, loadMore, className }: ProductsProps) => {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <div className={cn("md:pl-[250px] grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
