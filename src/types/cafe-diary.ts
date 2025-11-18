import { AuthUser } from "@/types/user";

// カフェ日記のベースの型
export interface CafeDiaryData {
  id: string;
  userId: string;
  name: string;
  location?: string;
  visitDate: string;
  rating: number;
  notes?: string;
}

export interface CafeDiaryWithUser extends CafeDiaryData {
  user: AuthUser;
}
