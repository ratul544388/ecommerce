import { getProducts } from "@/actions/product-action";
import { Filters } from "@/components/categories/filters";
import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const filters = searchParams.filters?.split(" ");
  const products = await getProducts({ filters });
  const categories = await db.category.findMany();
  return (
    <>
      <div className="fixed w-[250px] inset-y-0 border-r left-0 md:block hidden">
        <ScrollArea className="h-[100vh] pt-[90px] pb-5 pl-10">
          <Filters categories={categories} />
        </ScrollArea>
      </div>
      {products.length ? (
        <div className="md:pl-[250px] grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No results found"
          description="Adjust your filters to find products that match your criteria. Or clear the exising filters"
          actionLabel="Clear Filters"
          actionUrl="/shop"
        />
      )}
    </>
  );
};

export default Page;
