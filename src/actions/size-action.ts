"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { SizeSchema } from "@/schemas";
import { currentUser } from "@/lib/current-user";

export const createSize = async (values: z.infer<typeof SizeSchema>) => {
  try {
    const validatedFields = SizeSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const user = await currentUser();

    if(!user) {
      return {error: "Permission denied"};
    }

    await db.size.create({
      data: values,
    });

    return { success: "size created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateSize = async ({
  values,
  sizeId,
}: {
  values: z.infer<typeof SizeSchema>;
  sizeId: string;
}) => {
  try {
    const validatedFields = SizeSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid size" };
    }

    const user = await currentUser();

    if(!user) {
      return {error: "Permission denied"};
    }

    await db.size.update({
      where: {
        id: sizeId,
      },
      data: values,
    });

    return { success: "size Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteSizes = async (sizeIds: string[]) => {
  try {

    const user = await currentUser();

    if(!user) {
      return {error: "Permission denied"};
    }
    
    await db.size.deleteMany({
      where: {
        id: {
          in: sizeIds,
        },
      },
    });

    return {
      success: sizeIds.length === 1 ? "size Deleted" : "Categories Deleted",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
