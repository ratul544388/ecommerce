"use client";

import { Bebas_Neue } from "next/font/google";

import Link from "next/link";
import { cn } from "@/lib/utils";

const font = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

interface NewArrivalProps {}

export const NewArrival = ({}: NewArrivalProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/shop?refinement=new-arrival"
        className={cn(
          font.className,
          "flex items-center justify-center bg-orange-100 text-3xl py-5 text-yellow-700 font-bold"
        )}
      >
        NEW ARRIVAL
      </Link>
    </div>
  );
};
