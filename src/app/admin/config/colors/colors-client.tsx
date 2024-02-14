"use client";

import { PageNavigations } from "@/components/page-navigations";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { pluralize } from "@/lib/utils";
import { Color } from "@prisma/client";
import { useState } from "react";
import { Actions } from "../../_components/actions";
import { Item } from "../../_components/item";

interface ColorsClientProps {
  colors: Color[];
}

export const ColorsClient = ({ colors }: ColorsClientProps) => {
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
        pageLabel="Product Colors"
      />
      <Separator />
      <Actions
        ids={checkedIds}
        addAction={() => onOpen("colorModal")}
        editAction={() =>
          onOpen("colorModal", {
            title: `Edit "${colors[0].name}" Category`,
            color: colors.find((color) => color.id === checkedIds[0]),
          })
        }
        deleteAction={() =>
          onOpen("deleteColorsModal", {
            ids: checkedIds,
            title: `Delete Seleted ${pluralize(
              "Color",
              "Colors",
              checkedIds.length
            )}`,
            onSuccess: () => setCheckedIds([]),
          })
        }
      />
      <Separator />
      <div className="border rounded-md shadow-md px-2 py-5">
        {colors.map((item) => (
          <Item
            onCheckChange={onCheckChange}
            key={item.id}
            id={item.id}
            label={item.name}
            color={item.hex}
          />
        ))}
      </div>
    </div>
  );
};
