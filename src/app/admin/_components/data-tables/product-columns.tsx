"use client";

import { Photo } from "@/components/photo";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Product, Variant } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ProductCellAction } from "./product-cell-action";

export const Productcolumns: ColumnDef<Product & { variants: Variant[] }>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "photos",
    header: "Photo",
    cell: ({ row }) => {
      return <Photo photo={row.original.photos[0]} />;
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
          ${offerPrice ? offerPrice : `Not Available`}
        </p>
      );
    },
  },
  // {
  //   accessorKey: "variants",
  //   header: "Colors",
  //   cell: ({ row }) => {
  //     const colors = row.original.variants.map((item) => item.colorHex);
  //     return (
  //       <p className={cn(!colors.length && "text-muted-foreground")}>
  //         {colors.length ? (
  //           <div className="flex items-center gap-2">
  //             {colors.map((color) => (
  //               <span
  //                 key={color}
  //                 className="h-6 w-6 rounded-sm"
  //                 style={{ backgroundColor: color as string }}
  //               />
  //             ))}
  //           </div>
  //         ) : (
  //           `Not Available`
  //         )}
  //       </p>
  //     );
  //   },
  // },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      return <ProductCellAction product={row.original} />;
    },
  },
];
