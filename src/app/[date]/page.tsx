import { ReactNode } from 'react';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { formatDate } from 'date-fns';
import { buttonVariants } from '@/components/ui/button';
import prisma from '@/lib/prisma';

type EventsProps = {
  params: { date?: string };
};

function EventsContainer({ children }: { children: ReactNode }) {
  return (
    <main className='h-screen grid place-items-center bg-sky-200'>
      <div className='bg-white shadow-lg p-2 max-w-96'>{children}</div>
    </main>
  );
}

export default async function Events({ params }: EventsProps) {
  const { date } = params;

  if (!date || isNaN(Number(date))) {
    return (
      <EventsContainer>
        <span className='text-foreground font-medium'>
          Please select a date from the{' '}
          <Link
            className='underline underline-offset-1 text-sky-600 font-medium'
            href='/'>
            calendar
          </Link>{' '}
          first
        </span>
      </EventsContainer>
    );
  }

  const eventsByDate = await prisma.event.findMany({
    where: { date: Number(date) },
  });

  return (
    <EventsContainer>
      {eventsByDate.length > 0 ? (
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
          No events found for{' '}
          {formatDate(new Date(Number(date)), 'dd MMM yyyy')},{' '}
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
      )}
    </EventsContainer>
  );
}
