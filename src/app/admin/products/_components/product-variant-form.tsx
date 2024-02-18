"use client";

import { Color, Size, Variant } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  createProductVariant,
  updateProductVariant,
} from "@/actions/product-variant-action";
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
import { variantSchema } from "@/schemas";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { ColorPopover } from "./color-popover";
import { ImageUpload } from "./image-upload";
import { SizePopover } from "./size-popover";

interface ProductVariantsProps {
  productId: string;
  variant?: Variant;
  colors: Color[];
  sizes: Size[];
}

export const ProductVariantForm = ({
  productId,
  variant,
  colors,
  sizes,
}: ProductVariantsProps) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      photo: "",
      color: [],
      price: undefined,
      offerPrice: undefined,
      quantity: undefined,
      size: "",
    },
  });

  useEffect(() => {
    if (variant) {
      const { photo, color, price, offerPrice, quantity, size } = variant;
      form.reset({
        photo: photo as string,
        color,
        size: size as string,
        price: price || undefined,
        offerPrice: offerPrice || undefined,
        quantity,
      });
    }
  }, [form, variant]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function onSubmit(values: z.infer<typeof variantSchema>) {
    startTransition(() => {
      if (variant) {
        updateProductVariant({ values, variantId: variant.id, productId }).then(
          ({ success, error }) => {
            if (success) {
              toast.success(success);
              router.push(pathname);
              router.refresh();
            } else if (error) {
              toast.error(error);
            }
          }
        );
      } else {
        createProductVariant({ values, productId }).then(
          ({ success, error }) => {
            if (success) {
              toast.success(success);
              router.push(pathname);
              router.refresh();
            } else if (error) {
              toast.error(error);
            }
          }
        );
      }
    });
  }

  const photo = form.getValues("photo");

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4 items-center">
          {photo ? (
            <ImagesPreview
              images={[photo]}
              onRemove={() => {
                form.setValue("photo", "", { shouldValidate: true });
              }}
            />
          ) : (
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel optional>Photo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onUpload={(value) =>
                        form.setValue("photo", value, {
                          shouldValidate: true,
                        })
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel optional>Color</FormLabel>
                <FormControl>
                  <ColorPopover
                    value={field.value}
                    colors={colors.map((color) => [color.name, color.hex])}
                    onChange={(value) => form.setValue("color", value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel optional>Size</FormLabel>
                <FormControl>
                  <SizePopover
                    value={field.value}
                    onChange={field.onChange}
                    sizes={sizes.map((item) => item.title)}
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
                    {...field}
                    placeholder="Enter Product Quantity"
                    type="number"
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
                    {...field}
                    placeholder="Enter Product Price"
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
                    {...field}
                    placeholder="Enter Product offer price it is has"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <Button
            type="button"
            onClick={() => router.push(pathname, { scroll: false })}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            type="button"
            disabled={isPending}
            className="bg-green-600 hover:bg-green-600/90 hover:text-white"
          >
            {variant ? "Save Variant" : "Create Variant"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
