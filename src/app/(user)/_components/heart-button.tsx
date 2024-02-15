"use client";
import { wishListAction } from "@/actions/wish-list-action";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { toast } from "sonner";

interface HeartButtonProps {
  user: User | null;
  productId: string;
}

export const HeartButton = ({ user, productId }: HeartButtonProps) => {
  const [_, startTransition] = useTransition();
  const [wishList, setWishList] = useState<string[]>(user?.wishList || []);
  const router = useRouter();
  const pathname = usePathname();

  const hasWishList = useMemo(
    () => wishList.includes(productId),
    [productId, wishList]
  );

  const handleClick = () => {
    if (!user) {
      return router.push(`/sign-in?redirect_url=${pathname}`);
    }
    setWishList((prevWishList) =>
      hasWishList
        ? prevWishList.filter((item) => item !== productId)
        : [...prevWishList, productId]
    );
    toast.success(
      hasWishList
        ? "Product removed from wishlist"
        : "Product added to wishlist"
    );
    if (user) {
      startTransition(() => {
        wishListAction(productId).then(({ error, success }) => {
          const prevWishList = wishList;
          if (success) {
            router.refresh();
          }
          if (error) {
            toast.error(error);
            setWishList(prevWishList);
          }
        });
      });
    }
  };

  const HeartIcon = hasWishList ? TiHeartFullOutline : TiHeartOutline;

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="icon"
      className="h-14 w-14 flex flex-col"
    >
      <HeartIcon className="h-8 w-8 text-rose-500" />
      <p className="text-xs font-light">Wishlist</p>
    </Button>
  );
};
