"use server";
import { currentUser } from "@/lib/current-user";
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

    const user = await currentUser();

    if(!user) {
      return {error: "Permission denied"};
    }

    const { color, size, offerPrice, price } = values;

    if (price && price === offerPrice) {
      return { error: "Price and offer price cannot be same" };
    }

    if (price && offerPrice && price < offerPrice) {
      return { error: "Offer price cannot be greater than Regular Price" };
    }

    const existingVariant = await db.variant.findFirst({
      where: {
        productId,
        size,
        color: {
          equals: color,
        },
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
        ...values,
        productId,
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

    const user = await currentUser();

    if(!user) {
      return {error: "Permission denied"};
    }

    const { color, size, offerPrice, price } = values;

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
        color: {
          equals: color,
        },
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
      data: values,
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

    const user = await currentUser();

    if(!user) {
      return {error: "Permission denied"};
    }

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
