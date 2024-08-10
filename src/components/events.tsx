import Link from 'next/link';
import { formatDate } from 'date-fns';
import { Pencil } from 'lucide-react';
import prisma from '@/lib/prisma';

type EventsProps = {
  date?: string;
};

// add event for this day button here
export async function EventsList({ date }: EventsProps) {
  if (!date || isNaN(Number(date))) {
    return (
      <span className='text-foreground font-medium'>
        Please select a date from the{' '}
        <Link
          className='underline underline-offset-1 text-sky-600 font-medium'
          href='/'>
          calendar
        </Link>{' '}
        first
      </span>
    );
  }

  const eventsByDate = await prisma.event.findMany({
    where: { date: Number(date) },
  });

  return eventsByDate.length > 0 ? (
    eventsByDate.map(event => (
      <div key={event.id} className='flex gap-5 w-full'>
        <span>{event.name}</span>
        <div>
          <Link href={`/edit-event/?eventId=${event.id}`}>
            <Pencil className='text-sm' />
          </Link>
        </div>
      </div>
    ))
  ) : (
    <span className='text-foreground font-semibold leading-3'>
      No events found for {formatDate(new Date(Number(date)), 'dd MMM yyyy')},{' '}
      <Link
        className='underline underline-offset-1 text-sky-600 font-medium'
        href={`/add-event/?date=${date}`}>
        add events for this day
      </Link>{' '}
      or go back to the{' '}
      <Link
        className='underline underline-offset-1 text-sky-600 font-medium'
        href='/'>
        calendar
      </Link>{' '}
      to add more events for different days!
    </span>
  );
}
