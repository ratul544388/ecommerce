"use client";

import { deleteSizes } from "@/actions/size-action";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Modal } from "./modal";
import { deliverOrder } from "@/actions/order-action";

export const DeliverOrderModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const open = isOpen && type === "deliverOrderModal";
  const { id } = data;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onDelivered() {
    startTransition(() => {
      deliverOrder(id as string).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          onClose();
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
      title="Order mask as Delivered"
      description="Are you sure you want to mark the order as delivered. This action cannot be undone"
      disabled={isPending}
      className="max-w-[400px]"
    >
      <div className="mt-5 flex items-center gap-3 justify-end">
        <Button onClick={onClose} disabled={isPending} variant="ghost">
          Cancel
        </Button>
        <Button disabled={isPending} onClick={onDelivered}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
