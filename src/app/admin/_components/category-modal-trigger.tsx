"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { PlusIcon } from "lucide-react";

export const CategoryModalTrigger = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Button
        onClick={() => onOpen("categoryModal")}
        variant="outline"
        className="h-14 w-14 rounded-full"
        size="icon"
      >
        <PlusIcon className="h-10 w-10 text-muted-foreground" />
      </Button>
      <p className="font-medium">
        Add a new Category
      </p>
    </div>
  );
};
