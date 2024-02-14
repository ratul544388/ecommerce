import { DynamicBluredImage } from "@/components/dynamic-blured-image";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { AddToCart } from "../../_components/add-to-cart";
import { HeartButton } from "../../_components/heart-button";
import { SelectColor } from "../../_components/select-color";
import { SelectSize } from "../../_components/select-size";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const user = await currentUser();
  const product = await db.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      variants: true,
    },
  });

  if (!product) {
    notFound();
  }

  const sizes = product.variants
    .filter((variant) => variant.size)
    .map((item) => item.size) as string[];

  const colors = product.variants
    .filter(
      (variant, index, self) =>
        variant.color &&
        index === self.findIndex((i) => i.color[0] === variant.color[0])
    )
    .map((item) => ({
      name: item.color[0],
      hex: item.color[1],
    }));

  return (
    <div className="max-w-[1000px] mx-auto w-full">
      <div className="grid sm:grid-cols-2 gap-12">
        <DynamicBluredImage
          image={product.photos[0]}
          className="aspect-[7/8] max-w-full"
        />
        <div>
          <div className="flex gap-5 items-start">
            <h3
              className={cn("capitalize text-2xl text-foreground/80 font-bold")}
            >
              {product.name}
            </h3>
            <HeartButton user={user} productId={product.id} />
          </div>
          <div className="flex items-end gap-3 font-semibold mt-3">
            {product.offerPrice && (
              <div className="text-xl text-muted-foreground line-through">
                ${product.price}
              </div>
            )}
            <div className="text-3xl text-foreground/80">
              ${product.offerPrice || product.price}
            </div>
          </div>
          <SelectSize sizes={sizes} />
          <SelectColor colors={colors} />
          <AddToCart product={product} user={user} />
          <Separator className="bg-neutral-400 my-5" />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
