"use client";

import { useModal } from "@/hooks/use-modal-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Modal } from "./modal";

import { createCategory, updateCategory } from "@/actions/category-action";
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
import { CategorySelect } from "@/app/admin/_components/category-select";

interface CategoryModalProps {}

export const CategoryModal = ({}: CategoryModalProps) => {
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const open = isOpen && type === "categoryModal";

  const { category, categories, title } = data;

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: "",
      subCategories: [],
    },
  });

  useEffect(() => {
    form.reset({
      title: category?.title,
    });
  }, [category, form, isOpen]);

  function onSubmit(values: z.infer<typeof CategorySchema>) {
    startTransition(() => {
      if (category) {
        updateCategory({ values, categoryId: category?.id }).then(
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
        createCategory({ values }).then(({ error, success }) => {
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
      title={title || "Create a New Category"}
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
                    placeholder="Enter category title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCategories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Categories</FormLabel>
                <FormControl>
                  <CategorySelect
                    options={categories || []}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="ml-auto">
            {category ? "Save" : "Create"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
