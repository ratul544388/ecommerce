"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const createCart = async ({
  cartId,
  productId,
  variantId,
  quantity,
}: {
  cartId: string;
  productId: string;
  variantId?: string;
  quantity: number;
}) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthenticated" };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        cartItems: {
          create: {
            cartId,
            productId,
            quantity,
            variantId,
          },
        },
      },
    });

    return {
      success: "Product added to the cart",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateCart = async ({
  cartId,
  quantity,
}: {
  cartId: string;
  quantity: number;
}) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthenticated" };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        cartItems: {
          update: {
            where: {
              cartId,
            },
            data: {
              quantity: {
                increment: quantity,
              },
            },
          },
        },
      },
    });

    return {
      success: "Cart Updated",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteCart = async (cartItemId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthenticated" };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        cartItems: {
          delete: {
            cartId: cartItemId,
          },
        },
      },
    });

    return {
      success: "Product Removed from cart",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
