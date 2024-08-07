import { Calendar } from '@/components/ui/calendar';
import prisma from '@/lib/prisma';
import DayEvents from './helperComponents';

type HomeProps = {
  searchParams: { date?: string };
};

export default async function Home({ searchParams }: HomeProps) {
  const selectedDate = searchParams.date;
  const events = await prisma.event.findMany({
    where: { date: Number(selectedDate) },
  });

  return (
    <main className='h-screen grid place-items-center bg-gray-200'>
      <div className='max-w-3xl h-[500px] flex flex-wrap'>
        <div className='bg-white w-full md:w-2/4'>
          <Calendar selectedDate={selectedDate} />
        </div>
        <div className='bg-primary p-4 w-full md:w-2/4'>
          {!selectedDate ? (
            <span className='inline text-primary-foreground underline'>
              Select a date to see events on that day!
            </span>
          ) : (
            <DayEvents eventsOfTheDay={events} />
          )}
        </div>
      </div>
    </main>
  );
}
