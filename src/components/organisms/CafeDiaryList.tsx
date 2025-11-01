'use client';

import React, { useState } from 'react';
import { Coffee, Plus } from 'lucide-react';
import { CafeDiaryCard } from '@/components/molecules/CafeDiaryCard';
import { mockCafeDiaryData } from '@/mocks/cafe-diary-data';
import { CreateCafeDiaryFloatingButton } from '@/components/atoms/CafeDiaryFloatingButton';
import { Button } from '@/components/atoms/Button';
import CafeDiaryForm from '@/components/organisms/CafeDiaryForm';
import { CafeDiaryData } from '@/types/cafe-diary';
import CafeDiaryDetailModal from '@/components/organisms/CafeDiaryDetailModal';

const CafeDiaryList = () => {
  // モックデータ
  const [cafeDiaries, setCafeDiaries] = useState(mockCafeDiaryData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<CafeDiaryData | null>(null);

  const handleCardClick = (id: number) => {
    const found = cafeDiaries.find((c) => c.id === id) || null;
    setSelectedCafe(found);
    setIsDetailOpen(true);
  };

  const handleCreateDiary = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: CafeDiaryData) => {
    // 新しいカフェ日記をリストに追加
    setCafeDiaries((prev) => [data, ...prev]);
    setIsFormOpen(false);
  };

  const handleUpdateDiary = (data: CafeDiaryData) => {
    // 既存のカフェ日記を更新
    setCafeDiaries((prev) => prev.map((diary) => (diary.id === data.id ? data : diary)));
    setIsDetailOpen(false);
  };

  const handleDeleteDiary = (id: number) => {
    // カフェ日記を削除
    setCafeDiaries((prev) => prev.filter((diary) => diary.id !== id));
    setIsDetailOpen(false);
    setSelectedCafe(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50">
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
              <h2 className="text-xm md:text-2xl font-semibold text-amber-900 mb-6">カフェ日記が登録されていません</h2>
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
    </div>
  );
};

export default CafeDiaryList;
