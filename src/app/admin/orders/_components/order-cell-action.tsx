"use client";

import { DropdownMenu } from "@/components/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Order } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImCancelCircle } from "react-icons/im";
import { TbListDetails, TbTruckDelivery } from "react-icons/tb";

interface OrderCellAction {
  order: Order;
}

export const OrderCellAction = ({ order }: OrderCellAction) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const dropdownMenuTrigger = (
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4 text-muted-foreground" />
    </Button>
  );

  const disabled = order.status === "CANCELED" || order.status === "DELIVERED";

  return (
    <DropdownMenu
      trigger={dropdownMenuTrigger}
      items={[
        {
          label: "Order Details",
          icon: TbListDetails,
          onClick: () => router.push(`/admin/orders/${order.id}`),
        },
        {
          label: "Mark as Delivered",
          icon: TbTruckDelivery,
          onClick: () => onOpen("deliverOrderModal", { id: order.id }),
          disabled,
        },
        {
          label: "Cancel Order",
          icon: ImCancelCircle,
          onClick: () => onOpen("cancelOrderModal", { id: order.id }),
          destructive: true,
          disabled,
        },
      ]}
    />
  );
};
