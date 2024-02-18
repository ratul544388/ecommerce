"use client";

import { FormWrapper } from "@/components/form-wrapper";
import { ProductSchema } from "@/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createProduct, updateProduct } from "@/actions/product-action";
import { CategorySelect } from "@/app/admin/_components/category-select";
import { ImagesPreview } from "@/components/images-preview";
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
import { cn } from "@/lib/utils";
import { Category, Color, Product, Size, Variant } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";
import { ProductVariantForm } from "./product-variant-form";
import { RichTextArea } from "./rich-text-area";
import { VariantInfo } from "./variant-info";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const leftProduct =
    product?.variants.reduce((total, product) => {
      return (total = total - product.quantity);
    }, product.quantity) || 0;

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: undefined,
      offerPrice: undefined,
      quantity: undefined,
      categories: [],
      photos: [],
      description: "",
    },
  });

  useEffect(() => {
    if (product) {
      const {
        name,
        photos,
        categories,
        description,
        price,
        offerPrice,
        quantity,
      } = product;
      form.reset({
        name,
        photos,
        categories,
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
              router.push(`/admin/products`);
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
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategorySelect
                    value={field.value}
                    onChange={field.onChange}
                    options={categories.flatMap((item) => [
                      item.title,
                      ...item.subCategories,
                    ])}
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
                <FormLabel optional>Offer Price</FormLabel>
                <FormControl>
                  <Input
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
                    placeholder="Enter Product Quantity"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-3 md:col-span-2">
            <label className="text-sm font-medium">Product Photos</label>
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
                  <FormItem className="">
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
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextArea value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {product && colors && sizes && (
            <div className="flex flex-col gap-8 md:col-span-2">
              <div className="space-y-3">
                <h3 className="font-semibold text-xl text-primary">
                  Product Variants{" "}
                  <span className="text-muted-foreground text-sm font-normal">
                    ({leftProduct} left)
                  </span>
                </h3>
                <Separator />
              </div>
              <div className="space-y-3">
                {product?.variants.map((item) => (
                  <VariantInfo
                    productId={product.id}
                    key={item.id}
                    variant={item}
                    colors={colors}
                    sizes={sizes}
                  />
                ))}
              </div>
              {searchParams.get("add_a_new_product_variant") === "true" && (
                <ProductVariantForm
                  productId={product.id}
                  colors={colors}
                  sizes={sizes}
                />
              )}
              <Button
                variant="outline"
                type="button"
                onClick={() =>
                  router.push(`${pathname}?add_a_new_product_variant=true`, {
                    scroll: false,
                  })
                }
                className={cn(
                  "ml-auto text-white bg-green-600 hover:bg-green-600/90 hover:text-white",
                  (searchParams.get("editing_variant") ||
                    searchParams.get("add_a_new_product_variant") === "true") &&
                    "hidden"
                )}
              >
                Add Product Variant
              </Button>
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
