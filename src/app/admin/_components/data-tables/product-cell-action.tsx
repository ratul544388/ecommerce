"use client";

import { DropdownMenu } from "@/components/dropdown-menu";
import { Product } from "@prisma/client";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCellActionProps {
  product: Product;
}

export const ProductCellAction = ({ product }: ProductCellActionProps) => {
  const router = useRouter();

  return (
    <DropdownMenu
      items={[
        {
          label: "Edit Product",
          icon: Edit,
          onClick: () => router.push(`/admin/products/${product.slug}/update`),
        },
        {
          label: "Delete Product",
          icon: Trash2,
          onClick: () => {},
          destructive: true,
        },
      ]}
    />
  );
};
