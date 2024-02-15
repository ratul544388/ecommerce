"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Product, Variant } from "@prisma/client";
import Stripe from "stripe";

export type OrderItem = {
  product: Product;
  variant?: Variant;
  quantity: number;
};

export type CheckoutType = {
  orderItems: OrderItem[];
  clearCart?: "true" | "false";
};

export const checkout = async ({
  orderItems,
  clearCart = "false",
}: CheckoutType) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthenticated" };
  }

  if (!user.address || user.phone) {
    return { error: "Address or phone number is missing!" };
  }

  const productItems = orderItems.map((item) => ({
    productId: item.product.id,
    variantId: item.variant?.id,
    quantity: item.quantity,
  }));

  const order = await db.order.create({
    data: {
      status: "WAITING_FOR_PAYMENT",
      userId: user.id,
      orderItems: {
        createMany: {
          data: productItems,
        },
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    orderItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: item.product.name,
          images: [item.variant?.photo || item.product.photos[0]],
        },
        unit_amount: Math.floor(
          (item.product.offerPrice || item.product.price) * 100
        ),
      },
    }));

  let stripeCustomer = await db.stripeCustomer.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      stripeCustomerId: true,
    },
  });

  if (!stripeCustomer) {
    const customer = await stripe.customers.create({
      email: user.email as string,
    });

    stripeCustomer = await db.stripeCustomer.create({
      data: {
        userId: user.id,
        stripeCustomerId: customer.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomer.stripeCustomerId,
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/my-orders`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/my-orders`,
    metadata: {
      orderId: order.id,
      userId: user.id,
      clearCart,
    },
  });

  return { url: session.url };
};
