import { getProducts } from "@/actions/product-action";
import { Filters } from "@/components/categories/filters";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { ProductCard } from "@/components/product-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { PageFilters } from "./_components/page-filters";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const filters = searchParams.filters?.split(" ") || [];
  const page = Number(searchParams.page) || 1;
  const take = 12;
  const products = await getProducts({ filters, take, page });
  const categories = await db.category.findMany();

  const totalProducts = await db.product.count();
  const maxPages = Math.ceil(totalProducts / take);

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
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
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
        <Pagination maxPages={maxPages} currentPage={page} />
      </div>
    </>
  );
};

export default Page;
