import Image from "next/image";
import Link from "next/link";
import HeroImage from "../../public/images/hero.jpg";

interface HeroProps {
  image?: string;
}

export const Hero = ({}: HeroProps) => {
  return (
    <Link href="/" className="absolute w-full inset-0 top-[70px] h-[50vh]">
      <Image src={HeroImage} alt="image" fill placeholder="blur" />
    </Link>
  );
};
