'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CafeDiaryData } from '@/types/cafe-diary';
import { cafeDiaryValidation } from '@/validations/cafe-diary-validation';
import { CafeDiaryFormFields } from '@/components/molecules/CafeDiaryFormFields';
import { convertFormDataToCafeDiaryData } from '@/lib/cafe-diary-utils';
import { toast } from 'sonner';

type CafeDiaryFormData = z.infer<typeof cafeDiaryValidation>;

interface CafeDiaryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CafeDiaryData) => void;
}

const CafeDiaryForm: React.FC<CafeDiaryFormProps> = ({ open, onOpenChange, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CafeDiaryFormData>({
    resolver: zodResolver(cafeDiaryValidation),
    defaultValues: {
      name: '',
      location: '',
      visitDate: new Date().toISOString().split('T')[0],
      rating: 1,
      notes: '',
    },
  });

  const handleSubmit = async (data: CafeDiaryFormData) => {
    setIsLoading(true);
    if (!onSubmit) return;
    try {
      const cafeDiaryData = convertFormDataToCafeDiaryData(data);
      onSubmit(cafeDiaryData);

      // フォームをリセット
      form.reset();
      onOpenChange(false);
      toast.success('日記を作成しました');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('日記を作成できませんでした');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl font-bold text-amber-900">カフェ日記登録</DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <CafeDiaryFormFields form={form} />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-linear-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600"
              >
                {isLoading ? '保存中...' : '保存'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CafeDiaryForm;
