import Header from "@/components/organisms/Header";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}
