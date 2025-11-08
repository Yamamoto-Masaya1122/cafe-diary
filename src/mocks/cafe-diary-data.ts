import type { CafeDiaryData } from "@/types/cafe-diary";

// カフェ日記のモックデータ
export const mockCafeDiaryData: CafeDiaryData[] = [
  {
    id: "1",
    name: "カフェ1",
    location: "東京都千代田区永田町1-7-1",
    notes:
      "店内はゆったりとしていて、気持ちがリラックスします。ティラミスが美味しかったです。マスターが優しくて、よく話してくれました。",
    rating: 5,
    visitDate: "2025-01-01",
  },
  {
    id: "2",
    name: "カフェ2",
    location: "東京都千代田区永田町1-7-1",
    notes: "日記2の内容",
    rating: 4,
    visitDate: "2025-01-02",
  },
  {
    id: "3",
    name: "カフェ3",
    location: "東京都千代田区永田町1-7-1",
    notes: "日記3の内容",
    rating: 3,
    visitDate: "2025-01-03",
  },
  {
    id: "4",
    name: "カフェ4",
    location: "東京都千代田区永田町1-7-1",
    notes: "日記4の内容",
    rating: 2,
    visitDate: "2025-01-04",
  },
  {
    id: "5",
    name: "カフェ5",
    location: "東京都千代田区永田町1-7-1",
    notes: "日記5の内容",
    rating: 1,
    visitDate: "2025-01-05",
  },
];
