import { PageNavigations } from "@/components/page-navigations";
import React from "react";
import { CategoryModalTrigger } from "../../_components/category-modal-trigger";
import { getCategories } from "@/actions/category-action";
import { ChevronRight, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryBox } from "../../_components/category-box";

const CategoriesPage = async () => {
  const categories = await getCategories();
  return (
    <div className="space-y-4">
      <PageNavigations
        links={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
        ]}
        pageLabel="Product Categories"
      />
      <div className="py-3 border rounded-lg shadow-lg flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <CategoryBox key={category.id} category={category} />
          ))}
        </div>
        <CategoryModalTrigger />
      </div>
    </div>
  );
};

export default CategoriesPage;
