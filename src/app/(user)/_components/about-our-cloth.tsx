"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

export const AboutOurCloth = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 max-h-[300px] overflow-hidden">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-xl text-foreground/70">Glamify</h3>
          <ChevronRight className="h-8 w-8 text-green-500" />
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-foreground/60">
            Because confort and confidence go hand in hand
          </h4>
          <p className="text-xs text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            cumque a veniam deleniti nostrum fugiat, quibusdam corrupti
            consequatur officia atque numquam repellendus nesciunt ratione quod
            quia est sunt natus dolores esse saepe. Nesciunt quod fuga quos
            autem iusto vitae veniam!
          </p>
        </div>
      </div>
      <Image src="/images/about-our-cloth.png" alt="About our cloth" width={300} height={300} className=""/>
    </div>
  );
};
