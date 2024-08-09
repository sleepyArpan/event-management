import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { Event } from '@/lib/schemas';

type DayEventsProps = {
  eventsOfTheDay: Array<Event>;
};

export function DayEvents({ eventsOfTheDay }: DayEventsProps) {
  if (eventsOfTheDay.length === 0) {
    return (
      <span className='inline text-primary-foreground underline'>
        No Events found, create some if you want!
      </span>
    );
  }
  return eventsOfTheDay.map(event => (
    <div key={event.id} className='flex justify-between'>
      <span className='text-primary-foreground inline-block'>{event.name}</span>
      <div>
        <Link href={`/edit-event/?eventId=${event.id}`}>
          <Pencil className='text-primary-foreground' />
        </Link>
      </div>
    </div>
  ));
}
