"use client";

import { OrderCellAction } from "@/app/admin/orders/_components/order-cell-action";
import { Photo } from "@/components/photo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFormattedText, getProductPrice } from "@/helper";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { UserProfile } from "@clerk/nextjs";
import { Order, OrderItem, Product, Variant } from "@prisma/client";
import { format } from "date-fns";
import { Bike } from "lucide-react";

interface OrderItemProps {
  order: Order & {
    orderItems: (OrderItem & {
      product: Product;
      variant: Variant | null;
    })[];
  };
  isAdmin?: boolean;
}

export const OrderItemBox = ({ order, isAdmin }: OrderItemProps) => {
  const { onOpen } = useModal();

  return (
    <div
      key={order.id}
      className="bg-background rounded-lg border shadow-lg p-4 flex flex-col gap-2 text-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-muted-foreground">
          Order No: <span className="text-foreground">{order.orderNo}</span>
        </h3>
        <div className="flex items-center gap-3">
          <p
            className={cn(
              (order.status === "DELIVERY_PENDING" ||
                order.status === "DELIVERED") &&
                "text-green-600",
              order.status === "WAITING_FOR_PAYMENT" && "text-orange-500",
              order.status === "CANCELED" && "text-red-600",
              "font-medium capitalize"
            )}
          >
            {getFormattedText(order.status)}
          </p>
          {isAdmin && <OrderCellAction order={order} />}
        </div>
      </div>
      <div
        className="flex flex-col gap-x-6 gap-y-2 flex-wrap"
        style={{ maxWidth: "calc(100% - 100px)" }}
      >
        <p className="text-muted-foreground text-sm">
          Ordered At:{" "}
          <span className="text-foreground font-semibold">
            {format(order.createdAt, "dd MMM yy, hh:mm a")}
          </span>
        </p>
        {order.status === "DELIVERY_PENDING" && (
          <div className="flex items-center gap-1 font-semibold text-green-600">
            <Bike className="h-3.5 w-3.5" />
            Estimated delivery in 1-3 days
          </div>
        )}
      </div>
      <Separator />
      <div className="space-y-3">
        {order.orderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Photo
              photo={item.variant?.photo || item.product.photos[0]}
              className="max-w-[80px]"
            />
            <div className="space-y-1">
              <h4 className="font-semibold">{item.product.name}</h4>
              {item.variant?.size && (
                <p className="text-muted-foreground capitalize">
                  size:{" "}
                  <span className="text-foreground font-semibold">
                    {item.variant.size}
                  </span>
                </p>
              )}
              {item.variant?.color.length && (
                <p className="text-muted-foreground capitalize">
                  color:{" "}
                  <span className="font-semibold text-foreground">
                    {item.variant.color[0]}
                  </span>
                </p>
              )}
            </div>
            <div className="space-y-1 ml-auto">
              <p className="text-muted-foreground text-sm">
                Price:{" "}
                <span className="text-foreground font-semibold">
                  $
                  {getProductPrice({
                    product: item.product,
                    variant: item?.variant,
                  })}
                </span>
              </p>
              <p className="text-muted-foreground text-sm">
                Qty:{" "}
                <span className="text-foreground font-semibold">
                  {item.quantity}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {order.status === "WAITING_FOR_PAYMENT" && !isAdmin && (
        <div className="flex gap-3 ml-auto mt-3">
          <Button
            onClick={() => onOpen("cancelOrderModal", { orderId: order.id })}
            variant="outline"
          >
            Cancel Order
          </Button>
          <Button
            variant="ordinary"
            onClick={() =>
              onOpen("checkoutModal", { orderItems: order.orderItems })
            }
          >
            Make Payment
          </Button>
        </div>
      )}
    </div>
  );
};
