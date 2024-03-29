import { cn } from "@/lib/utils";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glamify",
  description:
    "Discover trendy fashion & beauty essentials at Glamify. Shop now!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const categories = await db.category.findMany();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, "transition")}>
          <main className="min-h-screen">{children}</main>
          <ModalProvider user={user} categories={categories} />
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
