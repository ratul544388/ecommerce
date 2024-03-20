"use client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import HeroImage from "../../public/images/hero.jpg";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEmblaCarouselDotButton } from "@/hooks/use-embla-carousel-dot-button";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

const images = [HeroImage, HeroImage, HeroImage, HeroImage, HeroImage];

interface HeroProps {
  image?: string;
}

export const Hero = ({}: HeroProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const { selectedIndex, onDotButtonClick, scrollSnaps } =
    useEmblaCarouselDotButton(api);

  const autoPlayStart = useCallback(() => {
    const autoplay = api?.plugins().autoplay;
    if (autoplay && typeof autoplay.play === "function") {
      autoplay.play();
    }
  }, [api]);

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay()]}
      setApi={setApi}
      className="relative"
    >
      <CarouselContent onMouseLeave={autoPlayStart} onTouchEnd={autoPlayStart}>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              key={index}
              src={image}
              alt="image"
              width={1600}
              height={900}
              className="h-[350px] w-full object-cover"
              placeholder="blur"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      <div className="absolute flex gap-2 bottom-6 left-1/2 -translate-x-1/2">
        {scrollSnaps.map((_, index) => (
          <button
            onClick={() => onDotButtonClick(index)}
            key={index}
            className={cn(
              "size-2.5 rounded-full border border-primary",
              index === selectedIndex && "bg-primary"
            )}
          />
        ))}
      </div>
    </Carousel>
  );
};
