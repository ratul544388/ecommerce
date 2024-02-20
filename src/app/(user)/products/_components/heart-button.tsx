"use client";
import { wishListAction } from "@/actions/wish-list-action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { FaHeart } from "react-icons/fa6";
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
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

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="icon"
      className={cn(
        "text-muted-foreground rounded-full text-gray-300 hover:text-gray-300/90 absolute top-1 right-1",
        hasWishList && "text-rose-500 hover:text-rose-500/90"
      )}
    >
      <FaHeart className="h-5 w-5" />
    </Button>
  );
};
