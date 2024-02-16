import { getProducts } from "@/actions/product-action";
import { Filters } from "@/components/categories/filters";
import { ProductCard } from "@/components/product-card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const filters = searchParams.filters?.split(" ");
  const products = await getProducts({ filters });
  return (
    <>
      <div className="fixed w-[250px] inset-y-0 border-r left-0 md:block hidden">
        <ScrollArea className="h-[100vh] pt-[80px] pl-10">
          <Filters />
        </ScrollArea>
      </div>
      <div className="md:pl-[250px] grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Page;
