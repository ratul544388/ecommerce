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
    <div className="flex h-full">
      <Sidebar />
      <div className="h-full flex flex-col gap-4 w-full">
        <Navbar />
        <div className="px-5 h-full pt-[76px] md:pt-4 pb-10">{children}</div>
      </div>
    </div>
  );
}
