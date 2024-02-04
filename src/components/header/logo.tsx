"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className="flex items-center gap-2 ">
      <div className="h-[25px] w-[25px]">
        <Image src="/images/logo.svg" alt="logo" height={25} width={25} />
      </div>
      <span className="font-bold text-xl">Glamify</span>
    </div>
  );
};
