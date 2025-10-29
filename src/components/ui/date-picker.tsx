import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { ja } from 'date-fns/locale';
import { format } from 'date-fns';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  allowClear?: boolean;
  id?: string;
  captionLayout?: 'label' | 'dropdown';
}

const DatePicker = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  allowClear = false,
  id,
  captionLayout,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    if (value) {
      return new Date(value);
    }
    return new Date();
  });

  // valueが変更されたらcurrentMonthも更新
  React.useEffect(() => {
    if (value) {
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  // 文字列の日付をDateオブジェクトに変換
  const dateValue = value ? new Date(value) : undefined;

  // カレンダーで日付が選択された時の処理
  const handleDateSelect = (date: Date | undefined) => {
    if (date && onChange) {
      // 日付モードの場合は YYYY-MM-DD 形式で値を返す
      const formattedDate = format(date, 'yyyy-MM-dd');
      onChange(formattedDate);
    }
    setIsOpen(false);
  };

  // 月が変更された時の処理（年月モード用）
  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
    if (onChange) {
      const day = value ? new Date(value).getDate() : 1;
      const formattedDate = format(new Date(date.setDate(day)), 'yyyy-MM-dd');
      onChange(formattedDate);
    }
  };

  // 日付をクリアする処理
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange('');
    }
  };

  // 表示用の日付フォーマット
  const displayValue = dateValue
    ? format(dateValue, 'yyyy年MM月dd日', { locale: ja })
    : placeholder || '日付を選択してください';

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !dateValue && 'text-muted-foreground',
              allowClear && dateValue && 'pr-10',
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayValue}
          </Button>
        </PopoverTrigger>
        {allowClear && dateValue && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleClear(e);
            }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">日付をクリア</span>
          </Button>
        )}
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleDateSelect}
          captionLayout={captionLayout ?? 'dropdown'}
          onMonthChange={handleMonthChange}
          month={currentMonth}
          locale={ja}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
