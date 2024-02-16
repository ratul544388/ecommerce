"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const HeaderCategories = () => {
  const pathname = usePathname();
  const router = useRouter();
  const mockCategories = [
    {
      mainCategory: "Man",
      subCategories: [
        "item1",
        "item2",
        "item3",
        "item4",
        "item5",
        "item6",
        "item7",
        "item8",
        "item9",
        "item10",
      ],
    },
    {
      mainCategory: "Woman",
      subCategories: [
        "item1",
        "item2",
        "item3",
        "item4",
        "item5",
        "item6",
        "item7",
        "item8",
        "item9",
        "item10",
      ],
    },
    {
      mainCategory: "Kid",
      subCategories: [
        "item1",
        "item2",
        "item3",
        "item4",
        "item5",
        "item6",
        "item7",
        "item8",
        "item9",
        "item10",
      ],
    },
  ];

  return (
    <NavigationMenu
      className={cn("hidden sm:block ml-3", pathname === "/shop" && "hidden")}
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
                    href={`/shop?filters=${item.title}`}
                    onClick={(e) => {
                      router.push(`/shop?filters=${item.title}`);
                      e.preventDefault();
                    }}
                    className="hover:text-sky-500"
                    key={index}
                  >
                    {item.title}
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
