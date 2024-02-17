"use client";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useState } from "react";

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

interface ColorPopover {
  colors: string[][];
  value: string[];
  onChange: (color: string[]) => void;
  triggerClassName?: string;
  containerClassName?: string;
  filter?: boolean;
}

export const ColorPopover = ({
  colors,
  onChange,
  value,
  triggerClassName,
  containerClassName,
  filter,
}: ColorPopover) => {
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
          {!!value.length && (
            <div className="flex items-center gap-3 text-sm capitalize">
              <span
                className="h-5 w-5 rounded-sm"
                style={{ background: value[1] }}
              />
              {value[0]}
            </div>
          )}
          {!value[0] && <p className="text-muted-foreground">Select a Color</p>}
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", containerClassName)}>
        <Command>
          {filter && <CommandInput placeholder="Search Color" />}
          <CommandEmpty>No colors found</CommandEmpty>
          <CommandGroup>
            {colors.map((color) => (
              <CommandItem
                key={color[0]}
                value={color[0]}
                onSelect={() => {
                  onChange(color);
                  setOpen(false);
                }}
                className="cursor-pointer capitalize"
              >
                <span
                  className="h-5 w-5 rounded-sm mr-3"
                  style={{ backgroundColor: color[1] }}
                />
                {color[0]}
                <CheckIcon
                  className={cn(
                    "h-4 w-4 ml-auto opacity-0",
                    value[0] === color[0] && "opacity-100"
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
