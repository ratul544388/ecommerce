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
import { getProducts } from "@/actions/product-action";
import { ProductCard } from "@/components/product-card";
import { BuyNowButton } from "./buy-now-button";
import { PhotoTabs } from "../_components/photo-tabs";

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string };
}) => {
  const user = await currentUser();
  const activePhoto = Number(searchParams.photo) || 1;
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

  const products = await getProducts();

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
    <div className="max-w-[950px] mx-auto w-full space-y-16">
      <div className="grid sm:grid-cols-2 gap-12">
        <div className="flex flex-col gap-5">
          <DynamicBluredImage
            image={product.photos[activePhoto - 1]}
            className="aspect-[7/8] max-w-full"
          />
          <PhotoTabs photos={product.photos} activePhoto={activePhoto} />
        </div>
        <div>
          <h3
            className={cn("capitalize text-2xl text-foreground/80 font-bold")}
          >
            {product.name}
          </h3>
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
          <HeartButton user={user} productId={product.id} />
          <Separator className="bg-neutral-400 my-5" />
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground/90">
          You may also like
        </h3>
        <Separator />
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
