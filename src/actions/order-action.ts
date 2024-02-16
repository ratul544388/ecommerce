"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { CheckoutSchema } from "@/schemas";
import { Product, Variant } from "@prisma/client";
import Stripe from "stripe";

export type OrderItem = {
  product: Product;
  variant?: Variant | null;
  quantity: number;
};

export type CheckoutType = {
  orderItems: OrderItem[];
  clearCart?: "true" | "false";
  phone: string;
  address: string;
};

export const checkout = async ({
  orderItems,
  clearCart = "false",
  phone,
  address,
}: CheckoutType) => {
  const validatedFields = CheckoutSchema.safeParse({ phone, address });
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const user = await currentUser();

  if (!user) {
    return { error: "Unauthenticated" };
  }

  if (!user.address || user.phone) {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        phone,
        address,
      },
    });
  }

  const existingOrder = await db.order.findFirst({
    where: {
      status: "WAITING_FOR_PAYMENT",
      userId: user.id,
    },
  });

  if (existingOrder) {
    await db.order.delete({
      where: {
        id: existingOrder.id,
      },
    });
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

export const cancelOrder = async (orderId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthenticated" };
    }

    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (order?.status === "DELIVERED") {
      return {
        error: "You cannot cancel the order. Order has already been delivered",
      };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        orders: {
          update: {
            where: {
              id: orderId,
            },
            data: {
              status: "CANCELED",
            },
          },
        },
      },
    });

    return { success: "Order canceled" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
