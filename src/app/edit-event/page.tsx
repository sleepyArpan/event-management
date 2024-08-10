import { formatDate } from 'date-fns';
import { AddOrEditEventForm } from '@/components/form';
import prisma from '@/lib/prisma';

type EditEventProps = {
  searchParams: { eventId?: string };
};

export default async function EditEvent({ searchParams }: EditEventProps) {
  const eventId = searchParams.eventId;
  if (!eventId) {
    return (
      <div>
        <span className='text-red-600 font-semibold text-xl'>
          Please select an event from the event calendar
        </span>
      </div>
    );
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return (
      <div>
        <span className='text-red-600 font-semibold text-xl'>
          Please select an event from the event calendar
        </span>
      </div>
    );
  }

  return (
    <>
      <h1 className='font-semibold text-xl'>
        Edit the {event.name} event for{' '}
        {formatDate(new Date(Number(event.date)), 'dd MMM yyyy')}
      </h1>
      <AddOrEditEventForm date={String(event.date)} event={event} />
    </>
  );
}
