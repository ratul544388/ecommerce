import Link from "next/link";
import { StaticBluredImage } from "./static-blured-photo";

interface HeroProps {
  image?: string;
}

export const Hero = ({}: HeroProps) => {
  return (
    <Link href="/" className="absolute w-full inset-0 top-[70px]">
      <StaticBluredImage
        image="/images/hero.jpg"
        className="max-w-full h-[50vh] rounded-none"
      />
    </Link>
  );
};
