import * as z from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(100, { message: "Name is too long" }),
  categories: z.array(z.string()).min(1, { message: "Category is required" }),
  photos: z.array(z.string()).min(0, {
    message: "Minimum one photo is required",
  }),

  quantity: z.coerce.number(),
  price: z.coerce.number(),
  offerPrice: z.coerce.number().optional(),

  description: z.string({ required_error: "Category is required" }),
});

export const variantSchema = z.object({
  color: z.array(z.string()),
  size: z.string().optional(),
  photo: z.string().optional(),
  quantity: z.coerce
    .number({ invalid_type_error: "Quantity is required" })
    .min(1, { message: "Quantity is required" }),
  price: z.coerce.number().optional(),
  offerPrice: z.coerce.number().optional(),
});

export const CategorySchema = z.object({
  title: z
    .string()
    .min(1, { message: "Category is required" })
    .max(20, { message: "Category is too long" }),
});

export const SizeSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Size is required" })
    .max(20, { message: "Size is too long" }),
});

export const ColorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Color is required" })
    .max(20, { message: "Color name is too long" }),
  hex: z.string().min(1, { message: "Hex code is required" }),
});
