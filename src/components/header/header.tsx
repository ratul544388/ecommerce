import { User } from "@prisma/client";
import { AuthButtons } from "../auth-buttons";
import { CartTrigger } from "../cart/cart-trigger";
import { HeaderCategories } from "../categories/header-categories";
import { MobileSidebarTrigger } from "../mobile-sidebar-trigger";
import { UserButton } from "../user-button";
import { WishListButton } from "../wishlist/wish-list-button";
import { DesktopSearch } from "./desktop-search";
import { Logo } from "./logo";
import { MobileSearch } from "./mobile-search";

interface HeaderProps {
  user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
  return (
    <header className="fixed bg-background z-30 h-[70px] border-b inset-x-0 top-0 shadow-md flex items-center justify-between px-5 sm:px-8 gap-3">
      <div className="flex items-center gap-4">
        <MobileSidebarTrigger />
        <Logo />
      </div>
      <HeaderCategories />
      <DesktopSearch />
      <MobileSearch />
      <div className="flex items-center gap-3">
        {!user && <AuthButtons />}
        {user && (
          <>
            <WishListButton />
            <CartTrigger />
            <UserButton className="hidden sm:block" user={user} />
          </>
        )}
      </div>
    </header>
  );
};
