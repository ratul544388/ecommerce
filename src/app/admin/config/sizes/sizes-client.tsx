"use client";

import { PageNavigations } from "@/components/page-navigations";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { pluralize } from "@/lib/utils";
import { Size } from "@prisma/client";
import { useState } from "react";
import { Actions } from "../../_components/actions";
import { Item } from "../../_components/item";

interface SizesClientProps {
  sizes: Size[];
}

export const SizesClient = ({ sizes }: SizesClientProps) => {
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
        pageLabel="Product sizes"
      />
      <Separator />
      <Actions
        ids={checkedIds}
        addAction={() => onOpen("sizeModal")}
        editAction={() =>
          onOpen("sizeModal", {
            title: `Edit "${sizes[0].title}" Size`,
            size: sizes.find((size) => size.id === checkedIds[0]),
          })
        }
        deleteAction={() =>
          onOpen("deleteSizeModal", {
            ids: checkedIds,
            title: `Delete Seleted ${pluralize(
              "Category",
              "sizes",
              checkedIds.length
            )}`,
            onSuccess: () => setCheckedIds([]),
          })
        }
      />
      <Separator />
      <div className="border rounded-md shadow-md px-2 py-5">
        {sizes.map((item) => (
          <Item
            onCheckChange={onCheckChange}
            key={item.id}
            id={item.id}
            label={item.title}
          />
        ))}
      </div>
    </div>
  );
};
