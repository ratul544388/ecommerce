"use client";

import { useSheetStore } from "@/hooks/use-sheet-store";
import { useRouter } from "next/navigation";

export const PageFilters = ({ filters }: { filters: string[] }) => {
  const router = useRouter();
  const { onOpen } = useSheetStore();
  return (
    <div className="border text-sm rounded-md flex-wrap flex items-center gap-3 px-3 py-1 shadow-sm">
      <h4 onClick={() => onOpen("sidebar")} className="text font-medium cursor-pointer">
        Filters:
      </h4>
      <div className="flex items-center gap-3">
        {filters.map((item, index) => (
          <div
            key={index}
            className="bg-secondary hover:bg-secondary/90 transition-colors px-2 py-0.5 rounded-md"
          >
            {item}
          </div>
        ))}
      </div>
      {!!filters.length && (
        <div
          onClick={() => router.push("/shop")}
          className="bg-red-300 hover:bg-red-400 transition-colors px-2 py-0.5 rounded-md cursor-pointer select-none"
        >
          Clear filters
        </div>
      )}
    </div>
  );
};
