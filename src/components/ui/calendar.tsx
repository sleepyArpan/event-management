'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DayPicker,
  DropdownProps,
  Day,
  useDayPicker,
  useActiveModifiers,
} from 'react-day-picker';
import { endOfDay, startOfDay, isToday } from 'date-fns';
import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Event } from '@/lib/schemas';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  events: Array<Event>;
};

type CustomDayProps = {
  displayMonth: Date;
  date: Date;
  events?: Array<Event>;
};

type TagProps = {
  event: Event;
  date: Date;
};

function Tag({ event, date }: TagProps) {
  return (
    <span
      className={cn(
        'hidden cursor-pointer md:block text-xs lg:text-sm font-medium rounded mb-2 relative whitespace-nowrap truncate px-2 bg-sky-500 text-white',
        { 'bg-white text-sky-500': isToday(date) }
      )}>
      {event.name}
    </span>
  );
}

function CustomDay({ date, displayMonth, events }: CustomDayProps) {
  const dayPicker = useDayPicker();
  const activeModifiers = useActiveModifiers(date, displayMonth);
  return (
    <>
      <Day date={date} displayMonth={displayMonth} />
      {events?.length && events?.length > 0 ? (
        <div className='rounded-full w-3 h-3 absolute -top-1 -right-1 bg-sky-400 text-white flex items-center justify-center z-20 md:invisible'>
          <span className='text-xs'>{events?.length}</span>
        </div>
      ) : null}
      <button
        className='cursor-pointer items-center w-full h-[calc(100%-42px)] absolute bottom-0 left-1/2 -translate-x-1/2 px-1 overflow-hidden'
        onClick={event => dayPicker.onDayClick?.(date, activeModifiers, event)}>
        {events?.map(event => (
          <Tag key={event.id} event={event} date={date} />
        ))}
      </button>
    </>
  );
}

function Calendar({ className, classNames, events, ...props }: CalendarProps) {
  const router = useRouter();

  function handleDayClick(date: Date) {
    router.push(`/date/${date.valueOf()}`);
  }

  return (
    <DayPicker
      captionLayout='dropdown-buttons'
      fromYear={2023}
      toYear={2035}
      className={cn('p-3', className)}
      onDayClick={handleDayClick}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center items-center pt-1 relative',
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
          'w-11 md:w-[88px] lg:w-[120px] text-blue-500 rounded-md font-normal text-[0.8rem]',
        row: 'flex justify-evenly w-full mt-2',
        cell: 'h-9 w-9 md:w-20 md:h-20 lg:w-28 lg:h-28 text-sm p-0 relative',
        day: 'w-9 h-9 md:h-20 md:w-20 lg:h-28 lg:w-28 font-normal text-blue-500 border rounded-md border-blue-500 flex justify-center pt-1',
        day_today: 'bg-primary text-white',
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
        Day: ({ date, displayMonth }) => {
          const eventsOnDay = events.filter(event => {
            const eventStartDate = new Date(event.startDate);
            const eventEndDate = new Date(event.endDate);
            const startOfSpecificDay = startOfDay(date).valueOf();
            const endOfSpecificDay = endOfDay(date).valueOf();
            return (
              eventStartDate.valueOf() <= endOfSpecificDay &&
              eventEndDate.valueOf() >= startOfSpecificDay
            );
          });
          return (
            <CustomDay
              date={date}
              displayMonth={displayMonth}
              events={eventsOnDay}
            />
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
