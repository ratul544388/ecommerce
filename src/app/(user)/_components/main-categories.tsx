"use client";

import { RevealInView } from "@/components/reveal-in-view";
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
      href: "/shop?filters=man",
    },
    {
      label: "Woman",
      href: "/shop?filters=woman",
    },
    {
      label: "Kids",
      href: "/shop?filters=kids",
    },
  ];
  return (
    <div className="mt-5 w-full grid grid-cols-4 place-items-center bg-secondary">
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
