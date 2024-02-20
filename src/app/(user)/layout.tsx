import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { currentUser } from "@/lib/current-user";
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
  return (
    <>
      <Header user={user} />
      <MaxWidthWrapper className="pt-[90px] pb-[200px] min-h-screen">
        {children}
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}
