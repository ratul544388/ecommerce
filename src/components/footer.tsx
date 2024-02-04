"use client";

import { Mail, PhoneCall } from "lucide-react";
import { Input } from "./ui/input";
import { motion, useAnimation } from "framer-motion";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const animation = useAnimation();
  return (
    <div className="flex flex-col items-center w-full">
      <FooterWrapper>
        <div className="flex items-center gap-2 text-white/80">
          <Mail className="h-5 w-5 text-yellow-600" />
          <p className="font-semibold">GET SPECIAL DISCOUNTS IN YOUR INBOX</p>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="relative w-full">
            <Input
              placeholder="Enter email to get offers, discount and more. "
              className="border-0 shadow-none border-b border-yellow-600 placeholder:text-white/50 text-white/50 rounded-none focus-visible:ring-0"
              onFocus={() => animation.start("visible")}
              onBlur={() => animation.start("hidden")}
            />
            <motion.span
              variants={{
                hidden: { left: "50%", width: 0 },
                visible: { left: 0, width: "100%" },
              }}
              initial="hidden"
              animate={animation}
              className="absolute bottom-0 bg-yellow-600 h-0.5"
            />
          </div>
          <Button className="bg-yellow-600 hover:bg-yellow-600/90">
            Subscribe
          </Button>
        </div>
        <div className="flex items-center gap-2 text-white/80 mt-6">
          <PhoneCall className="h-5 w-5 text-yellow-600" />
          <p className="font-semibold">FOR ANY HELP YOU MAY CALL US AT</p>
        </div>
        <p className="text-sm font-light text-white/50 mt-2 ">+8801815555105</p>
        <p className="text-sm font-light text-white/50 ">
          Open 24 Hours a Day, 7 Days in week
        </p>
      </FooterWrapper>
      <FooterWrapper className="bg-gray-100 py-5">
        <p className="text-center text-foreground/80 text-sm">
          FABRILIFE prints a huge variety of custom clothing like T-shirts,
          hoodies and more. Your order is handled daily with a lot of ❤️️ from
          BANGLADESH and delivered worldwide!
        </p>
        <p className="text-muted-foreground text-sm text-center mt-5">
          Copyright © 2018 Fabrilife Limited. All Right Reserved
        </p>
      </FooterWrapper>
    </div>
  );
};

export const FooterWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full bg-neutral-800 p-10 sm:px-20", className)}>
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </div>
  );
};
