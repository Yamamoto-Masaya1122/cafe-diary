"use client";

import React, { useEffect, useState } from "react";
import { Coffee, Plus, Loader2 } from "lucide-react";
import { CafeDiaryCard } from "@/components/molecules/CafeDiaryCard";
import { CreateCafeDiaryFloatingButton } from "@/components/atoms/CafeDiaryFloatingButton";
import { Button } from "@/components/atoms/Button";
import CafeDiaryForm from "@/components/organisms/CafeDiaryForm";
import { CafeDiaryWithUser } from "@/types/cafe-diary";
import CafeDiaryDetailModal from "@/components/organisms/CafeDiaryDetailModal";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

const CafeDiaryList = () => {
  const [cafeDiaries, setCafeDiaries] = useState<CafeDiaryWithUser[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<CafeDiaryWithUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchCafeDiaries = async () => {
      try {
        const data = await apiClient.getCafeDiaries();
        setCafeDiaries(data);
      } catch (error) {
        console.error("Error fetching cafe diaries:", error);
        toast.error("カフェ日記を取得できませんでした");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCafeDiaries();
  }, []);

  const handleCardClick = (id: string) => {
    const found = cafeDiaries.find((c) => c.id === id) || null;
    setSelectedCafe(found);
    setIsDetailOpen(true);
  };

  const handleCreateDiary = () => {
    setIsFormOpen(true);
  };

  // カフェ日記を作成
  const handleFormSubmit = async (data: CafeDiaryWithUser) => {
    try {
      await apiClient.createCafeDiary(data);
      // 作成後にリストを再取得
      const cafeDiaries = await apiClient.getCafeDiaries();
      setCafeDiaries(cafeDiaries);
      setIsFormOpen(false);
      toast.success("カフェ日記を作成しました");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("カフェ日記を作成できませんでした");
    }
  };

  // カフェ日記を更新
  const handleUpdateDiary = async (data: CafeDiaryWithUser) => {
    try {
      await apiClient.updateCafeDiary(data);
      // 更新後にリストを再取得
      const cafeDiaries = await apiClient.getCafeDiaries();
      setCafeDiaries(cafeDiaries);
      setIsDetailOpen(false);
    } catch (error) {
      console.error("Error updating cafe diary:", error);
      toast.error("カフェ日記を更新できませんでした");
    }
  };

  const handleDeleteDiary = (id: string) => {
    // カフェ日記を削除
    setCafeDiaries((prev) => prev.filter((diary) => diary.id !== id));
    setIsDetailOpen(false);
    setSelectedCafe(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50">
      {isLoading ? (
        <div className="text-center py-16">
          <Loader2 className="w-16 h-16 text-amber-300 mx-auto mb-4 animate-spin" />
          <p className="text-sm text-amber-600">データを取得中...</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm text-amber-600">{cafeDiaries.length}件のカフェ日記を記録</p>
              </div>
            </div>
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
                  className="bg-linear-to-r from-amber-400 to-orange-500 text-white px-6 py-3 font-medium hover:from-amber-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
                >
                  カフェ日記を追加
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-4 mb-6">
                {cafeDiaries.map((cafeDiary) => (
                  <CafeDiaryCard key={cafeDiary.id} {...cafeDiary} onClick={handleCardClick} />
                ))}
              </div>
              <CreateCafeDiaryFloatingButton onClick={handleCreateDiary} />
            </>
          )}

          {/* カフェ日記登録モーダル */}
          <CafeDiaryForm open={isFormOpen} onOpenChange={setIsFormOpen} onSubmit={handleFormSubmit} />

          {/* カフェ日記詳細モーダル */}
          {selectedCafe && (
            <CafeDiaryDetailModal
              cafeDiary={selectedCafe}
              isOpen={isDetailOpen}
              onOpenChange={(open) => {
                setIsDetailOpen(open);
                if (!open) setSelectedCafe(null);
              }}
              onSubmit={handleUpdateDiary}
              onDelete={handleDeleteDiary}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CafeDiaryList;
