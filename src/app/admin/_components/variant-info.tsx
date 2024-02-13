"use client";

import { Photo } from "@/components/photo";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Color, Size, Variant } from "@prisma/client";
import { Edit, Trash, Trash2 } from "lucide-react";
import { Fragment, useState } from "react";
import { ProductVariantForm } from "./product-variant-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface VariantInfoProps {
  variant: Variant;
  colors: Color[];
  sizes: Size[];
  productId: string;
}

export const VariantInfo = ({
  variant,
  colors,
  sizes,
  productId,
}: VariantInfoProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const items = [
    {
      label: "Color",
      value: variant.color,
    },
    {
      label: "Size",
      value: variant.size,
    },
    {
      label: "Price",
      value: variant.price,
    },
    {
      label: "Offer Price",
      value: variant.offerPrice,
    },
    {
      label: "Quantity",
      value: variant.quantity,
    },
  ];
  return (
    <>
      {searchParams.get("editing_variant") === variant.id ? (
        <ProductVariantForm
          variant={variant}
          colors={colors}
          sizes={sizes}
          productId={productId}
        />
      ) : (
        <div className="flex items-center gap-3 bg-neutral-100 p-3 rounded-md">
          {variant.photo && (
            <Photo photo={variant.photo} className="max-w-[50px]" />
          )}
          {items.map((item) => (
            <Fragment key={item.label}>
              {item.value && (
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    {item.label}
                  </h4>
                  <p className="font-bold">{item.value}</p>
                </div>
              )}
            </Fragment>
          ))}
          <div className="flex gap-3 ml-auto">
            <Button
              onClick={() =>
                router.push(`${pathname}?editing_variant=${variant.id}`, {
                  scroll: false,
                })
              }
              type="button"
              variant="secondary"
              size="icon"
              className="bg-slate-200 hover:bg-slate-300"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button type="button" variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
