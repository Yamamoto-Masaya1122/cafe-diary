import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/ui/date-picker";
import { Star } from "lucide-react";
import { z } from "zod";
import { cafeDiaryValidation } from "@/validations/cafe-diary-validation";

type CafeDiaryFormData = z.infer<typeof cafeDiaryValidation>;

interface CafeDiaryFormFieldsProps {
  form: UseFormReturn<CafeDiaryFormData>;
}

export const CafeDiaryFormFields: React.FC<CafeDiaryFormFieldsProps> = ({ form }) => {
  return (
    <>
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
                        value <= field.value ? "fill-amber-400 text-amber-400" : "text-amber-200"
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
    </>
  );
};
