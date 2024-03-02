import { currentUser as clerkUser } from "@clerk/nextjs";
import { db } from "./db";

export async function currentUser() {
  const self = await clerkUser();

  if (!self?.id) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      userId: self.id,
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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return user;
}
