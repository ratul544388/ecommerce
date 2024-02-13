import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { currentUser } from "@/lib/current-user";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (!user?.isAdmin) {
    notFound();
  }

  return (
    <>
      <Sidebar />
      <div className="space-y-5 h-full">
        <Navbar />
        <div className="px-5 md:pl-[280px] h-full">{children}</div>
      </div>
    </>
  );
}
