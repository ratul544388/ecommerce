import { getProducts } from "@/actions/product-action";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { DataTable } from "../_components/data-table";
import { Productcolumns } from "./_components/product-columns";
import { db } from "@/lib/db";
import { Pagination } from "@/components/pagination";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const page = Number(searchParams.page) || 1;
  const totalProducts = await db.product.count();
  const take = 10;
  const { products } = await getProducts({ page, take });
  const maxPages = Math.ceil(totalProducts / take);
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Products</h3>
        <Link href="/admin/products/new" className={buttonVariants()}>
          Add New
          <PlusIcon className="h-4 w-4 ml-2" />
        </Link>
      </div>
      <Separator />
      <DataTable columns={Productcolumns} data={products} />
      <Pagination maxPages={maxPages} currentPage={page} />
    </div>
  );
};

export default ProductsPage;
