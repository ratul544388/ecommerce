import { getCategories } from "@/actions/category-action";
import { ProductForm } from "@/app/admin/products/_components/product-form";
import { PageNavigations } from "@/components/page-navigations";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

const ProductUpdatePage = async ({ params }: { params: { slug: string } }) => {
  const product = await db.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      variants: true,
    },
  });
  
  
  if (!product) {
    notFound();
  }
  
  const categories = await getCategories();
  const colors = await db.color.findMany();
  const sizes = await db.size.findMany();

  return (
    <div className="space-y-4">
      <PageNavigations
        pageLabel={`Update - ${product.name}`}
        links={[
          {
            label: "Products",
            href: "/admin/products",
          },
        ]}
      />
      <ProductForm
        categories={categories}
        product={product}
        colors={colors}
        sizes={sizes}
      />
    </div>
  );
};

export default ProductUpdatePage;
