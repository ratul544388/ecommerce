"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { CategorySchema } from "@/schemas";
import { currentUser } from "@/lib/current-user";

export const getCategories = async () => {
  const categories = await db.category.findMany();
  return categories;
};

export const createCategory = async ({
  values,
  subCategories,
}: {
  values: z.infer<typeof CategorySchema>;
  subCategories: string[];
}) => {
  try {
    const validatedFields = CategorySchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid category" };
    }

    const user = await currentUser();

    if(!user) {
      return {error: "Permission denied"};
    }

    await db.category.create({
      data: {
        ...values,
        subCategories,
      },
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
  subCategories,
}: {
  values: z.infer<typeof CategorySchema>;
  categoryId: string;
  subCategories: string[];
}) => {
  try {
    const validatedFields = CategorySchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid category" };
    }

    const user = await currentUser();

    if (!user) {
      return { error: "Permission denied" };
    }

    await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...values,
        subCategories,
      },
    });

    return { success: "Category Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteCategory = async (categoryIds: string[]) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Permission denied" };
    }

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
