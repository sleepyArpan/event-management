'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, ...props }: CalendarProps) {
  const [selected, setSelected] = React.useState<Date>();
  return (
    <DayPicker
      mode='single'
      fromYear={2023}
      toYear={2030}
      className={cn('p-3', className)}
      selected={selected}
      onSelect={setSelected}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium md:text-lg md:font-semibold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'w-11 h-11 grid place-items-center text-muted-foreground rounded-md w-11 font-normal text-[0.8rem] md:m-2',
        row: 'flex w-full mt-2',
        cell: 'h-11 w-11 text-center text-sm p-0 relative md:m-2',
        day: 'h-11 w-11 font-normal grid place-items-center hover:rounded-full hover:border-2 hover:border-primary aria-selected:opacity-100',
        day_selected:
          'bg-primary text-primary-foreground rounded-full  hover:text-primary-foreground hover:border-none',
        day_today: 'bg-purple-500 rounded-full text-primary-foreground',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
