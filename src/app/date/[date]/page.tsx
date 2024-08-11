import { EventsList } from '@/components/events';

type EventsProps = {
  params: { date?: string };
};
export default function Events({ params }: EventsProps) {
  return (
    <div className='p-4 md:w-[500px]'>
      <EventsList date={params.date} />
    </div>
  );
}
