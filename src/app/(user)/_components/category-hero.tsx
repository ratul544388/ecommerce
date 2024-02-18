import { DynamicBluredImage } from "@/components/dynamic-blured-image";
import { db } from "@/lib/db";
import Link from "next/link";

export const CategoryHero = async ({
  image,
  categories,
}: {
  image: string;
  categories: string[];
}) => {
  const products = await db.product.findMany({
    where: {},
  });

  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      <Link
        href={`/shop?filters=${categories.join("+")}`}
        className="col-span-2 row-span-2"
      >
        <DynamicBluredImage image={image} alt="Cateogry Hero" />
      </Link>
      {products.map((product) => (
        <Link
          href={`/shop?filters=${product.categories.join("+")}`}
          key={product.id}
          className="relative"
        >
          <DynamicBluredImage
            image={product.photos[0]}
            alt="photo"
            className=""
          />
          <h5 className="absolute whitespace-nowrap w-full max-w-[75%] z-10 top-0 left-1/2 -translate-x-1/2 text-center text-xs font-medium bg-white px-3 rounded-b-md overflow-hidden">
            {product.name}
          </h5>
        </Link>
      ))}
    </div>
  );
};
