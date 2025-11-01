import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Star, MapPin, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/date-picker';
import { CafeDiaryData } from '@/types/cafe-diary';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cafeDiaryValidation } from '@/validations/cafe-diary-validation';
import { z } from 'zod';
import { toast } from 'sonner';

type CafeDiaryFormData = z.infer<typeof cafeDiaryValidation>;

interface CafeDiaryDetailModalProps {
  cafeDiary: CafeDiaryData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CafeDiaryData) => void;
  onDelete?: (id: number) => void;
}

const CafeDiaryDetailModal = ({ cafeDiary, isOpen, onOpenChange, onSubmit, onDelete }: CafeDiaryDetailModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cafeDiaryData, setCafeDiaryData] = useState(cafeDiary);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const form = useForm<CafeDiaryFormData>({
    resolver: zodResolver(cafeDiaryValidation),
    defaultValues: {
      name: cafeDiaryData.name,
      location: cafeDiaryData.location,
      visitDate: cafeDiaryData.visit_date,
      rating: cafeDiaryData.rating,
      notes: cafeDiaryData.notes,
    },
  });

  // cafeDiaryプロップが変更されたときに状態を更新
  useEffect(() => {
    setCafeDiaryData(cafeDiary);
    form.reset({
      name: cafeDiary.name,
      location: cafeDiary.location,
      visitDate: cafeDiary.visit_date,
      rating: cafeDiary.rating,
      notes: cafeDiary.notes,
    });
    setIsEditing(false);
  }, [cafeDiary, form]);

  const handleUpdate = async (data: CafeDiaryFormData) => {
    if (!onSubmit) return;
    setIsLoading(true);
    try {
      // フォームデータをCafeDiaryData形式に変換（既存のIDを保持）
      const updatedCafeDiaryData: CafeDiaryData = {
        id: cafeDiaryData.id, // 既存のIDを保持
        name: data.name,
        title: data.name, // タイトルは名前と同じにする
        content: data.notes || '',
        location: data.location || '',
        notes: data.notes || '',
        rating: data.rating,
        visit_date: data.visitDate,
      };

      onSubmit(updatedCafeDiaryData);

      // ローカル状態も更新
      setCafeDiaryData(updatedCafeDiaryData);
      setIsEditing(false);
      toast.success('日記を更新しました');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'エラーが発生しました';
      setError(message);
      toast.error('日記を更新できませんでした');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('本当にこの日記を削除しますか？')) return;
    if (!onDelete) return;
    setIsLoading(true);
    try {
      onDelete(cafeDiaryData.id);
      toast.success('日記を削除しました');
    } catch (err) {
      console.error(err);
      toast.error('日記を削除できませんでした');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl font-bold text-amber-900">
              {isEditing ? 'カフェ日記を編集' : ''}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {isEditing ? (
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-900">
                          カフェの名前 <span className="text-rose-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="例：カフェ・ド・パリ"
                            className="bg-amber-50 border-amber-200 focus:ring-amber-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-900">場所</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="例：渋谷区代々木"
                            className="bg-amber-50 border-amber-200 focus:ring-amber-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visitDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-amber-900">
                          訪問日 <span className="text-rose-500">*</span>
                        </FormLabel>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="日付を選択"
                          className="bg-amber-50 border-amber-200 focus:ring-amber-400"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-900">
                          評価 <span className="text-rose-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => field.onChange(value)}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  className={`w-10 h-10 ${
                                    value <= field.value ? 'fill-amber-400 text-amber-400' : 'text-amber-200'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-amber-900">メモ・感想</FormLabel>
                        <FormControl>
                          <textarea
                            rows={4}
                            placeholder="カフェの雰囲気、味の感想など..."
                            className="w-full px-3 py-2 bg-amber-50 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-amber-900 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200"
                    >
                      キャンセル
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-linear-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600"
                    >
                      {isLoading ? '更新中...' : '更新'}
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">{cafeDiaryData.name}</h3>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < cafeDiaryData.rating ? 'fill-amber-400 text-amber-400' : 'text-amber-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {cafeDiaryData.location && (
                  <div className="flex items-start gap-3 text-amber-700">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                    <span>{cafeDiaryData.location}</span>
                  </div>
                )}

                <div className="flex items-start gap-3 text-amber-700">
                  <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>{formatDate(cafeDiaryData.visit_date)}</span>
                </div>

                {cafeDiaryData.notes && (
                  <div className="bg-amber-50 px-4 py-3 rounded-xl">
                    <p className="text-sm font-medium text-amber-900 mb-1">メモ・感想</p>
                    <p className="text-amber-700 whitespace-pre-wrap">{cafeDiaryData.notes}</p>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-amber-100">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="flex-1 bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200"
                >
                  <Edit2 className="w-5 h-5" />
                  編集
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isLoading}
                  variant="outline"
                  className="flex-1 bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200"
                >
                  <Trash2 className="w-5 h-5" />
                  削除
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CafeDiaryDetailModal;
