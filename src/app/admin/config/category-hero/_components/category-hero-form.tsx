"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createHeroCategory } from "@/actions/category-hero-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CategoryHeroSchema } from "@/schemas";
import { CategoryHero } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Edit, Trash2 } from "lucide-react";
import { ImageUpload } from "../../../products/_components/image-upload";
import { CategorySelect } from "../../../_components/category-select";

interface CategoryHeroFormProps {
  categories: string[];
  categoryHero?: CategoryHero;
  isEditing?: boolean;
  onChange?: (value: string) => void;
}

export const CategoryHeroForm = ({
  categories,
  categoryHero,
  isEditing,
  onChange,
}: CategoryHeroFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CategoryHeroSchema>>({
    resolver: zodResolver(CategoryHeroSchema),
    defaultValues: {
      image: "",
      categories: [],
    },
  });

  function onSubmit(values: z.infer<typeof CategoryHeroSchema>) {
    startTransition(() => {
      createHeroCategory(values).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          router.refresh();
          form.reset();
        } else {
          toast.error(error);
        }
      });
    });
  }

  useEffect(() => {
    if (categoryHero) {
      const { image, categories } = categoryHero;
      form.reset({
        image,
        categories,
      });
    }
  }, [form, categoryHero]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-6"
      >
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    onUpload={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                    disabled={!isEditing || isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <CategorySelect
                    options={categories}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={!isEditing || isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 ml-auto">
          {isEditing ? (
            <div className="flex items-center gap-4">
              {categoryHero && (
                <Button
                  type="button"
                  onClick={() => {
                    onChange?.("");
                    form.reset();
                  }}
                  variant="ghost"
                >
                  Cancel
                </Button>
              )}
              <Button disabled={isPending} type="submit" className="ml-auto">
                {categoryHero ? "Update" : "Create"}
              </Button>
            </div>
          ) : (
            <>
              <Button disabled type="button" variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button
                disabled
                type="button"
                onClick={(e) => {
                  onChange?.(categoryHero?.id as string);
                  e.stopPropagation();
                }}
                variant="outline"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
};
