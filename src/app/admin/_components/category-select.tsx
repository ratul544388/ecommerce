"use client";

import { Button } from "@/components/ui/button";
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
import { CheckIcon, X } from "lucide-react";
import { useState } from "react";

interface CategorySelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean
}

export const CategorySelect = ({
  options,
  value,
  onChange,
  disabled,
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
        <Button
          disabled={disabled}
          variant="outline"
          className="h-auto w-full flex gap-x-2 gap-y-1.5 flex-wrap justify-start"
        >
          {!value.length && (
            <p className="text-muted-foreground">Select Categories</p>
          )}
          {value.map((item) => (
            <div
              key={item}
              className="px-3 capitalize flex items-center gap-1 shadow-sm border rounded-full"
            >
              {item}
              <X
                onClick={(e) => {
                  onChange(value.filter((i) => i !== item));
                  e.stopPropagation();
                }}
                className="text-muted-foreground h-4 w-4"
              />
            </div>
          ))}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No category found</CommandEmpty>
          <CommandGroup className="max-h-[50vh] overflow-y-auto">
            {options.map((item) => (
              <CommandItem
                key={item}
                value={item}
                onSelect={() => handleSelect(item)}
                className="capitalize"
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
