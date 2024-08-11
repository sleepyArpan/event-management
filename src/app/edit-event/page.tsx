import Link from 'next/link';
import { AddOrEditEventForm } from '@/components/form';
import prisma from '@/lib/prisma';

type EditEventProps = {
  searchParams: { eventId?: string };
};

export default async function EditEvent({ searchParams }: EditEventProps) {
  const eventId = searchParams.eventId;
  if (!eventId) {
    return (
      <div className='p-4 md:w-[500px]'>
        <span className='text-red-600 font-semibold text-xl'>
          Please select an event from the event <Link href='/'>calendar</Link>
        </span>
      </div>
    );
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return (
      <div className='p-4 md:w-[500px]'>
        <span className='text-red-600 font-semibold text-xl'>
          Please select an event from the event <Link href='/'>calendar</Link>
        </span>
      </div>
    );
  }

  return (
    <div className='p-4 md:w-[500px]'>
      <span className='font-semibold text-xl'>Edit the {event.name} event</span>
      <AddOrEditEventForm
        event={{
          ...event,
          startDate: Number(event.startDate),
          endDate: Number(event.endDate),
        }}
      />
    </div>
  );
}
