"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Modal } from "./modal";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckoutSchema } from "@/schemas";
import { useEffect } from "react";

export const CheckoutModal = () => {
  const { isOpen, type, data } = useModal();

  const { user, orderItems } = data;

  const form = useForm<z.infer<typeof CheckoutSchema>>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      const { address, phone } = user;
      form.reset({
        address: address as string,
        phone: phone as string,
      });
    }
  }, [user, form]);

  function onSubmit(values: z.infer<typeof CheckoutSchema>) {
    
  }

  return (
    <Modal
      open={isOpen && type === "checkoutModal"}
      title="Confirm Order"
      description="Enter your address and phone and place the order"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Full Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-auto">
            Place Order
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
