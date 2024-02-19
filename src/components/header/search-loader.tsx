"use client";
import { motion } from "framer-motion";
interface SearchLoaderProps {}

export const SearchLoader = ({}: SearchLoaderProps) => {
  return (
    <div className="absolute w-full top-0 inset-0 h-1">
      <motion.span
        variants={{
          initial: { left: "-100%" },
          animate: {
            left: "100%",
            transition: {
              repeat: Infinity,
              duration: 1,
            },
          },
        }}
        initial="initial"
        animate="animate"
        className="h-full absolute bg-primary rounded-full w-full"
      />
    </div>
  );
};
