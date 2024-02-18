"use client";

import { CategoryHero } from "@prisma/client";
import { CategoryHeroForm } from "./category-hero-form";
import { useState } from "react";

interface CategoryHerosProps {
  categories: string[];
  categoryHeros: CategoryHero[];
}

export const CategoryHeros = ({
  categories,
  categoryHeros,
}: CategoryHerosProps) => {
  const [editingFormId, setEditingFormId] = useState<string>();

  return (
    <div>
      {categoryHeros.map((item) => (
        <CategoryHeroForm
          key={item.id}
          categories={categories}
          categoryHero={item}
          isEditing={!!editingFormId}
          onChange={(value) =>
            editingFormId ? setEditingFormId("") : setEditingFormId(value)
          }
        />
      ))}
      <CategoryHeroForm categories={categories} isEditing />
    </div>
  );
};
