"use client";

import { deleteSizes } from "@/actions/size-action";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Modal } from "./modal";

export const DeleteSizeModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const open = isOpen && type === "deleteSizeModal";
  const { ids, title, onSuccess } = data;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    startTransition(() => {
      deleteSizes(ids as string[]).then(({ error, success }) => {
        if (success) {
          onClose();
          toast.success(success);
          onSuccess?.();
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
      description="Are you sure you want to Delete the Size? This action cannot be undone."
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
