import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Calendar } from '@/components/ui/calendar';
import { buttonVariants } from '@/components/ui/button';
import { DayEvents } from '@/components/day-events';

type HomeProps = {
  searchParams: { date?: string };
};

export default async function Home({ searchParams }: HomeProps) {
  const selectedDate = searchParams.date;

  async function renderEvents() {
    if (!selectedDate) {
      return (
        <span className='inline text-primary-foreground underline'>
          Select a date to see events on that day!
        </span>
      );
    }
    const events = await prisma.event.findMany({
      where: { date: Number(selectedDate) },
    });
    return <DayEvents eventsOfTheDay={events} />;
  }

  return (
    <main className='h-screen bg-gray-200'>
      <div className='bg-white'>
        <Calendar />
        {selectedDate && (
          <Link
            href={`/add-event/?date=${selectedDate}`}
            className={buttonVariants({ variant: 'default' })}>
            Add Event
          </Link>
        )}
      </div>
      <div className='bg-primary p-4 '>{await renderEvents()}</div>
    </main>
  );
}
