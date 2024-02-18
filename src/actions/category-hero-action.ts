"use server";
import * as z from "zod";

import { db } from "@/lib/db";
import { CategoryHeroSchema } from "@/schemas";
import { currentUser } from "@/lib/current-user";

export const createHeroCategory = async (
  values: z.infer<typeof CategoryHeroSchema>
) => {
  try {
    const validatedFields = CategoryHeroSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid category" };
    }

    const user = await currentUser();

    if (!user?.isAdmin) {
      return { error: "Permission denied" };
    }

    await db.categoryHero.create({
      data: values,
    });

    return { success: "Category Hero created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
