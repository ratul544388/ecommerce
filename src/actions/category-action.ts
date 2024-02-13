"use server";

import * as z from "zod";

import { CategorySchema } from "@/schemas";
import { db } from "@/lib/db";

export const getCategories = async () => {
  const categories = await db.category.findMany({});
  return categories;
};

export const createCategory = async ({
  values,
  categoryId,
}: {
  values: z.infer<typeof CategorySchema>;
  categoryId?: string;
}) => {
  try {
    const validatedFields = CategorySchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid category" };
    }

    await db.category.create({
      data: values,
    });

    return { success: "Category created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateCategory = async ({
  values,
  categoryId,
}: {
  values: z.infer<typeof CategorySchema>;
  categoryId: string;
}) => {
  try {
    const validatedFields = CategorySchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid category" };
    }

    await db.category.update({
      where: {
        id: categoryId,
      },
      data: values,
    });

    return { success: "Category Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteCategory = async (categoryIds: string[]) => {
  try {
    await db.category.deleteMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    return {
      success:
        categoryIds.length === 1 ? "Category Deleted" : "Categories Deleted",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
