"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowLeft, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { SearchInput } from "./search-input";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

interface MobileSearchProps {}

export const MobileSearch = ({}: MobileSearchProps) => {
  const [open, setOpen] = useState(false);
  const animation = useAnimation();
  const Icon = open ? X : Search;
  const containerRef = useRef(null);

  useOnClickOutside(containerRef, () => open && handleClick());

  const handleClick = () => {
    if (open) {
      setOpen(false);
      animation.start("hidden");
    } else {
      setOpen(true);
      animation.start("visible");
    }
  };

  return (
    <div className="md:hidden ml-auto">
      {!open && (
        <Button onClick={handleClick} variant="ghost" size="icon">
          <Icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
        </Button>
      )}
      <motion.div
        ref={containerRef}
        variants={{
          hidden: { y: -70, opacity: 0, pointerEvents: "none" },
          visible: { y: 0, opacity: 1, pointerEvents: "auto" },
        }}
        initial="hidden"
        animate={animation}
        className="fixed flex items-center gap-2 top-[70px] inset-x-0 bg-secondary p-3"
      >
        <Button onClick={handleClick} variant="ghost" size="icon" className="hover:bg-gray-200 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <SearchInput focus={open} />
      </motion.div>
    </div>
  );
};
