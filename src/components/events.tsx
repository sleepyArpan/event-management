import Link from 'next/link';
import { formatDate } from 'date-fns';
import { Pencil } from 'lucide-react';
import prisma from '@/lib/prisma';
import { DeleteEvent } from '@/components/delete-event';

type EventsProps = {
  date?: string;
};

export async function EventsList({ date }: EventsProps) {
  const selectedDate = new Date(Number(date));
  const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

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
    where: {
      // Check if eventFrom or eventTo falls within the selected day
      OR: [
        {
          startDate: {
            gte: startOfDay.getTime(),
            lte: endOfDay.getTime(),
          },
        },
        {
          endDate: {
            gte: startOfDay.getTime(),
            lte: endOfDay.getTime(),
          },
        },
        // Additional condition: Check for events that span across the selected day
        {
          AND: [
            {
              startDate: {
                lt: startOfDay.getTime(),
              },
            },
            {
              endDate: {
                gt: endOfDay.getTime(),
              },
            },
          ],
        },
      ],
    },
  });

  return eventsByDate.length > 0 ? (
    eventsByDate.map(event => (
      <div
        key={event.id}
        className='my-2 border border-gray-400 rounded p-4 shadow'>
        <div className='flex justify-between'>
          <span className='font-medium text-lg'>{event.name}</span>
          <div className='ml-2 flex gap-1 justify-center items-center'>
            <Link href={`/edit-event/?eventId=${event.id}`}>
              <Pencil className='text-primary w-4 h-4' />
            </Link>
            <DeleteEvent eventId={event.id} />
          </div>
        </div>
        <div className='mt-2'>
          <span className='text-muted-foreground'>{event.description}</span>
        </div>
      </div>
    ))
  ) : (
    <span className='text-foreground'>
      No events found for {formatDate(new Date(Number(date)), 'dd MMM yyyy')},{' '}
      <Link
        className='underline underline-offset-1 text-sky-600 font-medium'
        href={`/add-event/?date=${date}`}>
        add events for this day
      </Link>
    </span>
  );
}
