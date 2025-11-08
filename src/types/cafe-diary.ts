// カフェ日記データの型
export interface CafeDiaryData {
  id: string;
  name: string;
  location?: string;
  visitDate: string;
  rating: number;
  notes?: string;
}

// リクエストデータの型
export interface requestCafeDiaryData {
  name: string;
  location?: string;
  visitDate: string;
  rating: number;
  notes?: string;
}
