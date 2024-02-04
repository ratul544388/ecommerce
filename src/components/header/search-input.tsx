"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface SearchInputProps {
  focus?: boolean;
}

export const SearchInput = ({ focus }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 300);
    }
  }, [focus]);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="z-50 focus-visible:ring-0 bg-background focus:border-primary/50 focus:shadow-sm"
        placeholder="Search products by title or tag..."
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute z-0 right-0 top-0 text-muted-foreground hover:bg-transparent hover:text-primary transition-all"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};
