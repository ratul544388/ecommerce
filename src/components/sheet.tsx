"use client";

import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ReactNode, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const Sheet = ({
  children,
  trigger,
  className,
}: {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
}) => {
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
        {trigger}
      </Button>
      <motion.div
        variants={{
          hidden: {
            display: "none",
            opacity: 0,
            transition: { delay: 0.3 },
          },
          visible: { opacity: 1, display: "block" },
        }}
        onClick={handleClose}
        initial="hidden"
        animate={animation}
        className="bg-neutral-900/20 backdrop-blur-sm fixed inset-0 z-50 py-5 px-6"
      >
        <motion.aside
          onClick={(e) => e.stopPropagation()}
          variants={{
            hidden: {
              x: "-100%",
            },
            visible: {
              x: 0,
            },
          }}
          initial="hidden"
          animate={animation}
          transition={{
            type: "tween",
          }}
          className={cn(
            "fixed bg-background w-[75vw] overflow-hidden border-r inset-y-0 max-w-[400px] top-0 left-0 px-6 py-5",
            className
          )}
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
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            initial="hidden"
            animate={animation}
          >
            {children}
          </motion.div>
        </motion.aside>
      </motion.div>
    </div>
  );
};
