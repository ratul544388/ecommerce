"use client";

import { ArrowLeft, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "./search";
import { motion } from "framer-motion";

interface MobileSearchProps {}

export const MobileSearch = ({}: MobileSearchProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden ml-auto">
      {!open && (
        <Button onClick={() => setOpen(true)} variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
        </Button>
      )}
      {open && (
        <motion.div
          variants={{ hidden: { height: 0 }, visible: { height: 60 } }}
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          className="fixed flex items-center gap-3 top-[70px] inset-x-0 bg-secondary px-4"
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-background rounded-full hover:bg-background/90 min-w-9 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Search
            focus
            onCloseMobileSearch={() => setOpen(false)}
            className="w-full"
          />
        </motion.div>
      )}
    </div>
  );
};
