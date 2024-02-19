import { getOrders } from "@/actions/order-action";
import { PageNavigations } from "@/components/page-navigations";
import { DataTable } from "../_components/data-table";
import { OrderColumns } from "./_components/order-columns";

const OrdersPage = async () => {
  const orders = await getOrders();
  return (
    <div className="space-y-4">
      <PageNavigations
        links={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
        ]}
        pageLabel="Orders"
      />
      <DataTable columns={OrderColumns} data={orders} />
    </div>
  );
};

export default OrdersPage;
