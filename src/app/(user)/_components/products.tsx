"use client";

import { getProducts } from "@/actions/product-action";
import { EmptyState } from "@/components/empty-state";
import { Loader } from "@/components/loader";
import { Product, User } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "./product-card";

interface ProductsProps {
  initialProducts: Product[];
  initialHasMore: boolean;
  user: User | null;
  wishList?: string[];
}

export const Products = ({
  initialProducts,
  initialHasMore,
  user,
  wishList,
}: ProductsProps) => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(2);
  const { inView, ref } = useInView();

  useEffect(() => {
    const fetchProducts = async () => {
      const { products, hasMore } = await getProducts({ page, wishList });
      setProducts((prev) => [...prev, ...products]);
      setHasMore(hasMore);
      setPage((prev) => prev + 1);
    };
    if (inView && hasMore) {
      fetchProducts();
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setProducts(initialProducts);
    setHasMore(initialHasMore);
  }, [searchParams, initialProducts, initialHasMore]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} user={user} />
        ))}
      </div>
      <span ref={ref} />
      {hasMore ? (
        <Loader className="mx-auto" />
      ) : (
        <EmptyState description="No more products found" className="mt-0" />
      )}
    </div>
  );
};
