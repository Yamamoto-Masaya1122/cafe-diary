"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CafeDiaryData } from "@/types/cafe-diary";
import { cafeDiaryValidation } from "@/validations/cafe-diary-validation";
import DatePicker from "@/components/ui/date-picker";

type CafeDiaryFormData = z.infer<typeof cafeDiaryValidation>;

interface CafeDiaryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CafeDiaryData) => void;
}

const CafeDiaryForm: React.FC<CafeDiaryFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CafeDiaryFormData>({
    resolver: zodResolver(cafeDiaryValidation),
    defaultValues: {
      name: "",
      location: "",
      visitDate: new Date().toISOString().split("T")[0],
      rating: 1,
      notes: "",
    },
  });

  const handleSubmit = async (data: CafeDiaryFormData) => {
    setIsLoading(true);
    try {
      // フォームデータをCafeDiaryData形式に変換
      const cafeDiaryData: CafeDiaryData = {
        id: Date.now(), // 仮のID
        name: data.name,
        title: data.name, // タイトルは名前と同じにする
        content: data.notes || "",
        location: data.location || "",
        notes: data.notes || "",
        rating: data.rating,
        visit_date: data.visitDate,
      };

      if (onSubmit) {
        onSubmit(cafeDiaryData);
      }

      // フォームをリセット
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
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
            <DialogTitle className="text-xl font-bold text-amber-900">
              カフェ日記登録
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
                              value <= field.value
                                ? "fill-amber-400 text-amber-400"
                                : "text-amber-200"
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
                {isLoading ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CafeDiaryForm;
