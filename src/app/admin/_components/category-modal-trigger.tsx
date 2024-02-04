"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const CategoryModalTrigger = () => {
  const { onOpen } = useModal();
  return (
    <Button onClick={() => onOpen("categoryModal")} className="ml-auto mr-5">
      CategoryModalTrigger
    </Button>
  );
};
