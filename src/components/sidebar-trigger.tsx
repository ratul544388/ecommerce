"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useSheetStore } from "@/hooks/use-sheet-store";

export const SidebarTrigger = () => {
  const { onOpen } = useSheetStore();
  return (
    <Button
      onClick={() => onOpen("sidebar")}
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-foreground/80"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
};
