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

    if (price === offerPrice) {
      return { error: "Price and offer price cannot be same" };
    }

    if (offerPrice && price < offerPrice) {
      return { error: "Offer price cannot be greater than Regular Price" };
    }

    const existingVariant = await db.variant.findFirst({
      where: {
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

    await db.variant.create({
      data: {
        productId,
        photo,
        size,
        quantity,
        price,
        offerPrice,
        color: color?.hex,
        colorHex: color?.hex,
      },
    });

    return { success: "New Variant was created for this product!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
