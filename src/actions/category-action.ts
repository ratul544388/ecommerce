"use server";

import * as z from "zod";

import { CategorySchema } from "@/schemas";
import { db } from "@/lib/db";

export const getCategories = async () => {
  const categories = await db.category.findMany();
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

    if (categoryId) {
      const category = await db.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        return { error: "Category not found" };
      }

      const subCategories = [...category.subCategories, values.title];

      await db.category.update({
        where: {
          id: categoryId,
        },
        data: {
          subCategories,
        },
      });
    } else {
      const existingCategory = await db.category.findUnique({
        where: {
          title: values.title,
        },
      });

      if (existingCategory) {
        return { error: "Category already exists" };
      }

      await db.category.create({
        data: {
          ...values,
        },
      });
    }

    return { success: "Category created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    return { success: "Category Deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
