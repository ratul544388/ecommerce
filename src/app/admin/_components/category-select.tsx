"use client";

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
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

interface CategorySelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export const CategorySelect = ({
  options,
  value,
  onChange,
}: CategorySelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    if (value.includes(currentValue)) {
      onChange(value.filter((item) => item !== currentValue));
    } else {
      onChange([...value, currentValue]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          className="flex items-center gap-2 border rounded-md shadow-sm h-9 px-3 text-sm"
        >
          {!value.length && (
            <p className="text-muted-foreground">Select Categories</p>
          )}
          {value.map((item) => (
            <div key={item} className="px-3 shadow-sm border rounded-full">
              {item}
            </div>
          ))}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No category found</CommandEmpty>
          <CommandGroup>
            {options.map((item) => (
              <CommandItem
                key={item}
                value={item}
                onSelect={() => handleSelect(item)}
              >
                {item}
                <CheckIcon
                  className={cn(
                    "h-4 w-4 ml-auto opacity-0",
                    value.includes(item) && "opacity-100"
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
