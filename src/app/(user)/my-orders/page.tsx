import { PageNavigations } from "@/components/page-navigations";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import React from "react";
import { OrderItemBox } from "./_components/order-item";

const MyOrderPage = async () => {
  const user = await currentUser();

  const orders = await db.order.findMany({
    where: {
      userId: user?.id,
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

  return (
    <div className="space-y-5">
      <PageNavigations
        links={[{ label: "Home", href: "/" }]}
        pageLabel="My Orders"
      />
      <section className="space-y-5">
        {orders.map((order) => (
          <OrderItemBox order={order} key={order.id} />
        ))}
      </section>
    </div>
  );
};

export default MyOrderPage;
