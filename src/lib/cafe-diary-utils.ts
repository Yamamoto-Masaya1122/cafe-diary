import { CafeDiaryData } from '@/types/cafe-diary';
import { z } from 'zod';
import { cafeDiaryValidation } from '@/validations/cafe-diary-validation';

type CafeDiaryFormData = z.infer<typeof cafeDiaryValidation>;

/**
 * フォームデータをCafeDiaryData形式に変換
 */
export const convertFormDataToCafeDiaryData = (data: CafeDiaryFormData, id?: number): CafeDiaryData => {
  return {
    id: id ?? Date.now(),
    name: data.name,
    title: data.name,
    content: data.notes || '',
    location: data.location || '',
    notes: data.notes || '',
    rating: data.rating,
    visit_date: data.visitDate,
  };
};

/**
 * CafeDiaryDataをフォームのデフォルト値に変換
 */
export const convertCafeDiaryDataToFormData = (cafeDiary: CafeDiaryData): CafeDiaryFormData => {
  return {
    name: cafeDiary.name,
    location: cafeDiary.location,
    visitDate: cafeDiary.visit_date,
    rating: cafeDiary.rating,
    notes: cafeDiary.notes,
  };
};
