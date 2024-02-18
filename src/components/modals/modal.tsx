"use client";

import { ReactNode, useEffect } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { animate, motion, useAnimation } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  children: ReactNode;
  title?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Modal = ({
  children,
  title,
  description,
  open,
  disabled,
  className,
}: ModalProps) => {
  const { onClose } = useModal();

  const animation = useAnimation();
  useEffect(() => {
    if (open) {
      animation.start("visible");
    } else {
      animation.start("hidden");
    }
  }, [open, animation]);

  const handleClose = () => {
    if (disabled) return;
    onClose();
    animation.start("hidden");
  };

  return (
    <motion.div
      onClick={handleClose}
      variants={{
        hidden: {
          display: "none",
          opacity: 0,
          transition: {
            delay: 0.15,
          },
        },
        visible: { display: "flex", opacity: 1 },
      }}
      transition={{
        duration: 0.15,
      }}
      initial="hidden"
      animate={animation}
      className="fixed flex items-center justify-center inset-0 z-50 bg-neutral-900/80 backdrop-blur-sm"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={{
          hidden: { scale: 0.65, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={{
          type: "tween",
          duration: 0.15,
        }}
        initial="hidden"
        animate={animation}
        className={cn(
          "relative h-[100svh] sm:h-auto sm:max-h-[80vh] overflow-y-auto bg-background border rounded-lg w-full max-w-[500px]",
          className
        )}
      >
        <Button
          onClick={handleClose}
          disabled={disabled}
          className="absolute right-2 top-1 z-50"
          variant="ghost"
          size="icon"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </Button>
        <div className="max-h-[90vh]">
          <div className="p-5">
            <h1 className="font-semibold text-lg">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="mt-5">{children}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
