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

type ColorType = {
  name: string;
  hex: string;
};

interface SelectProps {
  colors: ColorType[];
  value?: ColorType;
  onChange: (colors: ColorType) => void;
}

export const ColorSelect = ({ colors, onChange, value }: SelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          className="flex items-center gap-2 border rounded-md shadow-sm h-9 px-3 text-sm"
        >
          {value?.name && (
            <div className="flex items-center gap-3 text-sm">
              <span
                className="h-6 w-6 rounded-sm"
                style={{ background: value.hex }}
              />
              {value.name}
            </div>
          )}
          {!value?.name && (
            <p className="text-muted-foreground">Select a Color</p>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No colors found</CommandEmpty>
          <CommandGroup>
            {colors.map((color) => (
              <CommandItem
                key={color.name}
                value={color.name}
                onSelect={() => {
                  onChange(color);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                {color.name}
                <CheckIcon
                  className={cn(
                    "h-4 w-4 ml-auto opacity-0",
                    value?.name === color.name && "opacity-100"
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
