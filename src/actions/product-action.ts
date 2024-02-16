"use server";

import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import * as z from "zod";

export const getProducts = async ({
  filters,
  take = 10,
  page = 1,
}: { filters?: string[]; take?: number; page?: number } = {}) => {
  const skip = (page - 1) * take;

  const products = await db.product.findMany({
    include: {
      variants: true,
    },
    where: {
      ...(filters?.length
        ? {
            categories: {
              hasEvery: filters,
            },
          }
        : {}),
    },
    ...(take ? { take } : {}),
    skip,
  });

  return products;
};

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
  try {
    const validatedFields = ProductSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const slug = values.name.replace(/\s+/g, "-").toLowerCase();

    const product = await db.product.create({
      data: {
        ...values,
        slug,
      },
    });

    return { success: "Product created!", slug: product.slug };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateProduct = async ({
  values,
  productId,
}: {
  values: z.infer<typeof ProductSchema>;
  productId: string;
}) => {
  try {
    const validatedFields = ProductSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const slug = values.name.replace(/\s+/g, "-").toLowerCase();

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...values,
        slug,
      },
    });

    return { success: "Product Updated!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
