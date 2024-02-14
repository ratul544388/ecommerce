"use client";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface SizePopoverProps {
  sizes: string[];
  value?: string;
  onChange: (value: string) => void;
  triggerClassName?: string;
  containerClassName?: string;
  filter?: boolean;
}

export const SizePopover = ({
  sizes,
  onChange,
  value,
  triggerClassName,
  containerClassName,
  filter,
}: SizePopoverProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
            triggerClassName
          )}
        >
          {value || "Select Product Size"}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", containerClassName)}>
        <Command>
          {filter && <CommandInput placeholder="Search..." />}
          <CommandEmpty>No colors found</CommandEmpty>
          <CommandGroup>
            {sizes.map((size) => (
              <CommandItem
                key={size}
                value={size}
                onSelect={() => {
                  onChange(size);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                {size}
                <CheckIcon
                  className={cn(
                    "h-4 w-4 ml-auto opacity-0",
                    value === size && "opacity-100"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
