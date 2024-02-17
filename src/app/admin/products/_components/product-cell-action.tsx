"use client";

import { DropdownMenu } from "@/components/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCellActionProps {
  product: Product;
}

export const ProductCellAction = ({ product }: ProductCellActionProps) => {
  const router = useRouter();
  const dropdownMenuTrigger = (
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4 text-muted-foreground" />
    </Button>
  );

  return (
    <DropdownMenu
      trigger={dropdownMenuTrigger}
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
