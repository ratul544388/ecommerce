"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Category } from "@prisma/client";
import { ChevronRight, Edit, Plus, Trash } from "lucide-react";

interface CategoryBoxProps {
  category: Category;
  onClick?: (value: string) => void;
}

export const CategoryBox = ({ category, onClick }: CategoryBoxProps) => {
  const { onOpen } = useModal();
  return (
    <div
      key={category.id}
      className="flex items-center gap-2 font-semibold px-5 hover:bg-secondary py-2"
    >
      <p role={onClick && "button"} onClick={() => onClick?.(category.title)}>
        {category.title}
      </p>
      {category.subCategories.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <p
            role={onClick && "button"}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(item);
            }}
          >
            {item}
          </p>
        </div>
      ))}
      {!onClick && (
        <div className="flex items-center ml-auto gap-1">
          <Button
            className="h-7 w-7"
            size="icon"
            onClick={() => onOpen("categoryModal", { category })}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button className="h-7 w-7" variant="secondary" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onOpen("deleteCategoryModal", { category })}
            className="h-7 w-7"
            variant="destructive"
            size="icon"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
