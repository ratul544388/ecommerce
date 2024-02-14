"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { ColorSchema } from "@/schemas";
import { pluralize } from "@/lib/utils";

export const createColor = async (values: z.infer<typeof ColorSchema>) => {
  try {
    const validatedFields = ColorSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
      };
    }

    const existingName = await db.color.findUnique({
      where: {
        name: values.name,
      },
    });

    if (existingName) {
      return { error: "Color name already exists" };
    }

    const existingHex = await db.color.findUnique({
      where: {
        hex: values.hex,
      },
    });

    if (existingHex) {
      return { error: "Color Hex already exists" };
    }

    await db.color.create({
      data: values,
    });

    return { success: "Color Created" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const updateColor = async ({
  values,
  colorId,
}: {
  values: z.infer<typeof ColorSchema>;
  colorId: string;
}) => {
  try {
    const validatedFields = ColorSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
      };
    }
    await db.color.update({
      where: {
        id: colorId,
      },
      data: values,
    });

    return { success: "Color Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteColors = async (colorIds: string[]) => {
  try {
    await db.color.deleteMany({
      where: {
        id: {
          in: colorIds,
        },
      },
    });

    return {
      success: `Selected ${pluralize(
        "Color",
        "Colors",
        colorIds.length
      )} Deleted`,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
