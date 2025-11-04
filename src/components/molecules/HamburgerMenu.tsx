"use client";

import React from "react";
import { Heart, LogOut, LogIn, UserPlus, BookOpen } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose, isLoggedIn, onLogout }) => {
  // ログイン前のメニュー項目
  const guestMenuItems: MenuItem[] = [
    {
      title: "新規登録",
      href: "/register",
      icon: UserPlus,
    },
    {
      title: "ログイン",
      href: "/login",
      icon: LogIn,
    },
  ];

  // ログイン後のメニュー項目
  const authenticatedMenuItems: MenuItem[] = [
    {
      title: "日記一覧",
      href: "/cafe-diary",
      icon: BookOpen,
    },
    {
      title: "お気に入り",
      href: "/favorites",
      icon: Heart,
    },
    {
      title: "ログアウト",
      icon: LogOut,
      onClick: () => {
        onLogout();
        onClose();
      },
    },
  ];

  const menuItems = isLoggedIn ? authenticatedMenuItems : guestMenuItems;

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-2 bg-white border-t rounded-md border-gray-200 shadow-lg z-50 w-auto min-w-fit">
      <NavigationMenu className="w-full">
        <NavigationMenuList className="flex flex-col w-full">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index} className="w-full">
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "flex flex-row items-center space-x-3 px-4 py-3 text-gray-700 hover:text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 w-full"
                  )}
                >
                  <item.icon className="h-5 w-5 text-gray-700" />
                  <span className="text-base font-medium">{item.title}</span>
                </button>
              ) : (
                <NavigationMenuLink
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex flex-row items-center space-x-3 px-4 py-3 text-gray-700 hover:text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 w-full"
                  )}
                >
                  <item.icon className="h-5 w-5 text-gray-700" />
                  <span className="text-base font-medium">{item.title}</span>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default HamburgerMenu;
