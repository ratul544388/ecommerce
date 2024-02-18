import { PageNavigations } from "@/components/page-navigations";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { CategoryHeros } from "./_components/category-heros";
import { db } from "@/lib/db";
import { getAllCategories } from "@/helper";

const Page = async () => {
  const categoryHeros = await db.categoryHero.findMany();
  const categories = await getAllCategories();
  return (
    <div className="space-y-4">
      <PageNavigations
        links={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
        ]}
        pageLabel="Category Hero"
      />
      <Separator />
      <CategoryHeros categories={categories} categoryHeros={categoryHeros} />
    </div>
  );
};

export default Page;
