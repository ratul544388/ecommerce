"use client";

import { FormWrapper } from "@/components/form-wrapper";
import { ProductSchema } from "@/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createProduct, updateProduct } from "@/actions/product-action";
import { CategorySelect } from "@/app/admin/_components/category-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Category, Color, Product, Size, Variant } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { ProductVariantForm } from "./product-variant-form";
import { ImageUpload } from "./image-upload";
import { ImagesPreview } from "@/components/images-preview";

interface ProductFormProps {
  categories: Category[];
  product?: Product & {
    variants: Variant[];
  };
  colors?: Color[];
  sizes?: Size[];
}

export const ProductForm = ({
  categories,
  product,
  colors,
  sizes,
}: ProductFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: undefined,
      offerPrice: undefined,
      quantity: undefined,
      category: "",
      photos: [],
      description: "",
    },
  });

  useEffect(() => {
    if (product) {
      const {
        name,
        photos,
        category,
        description,
        price,
        offerPrice,
        quantity,
      } = product;
      form.reset({
        name,
        photos,
        category,
        description,
        price,
        offerPrice: offerPrice || undefined,
        quantity,
      });
    }
  }, [form, product]);

  function onSubmit(values: z.infer<typeof ProductSchema>) {
    startTransition(() => {
      if (product) {
        updateProduct({ values, productId: product.id }).then(
          ({ success, error }) => {
            if (success) {
              toast.success(success);
              // router.push(`/admin/products`);
              router.refresh();
            } else if (error) {
              toast.error(error);
            }
          }
        );
      } else {
        createProduct(values).then(({ success, error, slug }) => {
          if (success) {
            toast.success(success);
            router.push(`/admin/products/${slug}/update`);
            router.refresh();
          } else if (error) {
            toast.error(error);
          }
        });
      }
    });
  }

  const photos = form.getValues("photos");
  return (
    <FormWrapper className="max-w-screen-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    autoFocus={!!!product}
                    placeholder="Enter new Product Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategorySelect
                    categories={categories}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    autoFocus={!!!product}
                    placeholder="Enter Product price"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offerPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer Price</FormLabel>
                <FormControl>
                  <Input
                    autoFocus={!!!product}
                    placeholder="Enter Product Offer Price"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    autoFocus={!!!product}
                    placeholder="Enter Product Quantity"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center flex-wrap gap-3">
            <ImagesPreview
              images={photos}
              onRemove={(value) =>
                form.setValue("photos", value, { shouldValidate: true })
              }
            />
            <FormField
              control={form.control}
              name="photos"
              render={({}) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Product Photos</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onUpload={(value) => {
                        form.setValue("photos", [...photos, value], {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {colors && sizes && (
            <div className="space-y-8 md:col-span-2">
              <div className="space-y-3">
                <h1 className="font-semibold text-xl text-primary">
                  Product Variants
                </h1>
                <Separator />
              </div>
              {product && (
                <div className="space-y-5">
                  {product.variants.map((variant) => (
                    <ProductVariantForm
                      colors={colors}
                      sizes={sizes}
                      variant={variant}
                      productId={product.id}
                      key={variant.id}
                      initialType="preview"
                    />
                  ))}
                  <ProductVariantForm
                    colors={colors}
                    sizes={sizes}
                    productId={product.id}
                    initialType={product.variants.length ? "button" : "form"}
                  />
                </div>
              )}
              <Separator />
            </div>
          )}
          <Button
            disabled={isPending}
            type="submit"
            className="ml-auto md:col-span-2"
          >
            {product ? "Save Product" : "Create Product"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
