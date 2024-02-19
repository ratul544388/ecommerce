"use client";

import { UserAvatar } from "@/components/user-avatar";
import { getFormattedText, getProductPrice } from "@/helper";
import { FullOrderType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { OrderCellAction } from "./order-cell-action";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const OrderColumns: ColumnDef<FullOrderType>[] = [
  {
    accessorKey: "orderNo",
    header: "Order No",
    cell: ({ row }) => {
      const orderNo = row.original.orderNo;
      return orderNo < 10 ? `0${orderNo}` : orderNo;
    },
  },
  {
    accessorKey: "userId",
    header: "Order by",
    cell: ({ row }) => {
      const { name, imageUrl } = row.original.user;
      return (
        <div className="flex items-center gap-3">
          <UserAvatar src={imageUrl} alt={name} />
          <h5 className="text-sm font-medium">{name}</h5>
        </div>
      );
    },
  },
  {
    accessorKey: "userId",
    header: "Phone",
    cell: ({ row }) => {
      return `${row.original.user.phone}`;
    },
  },
  {
    accessorKey: "userId",
    header: "Address",
    cell: ({ row }) => {
      return `${row.original.user.address}`;
    },
  },
  {
    accessorKey: "orderItems",
    header: "Amount",
    cell: ({ row }) => {
      const total = row.original.orderItems.reduce((total, item) => {
        return (total += getProductPrice({
          product: item.product,
          variant: item.variant,
        }));
      }, 0);
      return `$${total}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <p
          className={cn(
            "font-semibold",
            status === "DELIVERED" && "text-green-500",
            status === "CANCELED" && "text-red-600",
            status === "DELIVERY_PENDING" && "text-orange-500"
          )}
        >
          {getFormattedText(row.original.status)}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ordered At",
    cell: ({ row }) => {
      return format(row.original.createdAt, "dd MMM yy, hh:mm a");
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      return <OrderCellAction order={row.original} />;
    },
  },
];
