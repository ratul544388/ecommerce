"use client";

import { Category } from "@prisma/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FilterItem } from "./filter-item";

interface FiltersProps {
  categories: Category[];
}

export const Filters = ({ categories }: FiltersProps) => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<string[]>(
    searchParams.get("filters")?.split(" ") || []
  );

  return (
    <div className="space-y-3">
      {categories.map(({ title, subCategories }) => (
        <div key={title} className="space-y-3">
          <FilterItem
            label={title}
          />
          {subCategories.map((item) => (
            <FilterItem
              label={item}
              key={item}
              level={1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
