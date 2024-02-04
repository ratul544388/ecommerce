"use client";

import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  image?: string;
}

export const Hero = ({}: HeroProps) => {
  return (
    <div className="h-[50vh] relative">
      <Link href="/">
        <Image
          src="/images/hero.jpg"
          alt="hero"
          className="object-cover"
          fill
        />
      </Link>
    </div>
  );
};
