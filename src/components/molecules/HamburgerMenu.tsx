"use client";

import React from "react";
import { Home, Heart, Settings } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  const menuItems: MenuItem[] = [
    {
      title: "ホーム",
      href: "#",
      icon: Home,
    },
    {
      title: "お気に入り",
      href: "#",
      icon: Heart,
    },
    {
      title: "設定",
      href: "#",
      icon: Settings,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-2 bg-white border-t rounded-md border-gray-200 shadow-lg z-50 w-auto min-w-fit">
      <NavigationMenu className="w-full">
        <NavigationMenuList className="flex flex-col w-full">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index} className="w-full">
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
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default HamburgerMenu;
