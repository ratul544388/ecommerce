import { FormWrapper } from "@/components/form-wrapper";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageNavigations } from "@/components/page-navigations";
import React from "react";
import { ProductForm } from "../_components/product-form";
import { db } from "@/lib/db";

const NewProductPage = async () => {
  const categories = await db.category.findMany();
  return (
    <div className="space-y-5">
      <PageNavigations
        links={[
          {
            label: "Products",
            href: "/products",
          },
        ]}
        pageLabel="New"
      />
      <ProductForm categories={categories} />
    </div>
  );
};

export default NewProductPage;
