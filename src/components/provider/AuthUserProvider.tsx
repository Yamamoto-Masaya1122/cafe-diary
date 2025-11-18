"use client";

import { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import { AuthUser } from "@/types/user";

export const AuthUserContext = createContext<[AuthUser | null, Dispatch<SetStateAction<AuthUser | null>>]>([
  null,
  () => {},
]);

interface AuthUserProviderProps {
  children: ReactNode;
}

export function AuthUserProvider({ children }: AuthUserProviderProps) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // ブラウザ上でのみ sessionStorage を利用
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const parsed = JSON.parse(userData);
      setAuthUser(parsed.user);
    }
  }, []);

  return <AuthUserContext.Provider value={[authUser, setAuthUser]}>{children}</AuthUserContext.Provider>;
}
