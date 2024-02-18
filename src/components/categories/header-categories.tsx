"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

export const HeaderCategories = ({
  categories,
}: {
  categories: Category[];
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <NavigationMenu
      className={cn(
        "hidden sm:block ml-3",
        pathname === "/shop" && "hidden sm:hidden"
      )}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold text-base">
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-5 flex gap-5">
            {categories.map((item, index) => (
              <div key={index} className="flex flex-col gap-3">
                <NavigationMenuLink
                  href={`/shop?filters=${item.title}`}
                  onClick={(e) => {
                    router.push(`/shop?filters=${item.title}`);
                    e.preventDefault();
                  }}
                  key={index}
                  className="hover:text-sky-500 font-bold"
                >
                  {item.title}
                </NavigationMenuLink>
                {item.subCategories.map((item, index) => (
                  <NavigationMenuLink
                    href={`/shop?filters=${item}`}
                    onClick={(e) => {
                      router.push(`/shop?filters=${item}`);
                      e.preventDefault();
                    }}
                    className="hover:text-sky-500"
                    key={index}
                  >
                    {item}
                  </NavigationMenuLink>
                ))}
              </div>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
