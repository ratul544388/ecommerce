"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PageNavigationsProps {
  links: {
    label: string;
    href: string;
  }[];
  pageLabel: string;
}

export const PageNavigations = ({ links, pageLabel }: PageNavigationsProps) => {
  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, href }) => (
        <div key={label} className="flex items-center gap-2">
          <Link
            href={href}
            className="text-muted-foreground hover:text-foreground"
          >
            {label}
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      ))}
      <p className="font-medium">{pageLabel}</p>
    </div>
  );
};
