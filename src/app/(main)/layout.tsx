"use client";

import Header from "@/components/organisms/Header";
import { Toaster } from "@/components/ui/sonner";
import { AuthUserProvider } from "@/components/provider/AuthUserProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthUserProvider>
      <Header />
      {children}
      <Toaster position="top-right" richColors />
    </AuthUserProvider>
  );
}
