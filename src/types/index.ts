import {
  CartItem,
  Product,
  User,
  Variant,
  Order,
  OrderItem,
} from "@prisma/client";

export type UserWithCart = User & {
  cartItems: (CartItem & {
    product: Product & {
      variants: Variant[];
    };
    variant: Variant | null;
  })[];
};

export type FullOrderType = Order & {
  orderItems: (OrderItem & {
    product: Product;
    variant: Variant | null;
  })[];
  user: User;
};
