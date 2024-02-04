"use client";

import { useModal } from "@/hooks/use-modal-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { SketchPicker } from "react-color";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Modal } from "./modal";

import { createCategory } from "@/actions/category-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ColorSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { createColor } from "@/actions/color-action";

interface ColorModalProps {}

export const ColorModal = ({}: ColorModalProps) => {
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const open = isOpen && type === "colorModal";

  const { category } = data;

  const form = useForm<z.infer<typeof ColorSchema>>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      name: "",
      hexCode: "#333333",
    },
  });

  function onSubmit(values: z.infer<typeof ColorSchema>) {
    startTransition(() => {
      createColor(values).then(
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
    });
  }

  const hexCode = form.getValues("hexCode");

  return (
    <Modal open={open} title="Create a new Color" disabled={isPending}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <SketchPicker
            className="mx-auto"
            color={hexCode}
            onChangeComplete={(value) =>
              form.setValue("hexCode", value.hex, { shouldValidate: true })
            }
          />
          <FormField
            control={form.control}
            name="hexCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hex Code</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter color hex code"
                    value={field.value}
                    onChange={(e) =>
                      form.setValue("hexCode", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="ml-auto">
            Create
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
