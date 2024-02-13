import { ProductCard } from "@/components/product-card";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

const WishListPage = async () => {
  const user = await currentUser();

  const products = await db.product.findMany({
    where: {
      id: {
        in: user?.wishList,
      },
    },
  });

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishListPage;
