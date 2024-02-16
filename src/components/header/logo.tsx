"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="h-[25px] w-[25px]">
        <Image src="/images/logo.svg" alt="logo" height={25} width={25} />
      </div>
      <span className="font-bold text-xl">Glamify</span>
    </Link>
  );
};
