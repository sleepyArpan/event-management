import { EventsList } from '@/components/events';
import { formatDateInCalendarFormat } from '@/lib/utils';

type EventsProps = {
  params: { date?: string };
};
export default function Events({ params }: EventsProps) {
  return (
    <div className='p-4 md:w-[500px]'>
      <h1 className='text-lg font-semibold mb-4'>
        Events for the day{' '}
        {params.date ? formatDateInCalendarFormat(Number(params.date)) : null}
      </h1>
      <EventsList date={params.date} />
    </div>
  );
}
