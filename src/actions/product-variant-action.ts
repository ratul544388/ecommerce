"use server";
import { db } from "@/lib/db";
import { variantSchema } from "@/schemas";
import * as z from "zod";

export const createProductVariant = async ({
  values,
  productId,
}: {
  values: z.infer<typeof variantSchema>;
  productId: string;
}) => {
  try {
    const validatedFields = variantSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { photo, color, quantity, size, offerPrice, price } = values;

    if (price && price === offerPrice) {
      return { error: "Price and offer price cannot be same" };
    }

    if (price && offerPrice && price < offerPrice) {
      return { error: "Offer price cannot be greater than Regular Price" };
    }

    const existingVariant = await db.variant.findFirst({
      where: {
        color: color?.name,
        colorHex: color?.hex,
        size,
      },
    });

    if (color && size && existingVariant) {
      return {
        error:
          "Same color and size already exist in other variant of this product",
      };
    }

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: true,
      },
    });

    if (!product) {
      return { error: "product not found" };
    }

    const existingQuantity = product.variants.reduce((total, variant) => {
      return total + variant.quantity;
    }, 0);

    if (product.quantity < existingQuantity + values.quantity) {
      return {
        error: `Quantity Limit exceeded. Quantity left: ${
          product.quantity - existingQuantity
        }`,
      };
    }

    await db.variant.create({
      data: {
        productId,
        photo,
        size,
        quantity,
        price,
        offerPrice,
        color: color?.name,
        colorHex: color?.hex,
      },
    });

    return { success: "New Variant was created for this product!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateProductVariant = async ({
  values,
  variantId,
  productId,
}: {
  values: z.infer<typeof variantSchema>;
  variantId: string;
  productId: string;
}) => {
  try {
    const validatedFields = variantSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { photo, color, quantity, size, offerPrice, price } = values;

    if (price && price === offerPrice) {
      return { error: "Price and offer price cannot be same" };
    }

    if (price && offerPrice && price < offerPrice) {
      return { error: "Offer price cannot be greater than Regular Price" };
    }

    const existingVariant = await db.variant.findFirst({
      where: {
        id: {
          not: variantId,
        },
        color: color?.name,
        colorHex: color?.hex,
        size,
      },
    });

    if (existingVariant) {
      return {
        error:
          "Same color and size already exist in other variant of this product",
      };
    }

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: true,
      },
    });

    if (!product) {
      return { error: "product not found" };
    }

    const existingQuantity = product.variants.reduce((total, variant) => {
      if (variant.id === variantId) {
        return 0;
      }
      return total + variant.quantity;
    }, 0);

    if (product.quantity < existingQuantity + values.quantity) {
      return {
        error: `Quantity Limit exceeded. Quantity left: ${
          product.quantity - existingQuantity
        }`,
      };
    }

    await db.variant.update({
      where: {
        id: variantId,
      },
      data: {
        photo,
        size,
        quantity,
        price,
        offerPrice,
        color: color?.name,
        colorHex: color?.hex,
      },
    });

    return { success: "Variant Updated!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteProductVariant = async ({
  variantId,
}: {
  variantId: string;
}) => {
  try {
    await db.variant.delete({
      where: {
        id: variantId,
      },
    });

    return { success: "Variant Deleted!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
