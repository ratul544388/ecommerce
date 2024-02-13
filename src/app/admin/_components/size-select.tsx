"use client";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
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

interface SelectSizeProps {
  sizes: string[];
  value?: string;
  onChange: (value: string) => void;
}

export const SizeSelect = ({ sizes, onChange, value }: SelectSizeProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start",
            !value && "text-muted-foreground"
          )}
        >
          {value || "Select Product Size"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
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
