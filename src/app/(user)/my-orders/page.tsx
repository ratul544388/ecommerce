import { getOrders } from "@/actions/order-action";
import { Container } from "@/components/container";
import { PageNavigations } from "@/components/page-navigations";
import { currentUser } from "@/lib/current-user";
import { OrderItemBox } from "./_components/order-item";

const MyOrderPage = async () => {
  const user = await currentUser();

  const orders = await getOrders({ userId: user?.id });

  return (
    <Container className="space-y-5">
      <PageNavigations
        links={[{ label: "Home", href: "/" }]}
        pageLabel="My Orders"
      />
      <section className="space-y-5">
        {orders.map((order) => (
          <OrderItemBox order={order} key={order.id} />
        ))}
      </section>
    </Container>
  );
};

export default MyOrderPage;
