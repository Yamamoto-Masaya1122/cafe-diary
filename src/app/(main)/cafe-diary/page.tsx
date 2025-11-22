import React from "react";
import CafeDiaryList from "@/components/organisms/CafeDiaryList";
import { Metadata } from "next";

// メタデータを生成
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "カフェ日記一覧",
    description: "カフェ日記一覧を表示するページ",
    keywords: ["カフェ", "日記", "一覧"],
  };
}

const CafeDiaryPage = () => {
  return (
    <div>
      <CafeDiaryList />
    </div>
  );
};

export default CafeDiaryPage;
