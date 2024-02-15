import { getProducts } from "@/actions/product-action";
import { SidebarCategories } from "@/components/categories/sidebar-categories";
import { ProductCard } from "@/components/product-card";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const products = await getProducts();
  return (
    <>
      <SidebarCategories />
      <div className="md:pl-[250px] grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Page;
