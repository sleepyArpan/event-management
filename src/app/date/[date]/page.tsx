import { EventsList } from '@/components/events';

type EventsProps = {
  params: { date?: string };
};
export default function Events({ params }: EventsProps) {
  return <EventsList date={params.date} />;
}
