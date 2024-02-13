"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Modal } from "./modal";
import { deleteCategory } from "@/actions/category-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { deleteColors } from "@/actions/colors-action";

export const DeleteColorsModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const open = isOpen && type === "deleteColorsModal";
  const { ids, title } = data;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    startTransition(() => {
      deleteColors(ids as string[]).then(({ error, success }) => {
        if (success) {
          onClose();
          toast.success(success);
          router.refresh();
        } else {
          toast.error(error);
        }
      });
    });
  }

  return (
    <Modal
      open={open}
      title={title}
      description="Are you sure you want to Delete the Category? This action cannot be undone."
      disabled={isPending}
      className="max-w-[400px]"
    >
      <div className="mt-5 flex items-center gap-3 justify-end">
        <Button onClick={onClose} disabled={isPending} variant="ghost">
          Cancel
        </Button>
        <Button disabled={isPending} onClick={onDelete} variant="destructive">
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
