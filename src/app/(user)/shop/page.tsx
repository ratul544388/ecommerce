import { getProducts } from "@/actions/product-action";
import { ProductCard } from "@/components/product-card";
import { db } from "@/lib/db";
import React from "react";

const Page = async () => {
  const products = await getProducts();
  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Page;
