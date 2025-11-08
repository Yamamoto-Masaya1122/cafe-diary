import React from "react";
import { MapPin, Star, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CafeDiaryCardProps {
  id: string;
  name: string;
  location?: string;
  notes?: string;
  rating: number;
  visitDate: string;
  onClick?: (id: string) => void;
}

export const CafeDiaryCard: React.FC<CafeDiaryCardProps> = ({
  id,
  name,
  location,
  notes,
  rating,
  visitDate,
  onClick,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      className="bg-white/80 backdrop-blur-sm border-amber-100 hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] hover:border-amber-200"
      onClick={() => onClick?.(id)}
    >
      <CardHeader>
        <CardTitle className="text-xl text-amber-900">{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-amber-200"}`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm mt-3 text-amber-700">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(visitDate)}</span>
          </div>
        </div>
        {notes && <p className="mt-3 text-amber-600 text-sm line-clamp-1">{notes}</p>}
      </CardContent>
    </Card>
  );
};
