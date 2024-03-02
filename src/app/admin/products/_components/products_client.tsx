"use client";

import { PageNavigations } from "@/components/page-navigations";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";
import { Actions } from "../../_components/actions";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { pluralize } from "@/lib/utils";

interface ProductsClientProps {
  products: Product[];
}

export const ProductsClient = ({ products }: ProductsClientProps) => {
  const [productIds, setProductIds] = useState<string[]>([]);
  const { onOpen } = useModal();
  return (
    <div className="space-y-4 px-5">
      <PageNavigations
        links={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
        ]}
        pageLabel="Product Colors"
      />
      <Separator />
      <Actions
        ids={productIds}
        addAction={() => {}}
        editAction={() => {}}
        deleteAction={() =>
          onOpen("deleteColorsModal", {
            ids: productIds,
            title: `Delete Seleted ${pluralize(
              "Product",
              "Products",
              productIds.length
            )}`,
          })
        }
      />
      <Separator />
    </div>
  );
};
