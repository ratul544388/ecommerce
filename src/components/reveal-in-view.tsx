"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealInViewProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export const RevealInView = ({
  children,
  className,
  duration = 0.25,
}: RevealInViewProps) => {
  return (
    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration }}
      viewport={{ once: true }}
      className={cn("opacity-0 w-full", className)}
    >
      {children}
    </motion.div>
  );
};
