"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { CategorySchema } from "@/schemas";

export const getCategories = async () => {
  const categories = await db.category.findMany({
    include: {
      subCategories: {
        include: {
          subCategories: true,
        },
      },
    },
    where: {
      level: 1,
    },
  });
  return categories;
};

export const createCategory = async ({
  values,
}: {
  values: z.infer<typeof CategorySchema>;
}) => {
  try {
    const validatedFields = CategorySchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid category" };
    }

    let sub = null;
    if (values.subCategories?.length) {
      sub = await db.category.findMany({
        where: {
          title: {
            in: values.subCategories,
          },
        },
      });
      const levelOneCategories = sub
        .filter((item) => item.level !== 1)
        .map((item) => item.title);

      if (levelOneCategories.length) {
        await db.category.deleteMany({
          where: {
            title: {
              in: values.subCategories,
            },
          },
        });
      }
    }

    await db.category.create({
      data: {
        title: values.title.toLowerCase(),
        ...(sub
          ? {
              subCategories: {
                createMany: {
                  data: sub.map((item) => ({
                    title: item.title.toLowerCase(),
                    level: 2,
                  })),
                },
              },
            }
          : {}),
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
      data: {
        title: values.title,
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
