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
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { createColor, updateColor } from "@/actions/colors-action";

interface ColorModalProps {}

export const ColorModal = ({}: ColorModalProps) => {
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const open = isOpen && type === "colorModal";

  const { color, title } = data;

  const form = useForm<z.infer<typeof ColorSchema>>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      name: "",
      hexCode: "#333333",
    },
  });

  useEffect(() => {
    form.reset({
      name: color?.name,
      hexCode: color?.hexCode,
    });
  }, [form, color]);

  function onSubmit(values: z.infer<typeof ColorSchema>) {
    startTransition(() => {
      if (color) {
        updateColor({ values, colorId: color?.id }).then(
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
        createColor(values).then(({ error, success }) => {
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

  const hexCode = form.getValues("hexCode");

  return (
    <Modal
      open={open}
      title={title || "Create a new Color"}
      disabled={isPending}
    >
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
            {color ? "Save" : "Create"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
