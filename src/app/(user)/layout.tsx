import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (user?.isAdmin) {
    redirect("/admin/dashboard");
  }

  const categories = await db.category.findMany();

  return (
    <>
      <Header user={user} categories={categories} />
      <div className="pb-[200px] min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
