"use client";

import { useModal } from "@/hooks/use-modal-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Modal } from "./modal";

import { createSize, updateSize } from "@/actions/size-action";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategorySchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

interface SizeModalProps {}

export const SizeModal = ({}: SizeModalProps) => {
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const open = isOpen && type === "sizeModal";

  const { size, title } = data;

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    form.reset({
      title: size?.title,
    });
  }, [size, form, isOpen]);

  function onSubmit(values: z.infer<typeof CategorySchema>) {
    startTransition(() => {
      if (size) {
        updateSize({ values, sizeId: size?.id }).then(
          ({ error, success }) => {
            if (success) {
              form.reset();
              onClose();
              toast.success(success);
              router.refresh();
            } else {
              toast.error(error);
            }
          }
        );
      } else {
        createSize(values).then(({ error, success }) => {
          if (success) {
            form.reset();
            onClose();
            toast.success(success);
            router.refresh();
          } else {
            toast.error(error);
          }
        });
      }
    });
  }

  return (
    <Modal
      open={open}
      title={title || "Create a New size"}
      disabled={isPending}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter size title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="ml-auto">
            {size ? "Save" : "Create"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
