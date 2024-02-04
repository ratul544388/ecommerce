"use client";

import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useCallback, useEffect } from "react";

export const SidebarTrigger = () => {
  const animation = useAnimation();

  const handleClose = useCallback(() => {
    animation.start("hidden");
  }, [animation]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);
  
  return (
    <div className="md:hidden">
      <Button
        onClick={() => animation.start("visible")}
        variant="ghost"
        size="icon"
      >
        <Menu className="h-6 w-6 text-muted-foreground" />
      </Button>
      <motion.div
        variants={{
          hidden: {
            display: "none",
            opacity: 0,
            transition: { delay: 0.2 },
          },
          visible: { opacity: 1, display: "block" },
        }}
        onClick={handleClose}
        initial="hidden"
        animate={animation}
        className="bg-neutral-900/20 backdrop-blur-sm fixed inset-0 z-50"
      >
        <motion.aside
          onClick={(e) => e.stopPropagation()}
          variants={{
            hidden: {
              height: 0,
              width: 0,
              borderRadius: "50%",
              borderTopLeftRadius: 0,
            },
            visible: {
              height: "100%",
              width: "75vw",
              borderRadius: 0,
            },
          }}
          initial="hidden"
          animate={animation}
          className="fixed bg-background border-r h-20 max-w-[500px] top-0 left-0"
        >
          <motion.div
            className="absolute right-1 top-1"
            variants={{
              hidden: { scale: 0 },
              visible: { scale: 1, transition: { delay: 0.4 } },
            }}
            initial="hidden"
            animate={animation}
          >
            <Button onClick={handleClose} variant="ghost" size="icon">
              <X className="h-6 w-6 text-muted-foreground" />
            </Button>
          </motion.div>
        </motion.aside>
      </motion.div>
    </div>
  );
};
