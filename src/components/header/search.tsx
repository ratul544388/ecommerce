"use client";

import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getProducts } from "@/actions/product-action";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";
import { Product } from "@prisma/client";
import { toast } from "sonner";
import { SearchLoader } from "./search-loader";
import Link from "next/link";
import { Photo } from "../photo";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  focus?: boolean;
  className?: string;
  onCloseMobileSearch?: () => void;
}

export const Search = ({
  focus,
  className,
  onCloseMobileSearch,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [debounceValue] = useDebounceValue(value, 500);
  const [products, setProducts] = useState<Product[]>([]);

  const handleClose = () => {
    setOpen(false);
    onCloseMobileSearch?.();
  };

  useOnClickOutside(containerRef, handleClose);

  useEffect(() => {
    const fetchProducts = async () => {
      startTransition(() => {
        getProducts({ q: debounceValue, take: 5 })
          .then((res) => {
            setProducts(res);
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      });
    };

    if (debounceValue) {
      fetchProducts();
    }
  }, [debounceValue]);

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 300);
    }
  }, [focus]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-[600px]", className)}
    >
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setOpen(true)}
        className="z-50 focus-visible:ring-0 bg-background focus:border-primary/50 focus:shadow-sm"
        placeholder="Search products..."
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute z-0 right-0 top-0 text-muted-foreground hover:bg-transparent hover:text-primary transition-all"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>
      {open && debounceValue && (
        <div className="bg-background overflow-hidden absolute w-full border rounded-lg min-h-16 top-[100%] py-5">
          {isPending && <SearchLoader />}
          {products.map((product) => (
            <Link
              onClick={handleClose}
              href={`/products/${product.slug}`}
              key={product.id}
              className="flex items-center gap-3 px-4 py-1 hover:bg-secondary cursor-pointer transition-colors"
            >
              <Photo photo={product.photos[0]} className="max-w-[50px]" />
              <p className="text-sm text-muted-foreground font-medium">
                {product.name}
              </p>
            </Link>
          ))}
          {!isPending && !products.length && (
            <Link
              href={`/shop?q=${value}`}
              className="text-sm text-muted-foreground px-4 py-3 cursor-pointer hover:bg-secondary transition-colors flex items-center gap-2"
            >
              Show results for
              <span className="text-foreground font-medium">{value}</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
