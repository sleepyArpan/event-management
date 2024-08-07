'use client';

import * as React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DropdownProps } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  selectedDate: string | undefined;
};

function Calendar({
  className,
  classNames,
  selectedDate,
  ...props
}: CalendarProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function handleDayClick(date: Date) {
    const params = new URLSearchParams(searchParams);
    if (!date) {
      params.delete('date');
    } else {
      params.set('date', date.valueOf().toString());
    }
    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <DayPicker
      captionLayout='dropdown-buttons'
      fromYear={2023}
      toYear={2035}
      className={cn('p-3', className)}
      onDayClick={handleDayClick}
      // TODO(FIX this)
      // selected={new Date(selectedDate)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_dropdowns: 'flex justify-center gap-1',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'secondary' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'w-9 h-9 grid place-items-center text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] md:m-2',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative md:m-2',
        day: 'h-9 w-9 font-normal grid place-items-center hover:rounded-full hover:border-2 hover:border-primary aria-selected:opacity-100',
        day_selected:
          'bg-primary text-primary-foreground rounded-full  hover:text-primary-foreground hover:border-none',
        day_today:
          'bg-purple-500 rounded-full text-primary-foreground hover:border-none',
        ...classNames,
      }}
      components={{
        CaptionLabel: () => null,
        IconLeft: () => <ChevronLeft className='h-4 w-4' />,
        IconRight: () => <ChevronRight className='h-4 w-4' />,
        Dropdown: ({ value, onChange, children }: DropdownProps) => {
          const options = React.Children.toArray(children) as Array<
            React.ReactElement<React.HTMLProps<HTMLOptionElement>>
          >;
          const selected = options.find(child => child.props.value === value);

          function handleChange(value: string) {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          }

          return (
            <Select
              value={value?.toString()}
              onValueChange={value => {
                handleChange(value);
              }}>
              <SelectTrigger className='pr-1.5'>
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position='popper'>
                <ScrollArea className='h-80'>
                  {options.map((option, id: number) => (
                    <SelectItem
                      key={`${option.props.value}-${id}`}
                      value={option.props.value?.toString() ?? ''}>
                      {option.props.children}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
