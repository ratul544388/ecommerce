"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface DesktopSearchProps {}

export const DesktopSearch = ({}: DesktopSearchProps) => {
  const [value, setValue] = useState("");
  return (
    <div className="relative w-full max-w-[500px] hidden md:block">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="focus-visible:ring-0 focus:border-primary/50 focus:shadow-sm"
        placeholder="Search products by title or tag.."
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-0 top-0 text-muted-foreground hover:text-foreground transition-all"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};
