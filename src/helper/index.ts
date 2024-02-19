import { db } from "@/lib/db";
import { Product, Variant } from "@prisma/client";

export const getProductVariant = ({
  variants,
  color,
  size,
}: {
  variants: Variant[];
  color?: string[];
  size?: string;
}) => {
  const variant = variants.find((variant) => {
    return variant.color[0] === color?.[0] && variant.size === size;
  });

  return variant;
};

export const getAllCategories = async () => {
  const categories = await db.category.findMany();

  return categories.flatMap((category) => [
    category.title,
    ...category.subCategories,
  ]);
};

export const getProductPrice = ({
  product,
  variant,
}: {
  product: Product;
  variant: Variant | null;
}) => {
  return (
    variant?.offerPrice || variant?.price || product.offerPrice || product.price
  );
};

export const getFormattedText = (text: string) => {
  return text
    .replace(/[_-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
};

export const getFormattedPrice = (value: number) => {
  if (value.toString().includes(".")) {
    return parseFloat(value.toFixed(2));
  }
  return value;
};
