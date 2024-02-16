"use client";

import { Logo } from "@/components/header/logo";
import { Sheet } from "@/components/sheet";
import { adminRoutes } from "@/constants";
import { useSheetStore } from "@/hooks/use-sheet-store";
import { SidebarItem } from "./sidebar-item";
import { User } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filters } from "@/components/categories/filters";

export const MobileSidebar = ({ user }: { user: User | null }) => {
  const { isOpen, type } = useSheetStore();
  return (
    <Sheet open={isOpen && type === "sidebar"} className="p-0">
      <Logo className="absolute top-5 left-10"/>
      <div className="">
        <>
          {user?.isAdmin ? (
            adminRoutes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))
          ) : (
            <div>
              <ScrollArea className="pt-20 pb-3 h-[100vh] pl-10">
                <Filters />
              </ScrollArea>
            </div>
          )}
        </>
      </div>
    </Sheet>
  );
};
