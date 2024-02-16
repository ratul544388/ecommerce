"use client";

import { categories } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FilterItem } from "./filter-item";

interface FiltersProps {}

export const Filters = ({}: FiltersProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<string[]>(
    searchParams.get("filters")?.split(" ") || []
  );
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/shop") {
      return;
    }
    if (filters.length) {
      router.push(`/shop?filters=${filters.join("+")}`);
    } else {
      router.push("/shop");
    }
  }, [filters, router, pathname]);

  return (
    <div className="space-y-3">
      {categories.map(({ title, subCategories }) => (
        <div key={title} className="space-y-3">
          <FilterItem
            label={title}
            filters={filters}
            onChange={(value) => setFilters(value)}
          />
          {subCategories.map(({ title }) => (
            <FilterItem
              label={title}
              filters={filters}
              key={title}
              level={1}
              onChange={(value) => setFilters(value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
