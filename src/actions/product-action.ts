"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { ProductSchema } from "@/schemas";
import * as z from "zod";

export const getProducts = async ({
  filters,
  take = 12,
  page = 1,
  q,
  productId,
  categories,
  wishList,
}: {
  filters?: string[];
  take?: number;
  page?: number;
  q?: string;
  productId?: string;
  categories?: string[];
  wishList?: string[];
} = {}) => {
  const skip = (page - 1) * take;

  const query: any = {
    ...(productId ? { id: { not: productId } } : {}),
    ...(wishList ? { id: { in: wishList } } : {}),
    ...(categories ? { categories: { hasSome: categories } } : {}),
    ...(filters?.length ? { categories: { hasSome: filters } } : {}),
    ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
  };

  const total = await db.product.count({
    where: query,
  });
  const hasMore = page * take < total;

  const products = await db.product.findMany({
    where: query,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      variants: true,
    },
    take,
    skip,
  });

  return { products, hasMore };
};

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
  try {
    const validatedFields = ProductSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const user = await currentUser();

    if (!user?.isAdmin) {
      return { error: "Permission denied" };
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

    const user = await currentUser();

    if (!user?.isAdmin) {
      return { error: "Permission denied" };
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
