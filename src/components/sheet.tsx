"use client";

import { useSheetStore } from "@/hooks/use-sheet-store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useCallback, useEffect } from "react";
import { Button } from "./ui/button";

export const Sheet = ({
  children,
  className,
  open,
  side = "left",
}: {
  children: ReactNode;
  className?: string;
  open: boolean;
  side?: "left" | "right";
}) => {
  const { onClose } = useSheetStore();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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

  const animate = open ? "visible" : "hidden";

  return (
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
      animate={animate}
      className="bg-neutral-900/20 backdrop-blur-sm fixed inset-0 z-50 py-5 px-6"
    >
      <motion.aside
        onClick={(e) => e.stopPropagation()}
        variants={{
          hidden: {
            ...(side === "left"
              ? {
                  left: 0,
                  x: "-100%",
                }
              : {
                  right: 0,
                  x: "100%",
                }),
          },
          visible: {
            x: 0,
          },
        }}
        initial="hidden"
        animate={animate}
        transition={{
          type: "tween",
        }}
        className={cn(
          "fixed bg-background w-[75vw] overflow-hidden border-r inset-y-0 max-w-[400px] top-0 px-6 py-5 flex flex-col",
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
          animate={animate}
        >
          <Button onClick={handleClose} variant="ghost" size="icon">
            <X className="h-6 w-6 text-muted-foreground" />
          </Button>
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          animate={animate}
        >
          {children}
        </motion.div>
      </motion.aside>
    </motion.div>
  );
};
