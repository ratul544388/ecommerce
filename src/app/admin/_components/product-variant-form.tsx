"use client";

import { Color, Size, Variant } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { variantSchema } from "@/schemas";
import { ImageUpload } from "./image-upload";
import { ImagesPreview } from "@/components/images-preview";
import { ColorSelect } from "./color-select";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProductVariant } from "@/actions/product-variant-action";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";

interface ProductVariantsProps {
  productId: string;
  variant?: Variant;
  colors: Color[];
  sizes: Size[];
  initialType?: "form" | "preview" | "button";
}

export const ProductVariantForm = ({
  productId,
  variant,
  colors,
  sizes,
  initialType = "form",
}: ProductVariantsProps) => {
  const [mounted, setMounted] = useState(false);
  const [type, setType] = useState(initialType);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      photo: "",
      color: {},
      price: undefined,
      offerPrice: undefined,
      quantity: undefined,
      size: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function onSubmit(values: z.infer<typeof variantSchema>) {
    startTransition(() => {
      if (variant) {
        // updateProduct({ values, productId: product.id }).then(
        //   ({ success, error }) => {
        //     if (success) {
        //       toast.success(success);
        //       router.push(`/admin/products`);
        //       router.refresh();
        //     } else if (error) {
        //       toast.error(error);
        //     }
        //   }
        // );
      } else {
        createProductVariant({ values, productId }).then(
          ({ success, error }) => {
            if (success) {
              toast.success(success);
              setType("button");
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
    <div className="flex">
      {type === "form" ? (
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
                      <FormLabel>Photo</FormLabel>
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
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <ColorSelect
                        colors={colors.map((color) => ({
                          name: color.name,
                          hex: color.hexCode,
                        }))}
                        onChange={(value) => form.setValue("color", value)}
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
                    <FormLabel>Offer Price</FormLabel>
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
            <Button
              onClick={form.handleSubmit(onSubmit)}
              type="button"
              disabled={isPending}
              className="ml-auto bg-green-600 hover:bg-green-600/90"
            >
              Create Variant
            </Button>
          </form>
        </Form>
      ) : type === "preview" && variant ? (
        <section className="flex items-center gap-5 text-sm font-semibold text-foreground/70">
          <div className="flex items-center gap-5 opacity-50 font-semibold">
            {variant.photo && (
              <div className="relative w-10 h-10">
                <Image
                  src={variant.photo}
                  alt="photo"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
            )}
            {variant.color && variant.colorHex && (
              <div className="flex items-center gap-3">
                <span
                  className="h-8 w-8 rounded-md"
                  style={{ backgroundColor: variant.colorHex }}
                />
                {variant.color}
              </div>
            )}
            {variant.size && <p>Size: {variant.size}</p>}
            <p>Qty: {variant.quantity}</p>
            <p>Price: {variant.price}</p>
            {variant.offerPrice && (
              <p>Offer Price: {variant.offerPrice}</p>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="secondary" size="icon" className="h-7 w-7">
              <Edit className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="destructive" size="icon" className="h-7 w-7">
              <Trash className="h-4 w-4 text-white/70" />
            </Button>
          </div>
        </section>
      ) : (
        <Button
          onClick={() => setType("form")}
          variant="outline"
          className="ml-auto"
        >
          Add a new Variant
        </Button>
      )}
    </div>
  );
};
