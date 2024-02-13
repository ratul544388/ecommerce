"use client";
import { wishListAction } from "@/actions/wish-list-action";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
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

  const hasWishList = useMemo(
    () => wishList.includes(productId),
    [productId, wishList]
  );

  const handleClick = () => {
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
    <button onClick={handleClick} className="heart-button">
      <HeartIcon className="h-8 w-8 text-rose-500" />
    </button>
  );
};
