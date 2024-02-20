import { getOrders } from "@/actions/order-action";
import { Pagination } from "@/components/pagination";
import { db } from "@/lib/db";
import { DataTable } from "../_components/data-table";
import { OrderColumns } from "./_components/order-columns";

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const page = Number(searchParams.page) || 1;
  const totalOrders = await db.order.count();
  const take = 10;
  const orders = await getOrders({ page, take });
  const maxPages = Math.ceil(totalOrders / take);
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Orders</h3>
      <DataTable columns={OrderColumns} data={orders} />
      <Pagination currentPage={page} maxPages={maxPages} />
    </div>
  );
};

export default OrdersPage;
