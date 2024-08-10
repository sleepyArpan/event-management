import { EventsList } from '@/components/events';
import { ReactNode } from 'react';

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
  return (
    <EventsContainer>
      <EventsList date={params.date} />
    </EventsContainer>
  );
}
