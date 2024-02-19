import { DynamicBluredImage } from "@/components/dynamic-blured-image";
import { StaticBluredImage } from "@/components/static-blured-photo";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NewArrivalProps {}

export const NewArrival = async ({}: NewArrivalProps) => {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });

  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/shop"
        className={cn(
          "flex items-center justify-center bg-orange-100 text-3xl py-5 text-yellow-700 font-bold"
        )}
      >
        NEW ARRIVAL
      </Link>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {products.map((item) => (
          <Link
            href={`/shop?filters=${item.categories.join("+")}`}
            key={item.id}
            className="relative"
          >
            <DynamicBluredImage
              image={item.photos[0]}
              alt={item.name}
              className="max-w-full"
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-background px-3 py-1 max-w-[75%] line-clamp-1 whitespace-nowrap rounded-b-lg text-xs font-medium">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
