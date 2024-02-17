import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  console.log("called");
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const orderId = session?.metadata?.orderId;
  const clearCart = session?.metadata?.clearCart;

  if (event.type === "checkout.session.completed") {
    if (!userId || !orderId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }

    if (clearCart === "true") {
      await db.cartItem.deleteMany({
        where: {
          userId,
        },
      });
    }

    const order = await db.order.findUnique({
      where: {
        id: orderId,
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
      return new NextResponse(`Order not found`, {
        status: 400,
      });
    }

    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "DELIVERY_PENDING",
      },
    });

    for (const orderItem of order.orderItems) {
      const quantity = orderItem.quantity;
      await db.product.update({
        where: {
          id: orderItem.productId,
        },
        data: {
          quantity: {
            decrement: quantity,
          },
          ...(orderItem.variant
            ? {
                variants: {
                  update: {
                    where: {
                      id: orderItem.variant.id,
                    },
                    data: {
                      quantity: {
                        decrement: quantity,
                      },
                    },
                  },
                },
              }
            : {}),
        },
      });
    }
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
