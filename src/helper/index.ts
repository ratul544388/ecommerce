import { Variant } from "@prisma/client";

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
