"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { ColorSchema } from "@/schemas";

export const createColor = async (values: z.infer<typeof ColorSchema>) => {
  try {
    const validatedFields = ColorSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
      };
    }
    await db.color.create({
      data: {
        ...values,
      },
    });

    return { success: "Color Created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
