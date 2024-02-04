import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { ReactNode } from "react";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 flex-grow pt-[70px] pb-20">{children}</main>
      <Footer />
    </>
  );
}
