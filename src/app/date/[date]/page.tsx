import { EventsList } from '@/components/events';

type EventsProps = {
  params: { date?: string };
};
export default function Events({ params }: EventsProps) {
  return (
    <div className='p-4 md:w-[500px]'>
      <h1 className='text-lg font-semibold mb-4'>Events for the day</h1>
      <EventsList date={params.date} />
    </div>
  );
}
