
import { StaticBluredImage } from "@/components/static-blured-photo";
import { newarrivals } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NewArrivalProps {}

export const NewArrival = ({}: NewArrivalProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/shop?refinement=new-arrival"
        className={cn(
          "flex items-center justify-center bg-orange-100 text-3xl py-5 text-yellow-700 font-bold"
        )}
      >
        NEW ARRIVAL
      </Link>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {newarrivals.map((item) => (
          <div key={item.name} className="relative">
            <StaticBluredImage
              image={item.image}
              alt={item.name}
              className="max-w-full"
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-background px-3 py-1 max-w-[70%] line-clamp-1 whitespace-nowrap rounded-b-lg text-sm font-medium">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
