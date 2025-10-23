import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  icon: Icon,
  iconClassName,
  disabled = false,
  type = "button",
}) => {
  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-xm hover:scale-110",
        className
      )}
    >
      {Icon && <Icon className={cn("w-5 h-5", iconClassName)} />}
      {children}
    </ShadcnButton>
  );
};
