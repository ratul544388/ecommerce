import { getProducts } from "@/actions/product-action";
import { Filters } from "@/components/categories/filters";
import { EmptyState } from "@/components/empty-state";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { Products } from "../_components/products";
import { PageFilters } from "./_components/page-filters";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const user = await currentUser();
  const filters = searchParams.filters?.split(" ") || [];
  const { products, hasMore } = await getProducts({ filters });
  const categories = await db.category.findMany();

  return (
    <>
      <div className="fixed w-[250px] inset-y-0 border-r left-0 md:block hidden">
        <ScrollArea className="h-[100vh] pt-[90px] pb-5 pl-10">
          <Filters categories={categories} />
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-4 md:pl-[250px]">
        <div className="flex items-center justify-normal">
          <PageFilters filters={filters} />
        </div>
        {products.length ? (
          <Products
            initialProducts={products}
            initialHasMore={hasMore}
            user={user}
          />
        ) : (
          <EmptyState
            title="No results found"
            description="Adjust your filters to find products that match your criteria. Or clear the exising filters"
            actionLabel="Clear Filters"
            actionUrl="/shop"
          />
        )}
      </div>
    </>
  );
};

export default Page;
