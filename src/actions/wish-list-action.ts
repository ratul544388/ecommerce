"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const wishListAction = async (productId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthenticated" };
    }

    const newWishList = user.wishList.includes(productId)
      ? user.wishList.filter((item) => item !== productId)
      : [...user.wishList, productId];

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        wishList: newWishList,
      },
    });

    return { success: "Success" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
