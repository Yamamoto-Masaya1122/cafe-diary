"use client";

import React from "react";
import { Coffee, Plus, LogOut } from "lucide-react";
import { CafeDiaryCard } from "@/components/molecules/CafeDiaryCard";
import { mockCafeDiaryData } from "@/mocks/cafe-diary-data";
import { CreateCafeDiaryFloatingButton } from "@/components/atoms/CafeDiaryFloatingButton";
import { Button } from "@/components/atoms/Button";

const CafeDiaryList = () => {
  // モックデータ
  const cafeDiaries = mockCafeDiaryData;

  const handleCardClick = (id: number) => {
    console.log(`Cafe ${id} clicked`);
    // ここに詳細ページへの遷移などを実装
  };

  const handleCreateDiary = () => {
    console.log("Create diary");
    // ここに詳細ページへの遷移などを実装
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-2xl shadow-lg">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-amber-900">Cafe Diary</h1>
              <p className="text-sm text-amber-600">
                {cafeDiaries.length}件のカフェ日記を記録
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-amber-700 hover:text-amber-900 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {cafeDiaries.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-amber-100">
              <Coffee className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <h2 className="text-xm md:text-2xl font-semibold text-amber-900 mb-6">
                カフェ日記が登録されていません
              </h2>
              <Button
                onClick={handleCreateDiary}
                icon={Plus}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 font-medium hover:from-amber-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
              >
                カフェ日記を追加
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-4 mb-6">
              {cafeDiaries.map((cafeDiary) => (
                <CafeDiaryCard
                  key={cafeDiary.id}
                  {...cafeDiary}
                  onClick={handleCardClick}
                />
              ))}
            </div>
            <CreateCafeDiaryFloatingButton />
          </>
        )}
      </div>
    </div>
  );
};

export default CafeDiaryList;
