import { getProducts } from "@/actions/product-action";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { currentUser } from "@/lib/current-user";
import { Products } from "../_components/products";

const WishListPage = async () => {
  const user = await currentUser();

  const { products, hasMore } = await getProducts({ wishList: user?.wishList });

  return (
    <Container>
      {products.length ? (
        <Products
          initialProducts={products}
          initialHasMore={hasMore}
          user={user}
          wishList={user?.wishList}
        />
      ) : (
        <EmptyState
          title="No items in your wishlist"
          description="Add items to your wishlist to keep track of them!"
          actionLabel="Continue shopping"
          actionUrl="/shop"
        />
      )}
    </Container>
  );
};

export default WishListPage;
