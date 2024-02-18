"use client";

import { useSheetStore } from "@/hooks/use-sheet-store";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export const MobileSidebarTrigger = ({className} : {className?: string}) => {
  const { onOpen } = useSheetStore();
  return (
    <Button
      onClick={() => onOpen("sidebar")}
      variant="ghost"
      size="icon"
      className={cn("md:hidden text-muted-foreground hover:text-foreground/80", className)}
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
};
