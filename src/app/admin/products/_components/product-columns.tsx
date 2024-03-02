"use client";

import { Photo } from "@/components/photo";
import { cn } from "@/lib/utils";
import { Product, Variant } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ProductCellAction } from "./product-cell-action";

export const Productcolumns: ColumnDef<Product & { variants: Variant[] }>[] = [
  {
    accessorKey: "photos",
    header: "Photo",
    cell: ({ row }) => {
      return <Photo photo={row.original.photos[0]} className="max-w-[60px]" />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <p>${row.original.price}</p>;
    },
  },
  {
    accessorKey: "offerPrice",
    header: "Offer Price",
    cell: ({ row }) => {
      const offerPrice = row.original.offerPrice;
      return (
        <p className={cn(!offerPrice && "text-muted-foreground")}>
          {offerPrice ? `${offerPrice}` : `Not Available`}
        </p>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      return <ProductCellAction product={row.original} />;
    },
  },
];
