"use client";

import Header from "@/components/organisms/Header";
import { Toaster } from "@/components/ui/sonner";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AuthUser } from "@/types/user";
import { createContext } from "react";
export const AuthUserContext = createContext<[AuthUser | null, Dispatch<SetStateAction<AuthUser | null>>]>([
  null,
  () => {},
]);

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // ブラウザ上でのみ sessionStorage を利用
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const parsed = JSON.parse(userData);
      setAuthUser(parsed.user);
    }
  }, []);

  return (
    <>
      <AuthUserContext.Provider value={[authUser, setAuthUser]}>
        <Header />
        {children}
        <Toaster position="top-right" richColors />
      </AuthUserContext.Provider>
    </>
  );
}
