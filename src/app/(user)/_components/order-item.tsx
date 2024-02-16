"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Photo } from "@/components/photo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
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
}

export const OrderItemBox = ({ order }: OrderItemProps) => {
  const { onOpen } = useModal();

  return (
    <div
      key={order.id}
      className="bg-background rounded-lg border shadow-lg p-4 flex flex-col gap-2 text-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold">Order ID: {order.id.slice(-6)}</h3>
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
          {order.status.replace(/_/g, " ").toLowerCase()}
        </p>
      </div>
      <div
        className="flex flex-col gap-x-6 gap-y-2 flex-wrap"
        style={{ maxWidth: "calc(100% - 100px)" }}
      >
        <p className="text-muted-foreground text-sm">
          Order date:{" "}
          <span className="text-foreground font-semibold">
            {format(order.createdAt, "dd MMM yyyy")}
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
              <h4 className="font-bold">${item.product.price}</h4>
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
      {order.status === "WAITING_FOR_PAYMENT" && (
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
