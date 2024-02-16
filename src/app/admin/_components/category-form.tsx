"use client";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface CategoryModalProps {
  onCreate?: (value: string) => void;
}

export const CategoryForm = ({ onCreate }: CategoryModalProps) => {
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const { category } = data;

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: "",
      subCategories: [],
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        title: category?.title,
      });
    }
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
        <CategoryForm onCreate={() => {}} />
        <Button disabled={isPending} type="submit" className="ml-auto">
          {category ? "Save" : "Create"}
        </Button>
      </form>
    </Form>
  );
};
