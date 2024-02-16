import Link from "next/link";
import { StaticBluredImage } from "./static-blured-photo";
import image from "../public/images/hero.jpg";

interface HeroProps {
  image?: string;
}

export const Hero = ({}: HeroProps) => {
  return (
    <Link href="/" className="absolute w-full inset-0 top-[70px]">
      
    </Link>
  );
};
