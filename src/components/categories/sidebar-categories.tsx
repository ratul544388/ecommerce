"use client";

import { categories } from "@/constants";
import { ScrollArea } from "../ui/scroll-area";
import { CategoryItem } from "./category-item";

interface SidebarCategoriesProps {}

export const SidebarCategories = ({}: SidebarCategoriesProps) => {

  return (
    <div className="fixed w-[250px] inset-y-0 border-r left-0 md:block hidden">
      <ScrollArea className="w-[250px] h-[100vh]">
        <div className="pt-[90px] space-y-3 px-8">
          {categories.map(({ title, subCategories }) => (
            <div key={title} className="space-y-3">
              <CategoryItem title={title} />
              {subCategories.map(({ title }) => (
                <CategoryItem title={title} key={title} level={1} />
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
