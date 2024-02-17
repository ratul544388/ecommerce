import { getProducts } from "@/actions/product-action";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { DataTable } from "../_components/data-table";
import { Productcolumns } from "./_components/product-columns";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className={buttonVariants()}>
          Add New
          <PlusIcon className="h-4 w-4 ml-2" />
        </Link>
      </div>
      <Separator />
      <DataTable columns={Productcolumns} data={products} />
    </div>
  );
};

export default ProductsPage;
