"use client";

import React, { useState, useEffect, useContext } from "react";
import { Menu, X, Coffee } from "lucide-react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/components/molecules/HamburgerMenu";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";
import { AuthUserContext } from "@/components/provider/AuthUserProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // ログインユーザー情報を取得
  const [authUser, setAuthUser] = useContext(AuthUserContext);
  const userName = authUser?.name ?? "";

  useEffect(() => {
    // ログイン状態を確認
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await apiClient.logout();
      setIsLoggedIn(false);
      setAuthUser(null);
      toast.success("ログアウトしました");
      router.push("/");
    } catch (error: unknown) {
      toast.error("ログアウトに失敗しました");
      console.error(error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">
          {/* ロゴとタイトル（中央） */}
          <div className="flex items-center space-x-2 mx-auto">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-2xl shadow-lg">
              <Coffee className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-amber-900">Cafe Diary</h1>
          </div>

          {/* ハンバーガーメニューボタン（右端） */}
          <div className="absolute right-0">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-600 hover:text-amber-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-colors"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* ハンバーガーメニュー */}
        <HamburgerMenu
          isOpen={isMenuOpen}
          onClose={closeMenu}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          userName={userName}
        />
      </div>
    </header>
  );
};

export default Header;
