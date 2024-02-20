import { OrderItemBox } from "@/app/(user)/my-orders/_components/order-item";
import { PageNavigations } from "@/components/page-navigations";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { orderId: string } }) => {
  const order = await db.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <PageNavigations
        links={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Orders",
            href: "/admin/orders",
          },
        ]}
        pageLabel={`Order No: ${order.orderNo}`}
      />
      <Separator />
      <OrderItemBox order={order} isAdmin />
    </div>
  );
};

export default Page;
