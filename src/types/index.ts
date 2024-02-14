import { CartItem, Product, User, Variant } from "@prisma/client";

export type UserWithCart = User & {
  cartItems: (CartItem & {
    product: Product & {
      variants: Variant[];
    };
    variant: Variant | null;
  })[];
};
