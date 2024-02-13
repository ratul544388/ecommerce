"use client";

import { adminRoutes } from "@/constants";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

export const AdminRoutes = () => {
  const animation = useAnimation();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
        
    </div>
  );
};
