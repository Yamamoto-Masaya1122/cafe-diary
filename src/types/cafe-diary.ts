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
