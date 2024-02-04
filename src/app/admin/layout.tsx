import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MaxWidthWrapper className="max-w-screen-2xl pt-4">
      {children}
    </MaxWidthWrapper>
  );
}
