"use client";

import { PageNavigations } from "@/components/page-navigations";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { pluralize } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useState } from "react";
import { Actions } from "../../_components/actions";
import { Item } from "../../_components/item";

interface CategoryClientProps {
  categories: Category[];
}

export const CategoryClient = ({ categories }: CategoryClientProps) => {
  const { onOpen } = useModal();
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const onCheckChange = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className="space-y-4 px-5">
      <PageNavigations
        links={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
        ]}
        pageLabel="Product Categories"
      />
      <Separator />
      <Actions
        ids={checkedIds}
        addAction={() =>
          onOpen("categoryModal", {
            categories: categories.map((category) => category.title),
          })
        }
        editAction={() =>
          onOpen("categoryModal", {
            title: `Edit "${categories[0].title}" Category`,
            category: categories.find(
              (category) => category.id === checkedIds[0]
            ),
          })
        }
      deleteAction={() =>
          onOpen("deleteCategoryModal", {
            ids: checkedIds,
            title: `Delete Seleted ${pluralize(
              "Category",
              "Categories",
              checkedIds.length
            )}`,
            onSuccess: () => setCheckedIds([]),
          })
        }
      />
      <Separator />
      <div className="border rounded-md shadow-md px-2 py-5">
        {categories.map((item) => (
          <div key={item.id}>
            <Item
              onCheckChange={onCheckChange}
              key={item.id}
              id={item.id}
              label={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
