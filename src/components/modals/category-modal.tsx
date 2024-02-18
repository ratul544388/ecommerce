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
import { cn } from "@/lib/utils";
import { CategorySchema } from "@/schemas";
import { Minus, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface CategoryModalProps {}

export const CategoryModal = ({}: CategoryModalProps) => {
  const { isOpen, type, onClose, data } = useModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const open = isOpen && type === "categoryModal";
  const [subCategories, setSubCategories] = useState<string[]>([""]);

  const { category, title } = data;

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    form.reset({
      title: category?.title,
    });
    setSubCategories(category?.subCategories || [""]);
  }, [category, form, isOpen]);

  function onSubmit(values: z.infer<typeof CategorySchema>) {
    values.title = values.title.toLowerCase();
    const filteredSubCategories = subCategories.filter((item) =>
      item.toLowerCase()
    );
    startTransition(() => {
      if (category) {
        updateCategory({
          values,
          categoryId: category.id,
          subCategories: filteredSubCategories,
        }).then(({ error, success }) => {
          if (success) {
            form.reset();
            onClose();
            toast.success(success);
            router.refresh();
          } else {
            toast.error(error);
          }
        });
      } else {
        createCategory({ values, subCategories: filteredSubCategories }).then(
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
          <div className="flex flex-col gap-1">
            <FormLabel optional>Sub Categories</FormLabel>
            {subCategories.map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  disabled={isPending}
                  value={subCategories[index]}
                  onChange={(e) => {
                    const updatedSubCategories = [...subCategories];
                    updatedSubCategories[index] = e.target.value;
                    setSubCategories(updatedSubCategories);
                  }}
                  key={index}
                  placeholder="Sub category title"
                />
                <Button
                  onClick={() =>
                    setSubCategories((prev) => {
                      if (index >= 0 && index < prev.length) {
                        return prev.filter((_, i) => i !== index);
                      }
                      return prev;
                    })
                  }
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(subCategories.length === 1 && "hidden")}
                >
                  <Minus className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
            <Button
              disabled={isPending}
              variant="outline"
              type="button"
              className="mt-2 ml-auto"
              onClick={() => setSubCategories((prev) => [...prev, ""])}
            >
              Add another subcategory
              <PlusCircle className="h-4 w-4 ml-2 text-muted-foreground" />
            </Button>
          </div>
          <Button disabled={isPending} type="submit" className="ml-auto">
            {category ? "Save" : "Create"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
