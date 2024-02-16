"use client";

import { deleteSizes } from "@/actions/size-action";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Modal } from "./modal";
import { cancelOrder } from "@/actions/order-action";

export const CancelOrderModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const [isPending, startTransition] = useTransition();
  const open = isOpen && type === "cancelOrderModal";
  const { title } = data;
  const router = useRouter();

  const { orderId } = data;

  const onCancel = () => {
    startTransition(() => {
      cancelOrder(orderId as string).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          router.refresh();
          onClose();
        } else {
          toast.error(error);
        }
      });
  });
  };

  return (
    <Modal
      open={open}
      title="Cancel Order"
      description="Are you sure you want to cancel the order? This action cannot be undone."
      disabled={isPending}
      className="max-w-[400px]"
    >
      <div className="mt-5 flex items-center gap-3 justify-end">
        <Button onClick={onClose} disabled={isPending} variant="ghost">
          Cancel
        </Button>
        <Button disabled={isPending} onClick={onCancel} variant="destructive">
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
