"use client";

import { Logo } from "@/components/header/logo";
import { Sheet } from "@/components/sheet";
import { adminRoutes } from "@/constants";
import { useSheetStore } from "@/hooks/use-sheet-store";
import { Category, User } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filters } from "@/components/categories/filters";
import { SidebarItem } from "@/app/admin/_components/sidebar-item";

export const MobileSidebar = ({
  user,
  categories,
}: {
  user: User | null;
  categories: Category[];
}) => {
  const { isOpen, type } = useSheetStore();
  return (
    <Sheet open={isOpen && type === "sidebar"} className="p-0">
      <Logo className="absolute top-5 left-10" />
      <div className="">
        {user?.isAdmin ? (
          <div className="pl-8 pr-4 mt-20">
            {adminRoutes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        ) : (
          <div>
            <ScrollArea
              className="mt-16 pt-4 pb-3 pl-10"
              style={{ height: "calc(100vh - 64px)" }}
            >
              <Filters categories={categories} />
            </ScrollArea>
          </div>
        )}
      </div>
    </Sheet>
  );
};
