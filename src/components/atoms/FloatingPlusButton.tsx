import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingPlusButtonProps {
  onClick?: () => void;
  className?: string;
}

export const FloatingPlusButton: React.FC<FloatingPlusButtonProps> = ({ onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-2xl hover:from-amber-500 hover:to-orange-600 transition-all hover:scale-110 p-0",
        className
      )}
      aria-label="日記作成"
    >
      <Plus className="w-8 h-8" />
    </Button>
  );
};
