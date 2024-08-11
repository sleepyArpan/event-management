import { AddOrEditEventForm } from '@/components/form';
import { formatDateInCalendarFormat } from '@/lib/utils';
import Link from 'next/link';

type AddEventProps = {
  searchParams: { date?: string };
};

export default function AddEvent({ searchParams }: AddEventProps) {
  const date = searchParams.date;

  if (!date) {
    return (
      <div className='p-4 md:w-[500px]'>
        <span className='text-red-600 font-semibold text-xl'>
          Please select a date from the <Link href='/'>calendar</Link>
        </span>
      </div>
    );
  }

  return (
    <div className='p-4 md:w-[500px]'>
      <h1 className='font-semibold text-xl'>
        Add an event on {formatDateInCalendarFormat(Number(date))}
      </h1>
      <AddOrEditEventForm date={date} />
    </div>
  );
}
