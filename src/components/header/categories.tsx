"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Catetories = () => {
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
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent className="p-3 flex gap-5">
            {mockCategories.map((item, index) => (
              <div key={index} className="flex flex-col">
                <NavigationMenuLink
                  key={index}
                  className="hover:text-sky-500"
                  href="/"
                >
                  {item.mainCategory}
                </NavigationMenuLink>
                {item.subCategories.map((item, index) => (
                  <NavigationMenuLink
                    className="hover:text-sky-500"
                    href="/"
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
