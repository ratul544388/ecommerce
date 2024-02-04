import * as z from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(100, { message: "Name is too long" }),
  category: z.string({ required_error: "Category is required" }),
  photos: z.array(z.string()).min(0, {
    message: "Minimum one photo is required",
  }),

  quantity: z.coerce.number(),
  price: z.coerce.number(),
  offerPrice: z.coerce.number().optional(),

  description: z.string({ required_error: "Category is required" }),
});

export const variantSchema = z.object({
  color: z.object({
    name: z.string().optional(),
    hex: z.string().optional(),
  }),
  size: z.string().optional(),
  photo: z.string().optional(),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  offerPrice: z.coerce.number().optional(),
});

export const CategorySchema = z.object({
  title: z
    .string()
    .min(1, { message: "Category is required" })
    .max(20, { message: "Category is too long" }),
});

export const ColorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Color is required" })
    .max(20, { message: "Color name is too long" }),
  hexCode: z.string().min(1, { message: "Hex code is required" }),
});
