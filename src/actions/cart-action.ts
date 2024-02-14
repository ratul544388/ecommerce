"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const cartAction = async ({
  productId,
  variantId,
  quantity,
}: {
  productId: string;
  variantId?: string;
  quantity: number;
}) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthenticated" };
    }

    const existingCart = user.cartItems.find(
      (item) => item.productId === productId
    );

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        cartItems: {
          ...(existingCart
            ? {
                update: {
                  where: {
                    id: existingCart.id,
                  },
                  data: {
                    quantity: existingCart.quantity + quantity,
                  },
                },
              }
            : {
                create: {
                  productId,
                  quantity,
                  variantId,
                },
              }),
        },
      },
      include: {
        cartItems: {
          include: {
            product: {
              include: {
                variants: true,
              },
            },
            variant: true,
          },
        },
      },
    });

    return {
      success: "Product added to the cart",
      cartItems: updatedUser.cartItems,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateCart = async ({
  cartItemId,
  variantId,
}: {
  cartItemId: string;
  variantId: string;
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
              id: cartItemId,
            },
            data: {
              variantId,
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

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        cartItems: {
          delete: {
            id: cartItemId,
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
