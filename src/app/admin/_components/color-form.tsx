"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createColor } from "@/actions/colors-action";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ColorSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { ColorPicker } from "./color-picker";

interface ColorFormProps {}

export const ColorForm = ({}: ColorFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof ColorSchema>>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      name: "",
      hexCode: "#333333",
    },
  });

  function onSubmit(values: z.infer<typeof ColorSchema>) {
    startTransition(() => {
      createColor(values).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          router.refresh();
          form.reset();
        } else if (error) {
          toast.error(error);
        }
      });
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
          name="hexCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hex Code</FormLabel>
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onChange={(value) =>
                    form.setValue("hexCode", value, { shouldValidate: true })
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
          Add a new Color
        </Button>
      </form>
    </Form>
  );
};
