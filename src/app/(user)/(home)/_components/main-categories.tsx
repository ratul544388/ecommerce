"use client";

import Link from "next/link";

interface MainCategoriesProps {}

export const MainCategories = ({}: MainCategoriesProps) => {
  const categories = [
    {
      label: "Ship now",
      href: "/shop",
    },
    {
      label: "Man",
      href: "/shop?category=man",
    },
    {
      label: "Woman",
      href: "/shop?category=woman",
    },
    {
      label: "Kids",
      href: "/shop?category=kids",
    },
  ];
  return (
    <div className="grid grid-cols-4 place-items-center bg-secondary">
      {categories.map(({ label, href }) => (
        <Link
          href={href}
          role="button"
          key={label}
          className="w-full text-sm uppercase flex items-center justify-center py-5 hover:bg-neutral-900/5"
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
